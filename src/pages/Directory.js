import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import excelpng from '../excel.png'
import AddRowModal from "../components/AddRowModal";
import Toast from "../components/Toast";
import { Fragment } from "react";


function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dummyinventory, setDummyInventory] = useState([]);
  const [showAddRow, setShowAddRow] = useState(false);
  const [modalRows, setModalRows] = useState([]);
  const [toast, setToast] = useState(null);
  const [userChanged, setUserChanged] = useState(false);
  const fetchDirectoryData = () => {
    fetch("http://localhost:8017/inventory")
      .then(res => res.json())
      .then(data => { setDummyInventory(data.data); console.log(data.data); }).catch(console.error);
  };

  useEffect(() => {
    fetchDirectoryData();
  }, []);

  useEffect(() => {
    if (toast) {
      const toastTimer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(toastTimer);
    }
  }, [toast]);

  const directoryRow = {
    partNumber: "",
    partName: "",
    category: "",
    subCategory: "",
    company: "",
    cost: 0,
    rack: "",
    threshold: 0,
    image: "",

  };

  const uploadData = (dummyinventory) => {
    const formData = new FormData();

    // inventory data
    formData.append("data", JSON.stringify(dummyinventory));

    // optional: attach images if present
    dummyinventory.forEach((row, index) => {
      if (row.images && row.images.length > 0) {
        row.images.forEach((file) => {
          formData.append("productImages", file);
        });
      }
    });

    fetch("http://localhost:8017/inventory", {
      method: "POST",
      body: formData, // ❌ no Content-Type header
    })
      .then((response) => {
        if (response.ok) {
          setToast({ text: "Data Stored", color: "bg-green-300" });
          setUserChanged(false);
        } else {
          setToast({ text: "Error in Storing Data", color: "bg-red-300" });
        }
      })
      .catch(() => {
        setToast({ text: "Server Error", color: "bg-red-300" });
      });
  };

  useEffect(() => {
    if (!userChanged) return;
    uploadData(dummyinventory);
  }, [dummyinventory]);

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
  const handleDelete = async (partNumber) => {
    if (!window.confirm("Delete this item?")) return;

    const res = await fetch(
      `http://localhost:8017/inventory/${partNumber}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setDummyInventory(prev =>
        prev.filter(item => item.partNumber !== partNumber)
      );
    } else {
      alert("Failed to delete item");
    }
  };

  const handleExport = (inventory) => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Directory");
    XLSX.writeFile(workbook, "inventory_directory.xlsx");
  }
  const handleChange = (item) => {

    setModalRows([{ ...item }]);
    setShowAddRow(true);
  }
  const filteredInventory =
    dummyinventory.length > 0
      ? dummyinventory.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();

        const partNo = item.partNumber?.toLowerCase() || "";
        const partName = item.partName?.toLowerCase() || "";

        return (
          partNo.includes(searchTermLower) ||
          partName.includes(searchTermLower)
        );
      })
      : dummyinventory;



  const handleReturnRows = (rowsMod) => {
    setDummyInventory((prev) => {
      const updated = [...prev];

      rowsMod.forEach((newRow) => {
        const index = updated.findIndex(
          (row) => row.partNumber === newRow.partNumber
        );

        if (index !== -1) {
          // 🔁 UPDATE existing row
          updated[index] = { ...updated[index], ...newRow };
        } else {
          // ➕ ADD new row
          updated.push(newRow);
        }

      });

      return updated;
    });
    setUserChanged(true);
  };
  const groupedInventory = (filteredInventory || [])
    //   .filter(item => item && item.invLeft > 0)
    .reduce((groups, item) => {
      const category = item.category || "Uncategorized";
      const catLow = category.toLowerCase();

      if (!groups[catLow]) {
        groups[catLow] = [];
      }

      groups[catLow].push(item);
      return groups;
    }, {}); // 👈 THIS {} IS REQUIRED



  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <TopNavBar />

      <div className="pt-24 px-4">

        <h1 className="text-center text-4xl font-serif font-bold text-gray-700 mb-8">
          Inventory Directory
        </h1>
        <div className="">
          <div className="flex items-center justify-between w-full px-6 mb-6">
            {toast && <Toast text={toast.text} color={toast.color} />}

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
              className="flex items-center gap-2 bg-gray-700 cursor-pointer rounded-md hover:opacity-80 border-3 border-black shadow-md hover:shadow-xl "
              onClick={() => setShowAddRow(!showAddRow)}
            >

              <span className="font-medium  text-white p-2">+ Add Row</span>
            </div>
            {/* Import + Export Buttons (Right Side) */}
            <div className="flex items-center gap-6 ml-6  ">

              {/* Import */}
              <div
                className="flex  items-center gap-2 p-3 rounded-md bg-gray-700 cursor-pointer hover:opacity-80"
                onClick={() => document.getElementById("importFileInput").click()}
              >
                <img src={excelpng} className="w-10 h-8" />
                <span className="font-medium text-white">Import</span>
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
                className="flex items-center gap-2 bg-gray-700 p-3 rounded-md cursor-pointer hover:opacity-80"
                onClick={() => {
                  handleExport(dummyinventory);
                }}
              >
                <img src={excelpng} className="w-10 h-8" />
                <span className="font-medium text-white">Export</span>
              </div>

            </div>

          </div>
        </div>
        {showAddRow && <AddRowModal emptyRow={directoryRow} image={true} availData={modalRows}
          returnRows={handleReturnRows}
          onClose={() => { setShowAddRow(false); setModalRows([]); }} />}

        <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
          <table className="w-full table-auto">
            <thead className="bg-slate-200 text-slate-800">
              <tr>
                <th className="p-4 text-left">S.No</th>
                <th className="p-4 text-left">Part Number</th>
                <th className="p-4 text-left">Part Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">SubCategory</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Cost(₹)</th>

                <th className="p-4 text-left">Rack</th>
                <th className="p-4 text-left">Threshold</th>
                <th className="p-4 text-left">Action</th>

              </tr>
            </thead>

            <tbody>
              {Object.keys(groupedInventory).length === 0 ? (
                <tr>
                  <td colSpan="10">
                    <p className="p-3 flex justify-center">No Items</p>
                  </td>
                </tr>
              ) : (
                Object.entries(groupedInventory).map(([category, items]) => (
                  <Fragment key={category}>

                    {/* CATEGORY HEADER */}
                    <tr className="relative bg-slate-200 font- text-black">
                      <td colSpan="10" className="p-3 text-left">
                        {category.toUpperCase()}
                      </td>
                    </tr>

                    {/* CATEGORY ROWS */}
                    {items.map((item, index) => (
                      <tr
                        key={item.partNumber}
                        className={`hover:bg-gray-300 hover:text-black border-t
                          `}
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">{item.partNumber}</td>
                        <td className="p-4">{item.partName}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4">{item.subCategory}</td>
                        <td className="p-4">{item.companyName}</td>
                        <td className="p-4">{item.cost}</td>
                        <td className="p-4">{item.rack}</td>
                        <td className="p-4">{item.threshold}</td>
                        <td
                    className="p-4"

                  >
                    <button className="bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
  
                      onClick={() => handleDelete(item.partNumber)}
                      
                    >
                      Delete
                    </button>
                  </td>
                      </tr>
                    ))}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BottomNavBar active="directory" />
    </div >
  );
}
export default Directory;
