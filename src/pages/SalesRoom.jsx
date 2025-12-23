function SalesRoom() {
  const salesData = [
  {
    "date": "21-11-2025",
    "flushStage": "1st",
    "grossWeight": 36,
    "wastage": "NA",
    "netWeight": 36,
    "amount": 5820
  },
  {
    "date": "22-11-2025",
    "flushStage": "1st",
    "grossWeight": 405,
    "wastage": "NA",
    "netWeight": 405,
    "amount": 61800
  }
]

  return (
    <div className="p-2 overflow-x-auto">
      <div className="bg-white shadow-lg rounded-md border">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="p-4 text-center">S.No</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Flush Stage</th>
              <th className="p-4 text-center">Gross Weight</th>
              <th className="p-4 text-center">Wastage</th>
              <th className="p-4 text-center">Net Weight</th>
              <th className="p-4 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.date}</td>
                <td>{row.flushStage}</td>
                <td>{row.grossWeight}</td>
                <td>{row.wastage}</td>
                <td>{row.netWeight}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesRoom;
