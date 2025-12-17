import { useState, useEffect } from "react";

function AddRowModal({ onClose, emptyRow, returnRows, availData = [], search ,image }) {
  const [invDir, setInvDir] = useState([]);
  
  const [suggestions, setSuggestions] = useState([]);
  const [activeRow, setActiveRow] = useState(null);

  const [rows, setRows] = useState(() =>
    availData.length ? structuredClone(availData) : [{ ...emptyRow }]
  );
  useEffect(() => {
    fetch('http://localhost:8017/inventory').then(res => res.json()).then((data) => {
      console.log(data.data);
      setInvDir(data.data);
    })

  }, [search]);





  const addNewRow = () => {
    setRows((prev) => [...prev, { ...emptyRow }]);
  };

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 z-50 flex justify-center items-center bg-black/40"
    >
      <div className="relative p-4 w-full">
        <div className="bg-white border rounded-xl shadow-lg p-6">


          <div className=" flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold">Add Inventory Item</h3>
            <button
              onClick={addNewRow}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Row
            </button>
          </div>


          {/* <div className="mt-4 flex justify-end">
            <button
              onClick={addNewRow}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Row
            </button>
          </div> */}


          <div className="mt-4 overflow-x-auto overflow-y-visible w-full">

            {rows.map((row, index) => (
              <div
                key={index}
                className=" relative mb-4 p-3 border rounded-lg bg-gray-50 min-w-max"
              >


                <div className="flex gap-4 min-w-max">

                  {Object.keys(row).map((field, i) => (
                    <div className="p-2 flex" key={i}>
                      <label className="block p-3 text-sm mb-1 capitalize ">
                        {field}
                      </label>

                      <input
                        key={field}
                        type={field === "image" ? "file" : "text"}
                        value={row[field] ?? ""}
                        onChange={(e) => {
                          updateRow(index, field, e.target.value);

                          if (field === "partNumber") {
                            const value = e.target.value;
                            
                            setActiveRow(index);

                            if (!value.trim()) {
                              setSuggestions([]);
                              return;
                            }

                            const matches = invDir.length>0 ? invDir
                              .filter(item =>
                                (item.partNumber || "")
                                  .toLowerCase()
                                  .includes(value.toLowerCase())
                              )
                              .slice(0, 6):[];

                            setSuggestions(matches);
                          }
                        }}

                        className="rounded-xl p-2 border-2 border-black"
                        placeholder={field}
                      />
                      {field === 'partNumber' && activeRow === index && suggestions.length > 0 && (
                        <div className="absolute mt-10 ml-10 bg-white border rounded-lg shadow-lg z-50 w-80">
                          {suggestions.map((item, i) => (
                            <div
                              key={i}
                              className="px-3 py-2 hover:bg-cyan-200 cursor-pointer text-sm"
                              onClick={() => {
                                updateRow(index, "partNumber", item.partNumber);
                                updateRow(index, "partName", item.partName);
                                updateRow(index, "category", item.category);
                                updateRow(index, "subCategory", item.subCategory);
                                updateRow(index, "company", item.companyName);
                                updateRow(index, "cost", item.cost);
                                updateRow(index, "sellingPrice", item.sellingPrice);
                                updateRow(index, "threshold", item.threshold);

                                setSuggestions([]);
                                setActiveRow(null);
                              }}
                            >
                              <span className="font-semibold">{item.partNumber}</span>
                              <span className="ml-2 text-gray-600">{item.partName}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ))}

                </div>


              </div>
            ))}

          </div>


          <div className="flex items-center justify-end gap-4 border-t pt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                console.log("Final submitted rows:", rows);
                returnRows(rows);
                onClose();
                setRows([]);
              }}
            >
              Add Items
            </button>

            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddRowModal;
