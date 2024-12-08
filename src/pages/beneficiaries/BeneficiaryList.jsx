import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { beneficiaryService } from '../../services/beneficiaryService';

function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const data = await beneficiaryService.getAllBeneficiaries();
      setBeneficiaries(data);
    } catch (err) {
      setError('Failed to fetch beneficiaries');
    } finally {
      setLoading(false);
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    if (filter === 'all') return true;
    return beneficiary.status === filter;
  });

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bénéficiaires</h1>
        <Link
          to="/beneficiaries/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nouveau Bénéficiaire
        </Link>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Tous les Statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBeneficiaries.map((beneficiary) => (
          <Link
            key={beneficiary.id}
            to={`/beneficiaries/${beneficiary.id}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2">{beneficiary.name}</h3>
            <p className="text-gray-600 mb-2">{beneficiary.email}</p>
            <p className="text-sm text-gray-500">
              Need Type: {beneficiary.needType}
            </p>
            <p className="text-sm text-gray-500">
              Status: <span className={`
                ${beneficiary.status === 'active' ? 'text-green-500' : ''}
                ${beneficiary.status === 'urgent' ? 'text-red-500' : ''}
                ${beneficiary.status === 'inactive' ? 'text-gray-500' : ''}
              `}>
                {beneficiary.status}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BeneficiaryList;