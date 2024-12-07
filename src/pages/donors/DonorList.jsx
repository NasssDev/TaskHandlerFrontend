import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { donorService } from '../../services/donorService';

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donors</h1>
        <Link
          to="/donors/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Donor
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {donors.map((donor) => (
          <Link
            key={donor.id}
            to={`/donors/${donor.id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{donor.name}</h3>
            <p className="text-gray-600 mb-2">{donor.email}</p>
            <p className="text-sm text-gray-500">
              Type: {donor.donationType}
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className={`${donor.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                {donor.status}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DonorList; 