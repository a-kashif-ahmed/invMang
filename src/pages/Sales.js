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
    const [modalRows, setModalRows] = useState([]);
    const [userChanged, setUserChanged] = useState(false);
    const [toast, setToast] = useState(null);

    const fetchSalesData = () => {
        fetch("http://localhost:8017/sales")
            .then(res => res.json())
            .then(data => { setSales(data.data); console.log(data.data); }).catch(console.error);
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    useEffect(() => {
        if (toast) {
            const toastTimer = setTimeout(() => setToast(null), 3000)
            return () => clearTimeout(toastTimer);
        }
    }, [toast]);

    useEffect(() => {
        if (!userChanged) return;
        handleUploadData(sales);
    }, [sales]);

    const salesRow = {
        date: "",
        customerName: "",
        phone: "",
        vehicleNumber: "",
        vehicle: "",
        partNumber: "",
        partName: "",
        category: "",
        subCategory: "",
        companyName: "",
        quantity: 0,
        cost: 0,
        sellingPrice: 0,
        total: 0
    };


    const handleExport = (inventory) => {
        if (inventory.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(inventory);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Directory");
            XLSX.writeFile(workbook, `Sales_${Date.now()}.xlsx`);
        } else {
            alert('No Data to Export');
        }
    }

    const filteredInventory =
        sales.length > 0
            ? sales.filter((item) => {
                const searchTermLower = searchTerm.toLowerCase();

                // const partNo = item.partNumber?.toLowerCase() || "";
                // const partName = item.partName?.toLowerCase() || "";
                const customer = item.customerName?.toLowerCase() || "";
                const mobile = item.phone?.toLowerCase() || "";

                return (
                    customer.includes(searchTermLower) ||
                    mobile.includes(searchTermLower)
                );
            })
            : sales;
    const handleUploadData = (sales) => {
        fetch(`http://localhost:8017/sales`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sales),
        }).then((response) => {
            if (response.ok) {
                setToast({ text: "Data Stored", color: "bg-green-300" });
                setUserChanged(false);
            } else {
                setToast({ text: "Error in Storing Data ", color: "bg-red-300" });
            }
        })
    }
    const handleChange = (item) => {

        setModalRows([{ ...item }]);
        setShowAddRow(true);
    }

    const handleReturnRows = (rowsMod) => {
        setSales((prev) => {
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
    }
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this item?")) return;

        const res = await fetch(
            `http://localhost:8017/sales/${id}`,
            { method: "DELETE" }
        );

        if (res.ok) {
            setSales(prev =>
                prev.filter(item => item.id !== id)
            );
        } else {
            alert("Failed to delete item");
        }
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
                                placeholder="Search Customer Name or mobile Number"
                                className="w-screen max-w-4xl rounded-3xl px-7 py-2 border-2 border-gray-400 focus:border-blue-500 outline-none text-lg shadow-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>
                        <div
                            className="flex items-center gap-2 bg-gray-700 cursor-pointer rounded-md hover:opacity-80 border-3 border-black shadow-md hover:shadow-xl "
                            onClick={() => setShowAddRow(!showAddRow)}
                        >

                            <span className="font-medium text-white p-2">+ Add Row</span>
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
                                    handleExport(sales);
                                }}
                            >
                                <img src={excelpng} className="w-10 h-8" />
                                <span className="font-medium text-white">Export</span>
                            </div>

                        </div>

                    </div>
                </div>
                {showAddRow && <AddRowModal search={true} availData={modalRows} emptyRow={salesRow} returnRows={handleReturnRows} onClose={() => setShowAddRow(false)} />}

                <div className="bg-white shadow-lg rounded-xl overflow-hidden border">
                    <table className="w-full table-auto">
                        <thead className="bg-slate-200 text-slate-800">
                            <tr>
                                <th className="p-4 text-left">S.No</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-left">Mobile</th>
                                <th className="p-4 text-left">Vehicle No.</th>
                                <th className="p-4 text-left">Vehicle Name</th>
                                <th className="p-4 text-left">Part Number</th>
                                <th className="p-4 text-left">Part Name</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">SubCategory</th>
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Selling Price(₹)</th>
                                <th className="p-4 text-left">Total</th>
                                <th className="p-4 text-left">Action</th>

                            </tr>
                        </thead>

                        <tbody>
                            {filteredInventory.length === 0 ? (<tr  >
                                <td colSpan='9' ><p className="p-3 flex justify-center">No Items</p></td>
                            </tr>) : filteredInventory.map((item, index) => (
                                <tr className="hover:bg-gray-200 hover:text-black hover:font-bold border-t" onDoubleClick={() => handleChange(item)}>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">{item.customerName}</td>
                                    <td className="p-4">{item.phone}</td>
                                    <td className="p-4">{item.vehicleNumber}</td>
                                    <td className="p-4">{item.vehicle}</td>
                                    <td className="p-4">{item.partNumber}</td>
                                    <td className="p-4">{item.partName}</td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">{item.subCategory}</td>
                                    <td className="p-4">{item.quantity}</td>
                                    <td className="p-4">{item.sellingPrice}</td>
                                    <td className="p-4">{item.quantity * item.sellingPrice}</td>
                                    <td className="p-4">
                                        <button className="bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
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