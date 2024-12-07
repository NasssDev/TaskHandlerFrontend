import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donorService } from '../../services/donorService';
import { beneficiaryService } from '../../services/beneficiaryService';

function DonorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDonorData();
  }, [id]);

  const fetchDonorData = async () => {
    try {
      const [donorData, beneficiariesData] = await Promise.all([
        donorService.getDonorById(id),
        beneficiaryService.getAllBeneficiaries()
      ]);
      setDonor(donorData);
      setBeneficiaries(beneficiariesData);
    } catch (err) {
      setError('Failed to fetch donor details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updated = await donorService.updateDonor(id, updatedData);
      setDonor(updated);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update donor');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await donorService.deleteDonor(id);
        navigate('/donors');
      } catch (err) {
        setError('Failed to delete donor');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!donor) return <div className="text-center mt-8">Donor not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{donor.name}</h1>
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {isEditing ? (
          <DonorEditForm donor={donor} onSubmit={handleUpdate} />
        ) : (
          <DonorInfo donor={donor} />
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Linked Beneficiaries</h2>
          <BeneficiaryList
            beneficiaries={donor.Beneficiaries || []}
            availableBeneficiaries={beneficiaries}
            donorId={id}
            onLink={fetchDonorData}
          />
        </div>
      </div>
    </div>
  );
}

export default DonorDetail; 