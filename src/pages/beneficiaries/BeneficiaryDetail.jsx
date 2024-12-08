import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { beneficiaryService } from '../../services/beneficiaryService';
import BeneficiaryEditForm from '../../components/beneficiaries/BeneficiaryEditForm';
import DonorHistory from '../../components/beneficiaries/DonorHistory';

function BeneficiaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beneficiary, setBeneficiary] = useState(null);
  const [donorHistory, setDonorHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBeneficiaryData();
  }, [id]);

  const fetchBeneficiaryData = async () => {
    try {
      const [beneficiaryData, historyData] = await Promise.all([
        beneficiaryService.getBeneficiaryById(id),
        beneficiaryService.getDonorHistory(id)
      ]);
      setBeneficiary(beneficiaryData);
      setDonorHistory(historyData);
    } catch (err) {
      setError('Failed to fetch beneficiary details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updated = await beneficiaryService.updateBeneficiary(id, updatedData);
      setBeneficiary(updated);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update beneficiary');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await beneficiaryService.deleteBeneficiary(id);
        navigate('/beneficiaries');
      } catch (err) {
        setError('Failed to delete beneficiary');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!beneficiary) return <div className="text-center mt-8">Beneficiary not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{beneficiary.name}</h1>
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </div>

        {isEditing ? (
          <BeneficiaryEditForm 
            beneficiary={beneficiary} 
            onSubmit={handleUpdate} 
          />
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Contact Information</h3>
              <p className="text-gray-600">Email: {beneficiary.email}</p>
              <p className="text-gray-600">Phone: {beneficiary.phone}</p>
              <p className="text-gray-600">Address: {beneficiary.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Détails du besoin</h3>
              <p className="text-gray-600">Type: {beneficiary.needType === 'financial' ? 'Financier' : 
                            beneficiary.needType === 'goods' ? 'Biens' : 'Services'}</p>
              <p className="text-gray-600">Statut: {beneficiary.status === 'active' ? 'Actif' : 'Inactif'}</p>
              <p className="text-gray-600">Description: {beneficiary.description}</p>
            </div>
          </div>
        )}

        <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Historique des donations</h2>
          <DonorHistory history={donorHistory} />
        </div>
      </div>
    </div>
  );
}

export default BeneficiaryDetail;