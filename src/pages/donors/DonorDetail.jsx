import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { donorService } from '../../services/donorService';
import { beneficiaryService } from '../../services/beneficiaryService';
import DonorEditForm from '../../components/donors/DonorEditForm';
import LinkBeneficiaryForm from '../../components/donors/LinkBeneficiaryForm';

function DonorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

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

  const handleLinkBeneficiary = async (linkData) => {
    try {
      await donorService.linkBeneficiary(id, linkData);
      setIsLinking(false);
      fetchDonorData();
    } catch (err) {
      setError('Failed to link beneficiary');
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
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Contact Information</h3>
              <p className="text-gray-600">Email: {donor.email}</p>
              <p className="text-gray-600">Phone: {donor.phone}</p>
              <p className="text-gray-600">Address: {donor.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Donation Details</h3>
              <p className="text-gray-600">Type: {donor.donationType}</p>
              <p className="text-gray-600">Status: {donor.status}</p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Linked Beneficiaries</h2>
            <button
              onClick={() => setIsLinking(!isLinking)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {isLinking ? 'Cancel' : 'Link New Beneficiary'}
            </button>
          </div>

          {isLinking && (
            <div className="mb-6">
              <LinkBeneficiaryForm
                availableBeneficiaries={beneficiaries.filter(b => 
                  !donor.Beneficiaries?.some(db => db.id === b.id)
                )}
                onSubmit={handleLinkBeneficiary}
                onCancel={() => setIsLinking(false)}
              />
            </div>
          )}

          <div className="space-y-4">
            {donor.Beneficiaries?.map(beneficiary => (
              <div
                key={beneficiary.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{beneficiary.name}</h3>
                    <p className="text-sm text-gray-600">
                      Need Type: {beneficiary.needType}
                    </p>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${
                    beneficiary.status === 'urgent' ? 'bg-red-100 text-red-800' :
                    beneficiary.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {beneficiary.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDetail;