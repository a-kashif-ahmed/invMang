import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import excelpng from '../excel.png'
import AddRowModal from "../components/AddRowModal";

function Sales() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sales, setSales] = useState('');
    const [showAddRow, setShowAddRow] = useState(false);
    const purchaseRow = {
    date:"",
    customer:"",
    mobilenumber:"",
    vehicleNumber:"",
    vehicleName:"",
    partNo: "",
    partName: "",
    category: "",
    subcategory: "",
    company: "",
    vendor:"",
    quantity:0,
    cost: 0,
  };


    const handleExport = (inventory) => {
        if(inventory.length > 0 ){
        const worksheet = XLSX.utils.json_to_sheet(inventory);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Directory");
        XLSX.writeFile(workbook, "inventory_directory.xlsx");
        }else{
            alert('No Data to Export');
        }
    }

    const filteredInventory = sales.length > 0 ? sales.filter(
        (item) =>
            item.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.partName.toLowerCase().includes(searchTerm.toLowerCase())
    ) : sales;
    const handleReturnRows = (rowsMod) => {
  setSales((prev) => {
    const updated = [...prev];

    rowsMod.forEach((newRow) => {
      const index = updated.findIndex(
        (row) => row.partNo === newRow.partNo
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
};
    return (
        <div className="min-h-screen bg-gray-100 pb-20">
            <TopNavBar />

            <div className="pt-24 px-4">

                <h1 className="text-center text-4xl font-serif font-bold text-gray-800 mb-8">
                    Sales
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
                                className="flex items-center gap-2 bg-cyan-300 p-3 rounded-md cursor-pointer hover:opacity-80"
                                onClick={() => {
                                    handleExport(sales);
                                }}
                            >
                                <img src={excelpng} className="w-10 h-8" />
                                <span className="font-medium text-gray-700">Export</span>
                            </div>

                        </div>

                    </div>
                </div>
                { showAddRow && <AddRowModal open={showAddRow} emptyRow={purchaseRow} returnRows={handleReturnRows} onClose={() => setShowAddRow(false)} />}

                <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-300 text-black">
                            <tr>
                                <th className="p-4 text-left">S.No</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-left">Mobile</th>
                                <th className="p-4 text-left">Vehicle No.</th>
                                <th className="p-4 text-left">Vehicle Name</th>
                                <th className="p-4 text-left">Part No.</th>
                                <th className="p-4 text-left">Part Name</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">SubCategory</th>
                                
                                
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Cost(₹)</th>
                                <th className="p-4 text-left">Total</th>
                                <th className="p-4 text-left">Action</th>

                            </tr>
                        </thead>

                        <tbody>
                            {filteredInventory.length === 0 ? (<tr  >
                                <td colSpan='9' ><p className="p-3 flex justify-center">No Items</p></td>
                            </tr>) : filteredInventory.map((item, index) => (
                                <tr className="hover:bg-cyan-300 hover:text-black border-t">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{item.partNo}</td>
                                    <td className="p-4">{item.partName}</td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">{item.subCategory}</td>
                                    <td className="p-4">{item.company}</td>
                                    <td className="p-4">{item.vendor}</td>
                                    <td className="p-4">{item.quantity}</td>
                                    <td className="p-4">{item.cost}</td>
                                    
                                    
                                    <td className="p-4">{item.quantity * item.cost}</td>
                                    <td className="p-4 text-red-600">Delete</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <BottomNavBar active="sales" />
        </div >
    )
}

export default Sales;