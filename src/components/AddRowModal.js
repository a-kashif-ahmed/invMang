import { useState,useEffect } from "react";

function AddRowModal({ onClose, emptyRow, returnRows , availData = [] }) {
  const [rows, setRows] = useState([]);

  // Initialize rows when modal opens
  useEffect(() => {
    if (availData.length > 0) {
      setRows(availData);
    } else {
      setRows([{ ...emptyRow }]);
    }
  }, [availData, emptyRow]);

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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
    >
      <div className="relative p-4 w-full">
        <div className="bg-white border rounded-xl shadow-lg p-6">

          
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-semibold">Add Inventory Item</h3>

          </div>

          
          <div className="mt-4 flex justify-end">
            <button
              onClick={addNewRow}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Row
            </button>
          </div>

          
          <div className="mt-4 overflow-x-auto overflow-y-visible w-full">

            {rows.map((row, index) => (
              <div
                key={index}
                className="mb-4 p-3 border rounded-lg bg-gray-50 min-w-max"
              >
                

                <div className="flex gap-4 min-w-max">

                  {Object.keys(row).map((field, i) => (
                    <div className="p-2 flex" key={i}>
                      <label className="block p-3 text-sm mb-1 capitalize ">
                        {field}
                      </label>

                      <input
                      key={field}
                        type="text"
                        value={row[field] ?? ""}
                        onChange={(e) => updateRow(index, field, e.target.value)}
                        className="rounded-xl p-2 border-2 border-black"
                        placeholder={field}
                      />
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
