import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import excelpng from '../excel.png'
import { Fragment } from "react";


function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inventory, setInventory] = useState('');
    const [showAddRow, setShowAddRow] = useState(false);

    const fetchDirectoryData = () => {
        fetch("http://localhost:8017/inventory")
            .then(res => res.json())
            .then(data => { setInventory(data.data); console.log(data.data); }).catch(console.error);
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

    const filteredInventory = inventory.length > 0
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
    const totalCost = inventory.length > 0 ? inventory.filter(item => item.invLeft > 0).reduce((sum, item) => {
        return sum + item.cost * item.invLeft;
    }, 0) : inventory;

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

                <h1 className="text-center text-4xl font-serif font-bold text-gray-800 mb-8">
                    Inventory
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
                            className="flex items-center gap-2 bg-gray-700 cursor-pointer rounded-md  border-3 border-black shadow-md hover:shadow-xl "

                        >

                            <span className="font-medium text-white p-2">Total Inventory Cost : {totalCost}</span>
                        </div>
                        {/* Import + Export Buttons (Right Side) */}
                        <div className="flex items-center gap-6 ml-6  ">

                            {/* Import
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
                                                <td className="p-4">{item.invLeft}</td>
                                                <td className="p-4">{item.threshold}</td>
                                                <td className="p-4">{item.cost}</td>
                                                <td className="p-4">{item.invLeft * item.cost}</td>
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

            <BottomNavBar active="inventory" />
        </div >
    )
}

export default Inventory;