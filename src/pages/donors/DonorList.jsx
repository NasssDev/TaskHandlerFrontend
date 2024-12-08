import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { donorService } from '../../services/donorService';

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTableView, setIsTableView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const data = await donorService.getAllDonors();
      setDonors(data);
    } catch (err) {
      setError('Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donateurs</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsTableView(!isTableView)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2"
          >
            {isTableView ? (
              <>
                <i className="fas fa-grid-2"></i>
                Vue Grille
              </>
            ) : (
              <>
                <i className="fas fa-table"></i>
                Vue Tableau
              </>
            )}
          </button>
          <Link
            to="/donors/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Nouveau Donateur
          </Link>
        </div>
      </div>

      {isTableView ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Courriel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Type de Don</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bénéficiaires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donors.map((donor) => (
                <tr 
                  key={donor.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td 
                    className="px-6 py-4 whitespace-nowrap border-r cursor-pointer"
                    onClick={() => navigate(`/donors/${donor.id}`)}
                  >
                    {donor.name}
                  </td>
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-gray-600 border-r cursor-pointer"
                    onClick={() => navigate(`/donors/${donor.id}`)}
                  >
                    {donor.email}
                  </td>
                  <td 
                    className="px-6 py-4 whitespace-nowrap border-r cursor-pointer"
                    onClick={() => navigate(`/donors/${donor.id}`)}
                  >
                    {donor.donationType === 'financial' ? 'Financier' : 
                    donor.donationType === 'goods' ? 'Biens' : 'Services'}
                  </td>
                  <td 
                    className="px-6 py-4 whitespace-nowrap border-r cursor-pointer"
                    onClick={() => navigate(`/donors/${donor.id}`)}
                  >
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      donor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {donor.beneficiaries?.map((beneficiary, index) => (
                      <span 
                        key={beneficiary.id} 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/beneficiaries/${beneficiary.id}`);
                        }}
                        className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        {beneficiary.name}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => (
            <div 
              key={donor.id} 
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate(`/donors/${donor.id}`)}
            >
              <h3 className="font-bold text-lg mb-2">{donor.name}</h3>
              <p className="text-gray-600 mb-2">{donor.email}</p>
              <p className="text-sm text-gray-500">
                Type de Don: {donor.donationType === 'financial' ? 'Financier' : 
                            donor.donationType === 'goods' ? 'Biens' : 'Services'}
              </p>
              <p className="text-sm text-gray-500">
                Statut: <span className={`${
                  donor.status === 'active' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {donor.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonorList;