function DonorHistory({ history }) {
    return (
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-500">Aucun historique de don disponible.</p>
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
                    Type: {record.donationType === 'financial' ? 'Financier' : 
                          record.donationType === 'goods' ? 'Biens' : 'Services'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Montant: {record.amount} €
                  </p>
                  {record.frequency && (
                    <p className="text-sm text-gray-600">
                      Fréquence: {
                        record.frequency === 'one-time' ? 'Unique' :
                        record.frequency === 'monthly' ? 'Mensuel' :
                        record.frequency === 'quarterly' ? 'Trimestriel' : 'Annuel'
                      }
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    record.status === 'completed' ? 'bg-green-100 text-green-800' :
                    record.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status === 'completed' ? 'Terminé' :
                     record.status === 'active' ? 'En cours' : 'En attente'}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(record.startDate).toLocaleDateString('fr-FR')}
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