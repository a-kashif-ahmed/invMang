function PurchasesRoom() {
  const purchaseData = [
  {
    "item": "Wheat Straw (Bhusha)",
    "quantityKg": 10000,
    "rate": 7,
    "cost": 70000,
    "transportCharge": 2.95,
    "labourCharge": 2950,
    "totalCost": 99500
  },
 
]

  return (
    <div className="p-2 overflow-x-auto">
      <div className="bg-white shadow-lg rounded-md border">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="p-4 text-center">S.No</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Material</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Rate</th>
              <th className="p-4 text-center">Cost</th>
              <th className="p-4 text-center">Transportation Charge</th>
              <th className="p-4 text-center">Labour Charge</th>
              <th className="p-4 text-center">Total Cost</th>
              <th className="p-4 text-center">Remarks</th>
            </tr>
          </thead>

          <tbody>
  {purchaseData.map((row, index) => (
    <tr key={index} className="border-b hover:bg-gray-50">
      <td className="p-4 text-center">{index + 1}</td>
      <td className="p-4 text-center">{Date.now()}</td>
      <td className="p-4">{row.item}</td>
      <td className="p-4 text-center">{row.quantityKg}</td>
      <td className="p-4 text-center">{row.rate}</td>
      <td className="p-4 text-right">{row.cost}</td>
      <td className="p-4 text-right">{row.transportCharge}</td>
      <td className="p-4 text-right">{row.labourCharge}</td>
      <td className="p-4 text-right font-semibold">
        {row.totalCost}
      </td>
      <td className="p-4 text-center">{row.remarks}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default PurchasesRoom;
