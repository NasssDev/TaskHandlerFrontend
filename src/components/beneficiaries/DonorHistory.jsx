function DonorHistory({ history }) {
    return (
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-500">No donation history available.</p>
        ) : (
          history.map((record) => (
            <div
              key={record.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{record.Donor.name}</h3>
                  <p className="text-sm text-gray-600">
                    Type: {record.donationType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Amount: ${record.amount}
                  </p>
                  {record.frequency && (
                    <p className="text-sm text-gray-600">
                      Frequency: {record.frequency}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    record.status === 'completed' ? 'bg-green-100 text-green-800' :
                    record.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(record.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {record.notes && (
                <p className="text-sm text-gray-600 mt-2 border-t pt-2">
                  {record.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default DonorHistory;