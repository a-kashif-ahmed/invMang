import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import excelpng from '../excel.png'
import AddRowModal from "../components/AddRowModal";

function Threshold() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inventory, setInventory] = useState('');
    const [showAddRow, setShowAddRow] = useState(false);
    const fetchDirectoryData = () => {
  fetch("http://localhost:8017/inventory")
  .then(res => res.json())
  .then(data =>{setInventory(data.data);console.log(data.data);} ).catch(console.error);
};

useEffect(() => {
  fetchDirectoryData();
}, []);
//     const intoryRow = {
    
//     partNo: "",
//     partName: "",
//     category: "",
//     subcategory: "",
//     company: "",
//     vendor:"",
//     quantity:0,
//     cost: 0,
//   };


    const handleExport = (inventory) => {
        const worksheet = XLSX.utils.json_to_sheet(inventory);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Directory");
        XLSX.writeFile(workbook, "inventory_directory.xlsx");
    }

    const filteredInventory =
  inventory.length > 0
    ? inventory.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();

        const partNo = item.partNumber?.toLowerCase() || "";
        const partName = item.partName?.toLowerCase() || "";

        return (
          partNo.includes(searchTermLower) ||
          partName.includes(searchTermLower)
        );
      })
    : inventory;
    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            <TopNavBar />

            <div className="pt-24 px-4">

                <h1 className="text-center text-4xl font-serif font-bold text-gray-800 mb-8">
                    Threshold
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
                        {/* <div
                            className="flex items-center gap-2 bg-gray-700 cursor-pointer rounded-md hover:opacity-80 border-3 border-black shadow-md hover:shadow-xl "
                            onClick={() => setShowAddRow(!showAddRow)}
                        >

                            <span className="font-medium text-gray-700 p-2">+ Add Row</span>
                        </div> */}
                        {/* Import + Export Buttons (Right Side) */}
                        <div className="flex items-center gap-6 ml-6  ">

                            {/* Import
                            <div
                                className="flex  items-center gap-2 p-3 rounded-md bg-gray-700 cursor-pointer hover:opacity-80"
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
                            /> */}

                            {/* Export */}
                            <div
                                className="flex items-center gap-2 bg-gray-700 p-3 rounded-md cursor-pointer hover:opacity-80"
                                onClick={() => {
                                    handleExport(inventory);
                                }}
                            >
                                <img src={excelpng} className="w-10 h-8" />
                                <span className="font-medium text-white">Export</span>
                            </div>

                        </div>

                    </div>
                </div>
                

                <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
                    <table className="w-full table-auto">
                        <thead className="bg-slate-200 text-slate-800">
                            <tr>
                                <th className="p-4 text-left">S.No</th>
                                
                                <th className="p-4 text-left">Part Number</th>
                                <th className="p-4 text-left">Part Name</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Subcategory</th>
                                <th className="p-4 text-left">Company</th>
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Threshold</th>
                                <th className="p-4 text-left">Cost(₹)</th>
                                <th className="p-4 text-left">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredInventory.length === 0 ? (<tr  >
                                <td colSpan='9' ><p className="p-3 flex justify-center">No Items</p></td>
                            </tr>) : filteredInventory.filter(item=>item.threshold > item.invLeft).map((item, index) => (
                                <tr className={`hover:bg-gray-200 hover:text-black hover:font-bold border-t `}>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{item.partNumber}</td>
                                    <td className="p-4">{item.partName}</td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">{item.subCategory}</td>
                                    <td className="p-4">{item.companyName}</td>
                                    <td className="p-4 font-bold">{item.invLeft}</td>
                                    <td className="p-4 font-bold">{item.threshold}</td>
                                    <td className="p-4">{item.cost}</td>
                                    <td className="p-4">{item.quantity * item.cost}</td>
                                    
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <BottomNavBar active="loi" />
        </div >
    )
}

export default Threshold;