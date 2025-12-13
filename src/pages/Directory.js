import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import excelpng from '../excel.png'
import AddRowModal from "../components/AddRowModal";

function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dummyinventory, setDummyInventory] = useState('');
  const [showAddRow, setShowAddRow] = useState(false);
  const [modalRows, setModalRows] = useState([]);
  const directoryRow = {
    partNo: "",
    partName: "",
    category: "",
    subcategory: "",
    company: "",
    cost: 0,
    sellingPrice: 0,
    rack: "",
    threshold: 0,
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      let allData = [];
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const cleanedRows = jsonData.map((row) => {
          const cRow = {};
          Object.keys(row).forEach((key) => {
            const value = row[key];
            cRow[key] = value === "" || value === null || value === undefined ? "N/A" : value;
          })
          return cRow;
        })
        allData = [...allData, ...cleanedRows];




      })
      setModalRows(allData);
      setShowAddRow(true);
    }
    reader.readAsArrayBuffer(file);
  }

  const handleExport = (inventory) => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Directory");
    XLSX.writeFile(workbook, "inventory_directory.xlsx");
  }
  const handleChange = (idx)=>{
    setModalRows(dummyinventory[idx]);
    setShowAddRow(true);
  }
  const filteredInventory = dummyinventory.length > 0 ? dummyinventory.filter(
    (item) =>
      item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : dummyinventory;


  const handleReturnRows = (rowsMod) =>{
    setDummyInventory((prev)=>[...prev,...rowsMod]);
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <TopNavBar />

      <div className="pt-24 px-4">

        <h1 className="text-center text-4xl font-serif font-bold text-gray-800 mb-8">
          Inventory Directory
        </h1>
        <div className="">
          <div className="flex items-center justify-between w-full px-6 mb-6">

            {/* Centered Search Bar */}
            <div className="flex  justify-center">
              <input
                type="text"
                placeholder="Search Name or Part No."
                className="w-screen max-w-4xl rounded-3xl px-7 py-2 border-2 border-gray-400 focus:border-blue-500 outline-none text-lg shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>
            <div
              className="flex items-center gap-2 bg-cyan-300 cursor-pointer rounded-md hover:opacity-80 border-3 border-black shadow-md hover:shadow-xl "
              onClick={() => setShowAddRow(!showAddRow)}
            >

              <span className="font-medium text-gray-700 p-2">+ Add Row</span>
            </div>
            {/* Import + Export Buttons (Right Side) */}
            <div className="flex items-center gap-6 ml-6  ">

              {/* Import */}
              <div
                className="flex  items-center gap-2 p-3 rounded-md bg-cyan-300 cursor-pointer hover:opacity-80"
                onClick={() => document.getElementById("importFileInput").click()}
              >
                <img src={excelpng} className="w-10 h-8" />
                <span className="font-medium text-gray-700">Import</span>
              </div>

              <input
                id="importFileInput"
                type="file"
                accept=".xlsx,.csv,.xls,.xlsm,.xlm"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Export */}
              <div
                className="flex items-center gap-2 bg-cyan-300 p-3 rounded-md cursor-pointer hover:opacity-80"
                onClick={() => {
                  handleExport(dummyinventory);
                }}
              >
                <img src={excelpng} className="w-10 h-8" />
                <span className="font-medium text-gray-700">Export</span>
              </div>

            </div>

          </div>
        </div>
        {showAddRow && <AddRowModal emptyRow={directoryRow} availData={modalRows}
          returnRows={handleReturnRows}
          onClose={() => { setShowAddRow(false);  setModalRows([]); }} />}

        <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
          <table className="w-full table-auto">
            <thead className="bg-gray-300 text-black">
              <tr>
                <th className="p-4 text-left">S.No</th>
                <th className="p-4 text-left">Part No.</th>
                <th className="p-4 text-left">Part Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">SubCategory</th>
                <th className="p-4 text-left">Company Name</th>
                <th className="p-4 text-left">Cost(₹)</th>
                <th className="p-4 text-left">Selling Price(₹)</th>
                <th className="p-4 text-left">Rack</th>
                <th className="p-4 text-left">Threshold</th>
                <th className="p-4 text-left">Action</th>

              </tr>
            </thead>

            <tbody>
              {filteredInventory.length === 0 ? (<tr  >
                <td colSpan='9' ><p className="p-3 flex justify-center">No Items</p></td>
              </tr>) : filteredInventory.map((item, index) => (
                <tr className="hover:bg-cyan-300 hover:text-black border-t" onDoubleClick={()=>handleChange(index)}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{item.partNo}</td>
                  <td className="p-4">{item.partName}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.subCategory}</td>
                  <td className="p-4">{item.company}</td>
                  <td className="p-4">{item.cost}</td>
                  <td className="p-4">{item.sellingPrice}</td>
                  <td className="p-4">{item.rack}</td>
                  <td className="p-4">{item.threshold}</td>
                  <td className="p-4 text-red-600">Delete</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <BottomNavBar active="directory" />
    </div >
  );
}

export default Directory;
