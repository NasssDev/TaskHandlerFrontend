import { useState } from 'react';

function LinkBeneficiaryForm({ availableBeneficiaries, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    beneficiaryId: '',
    donationType: 'financial',
    amount: '',
    frequency: 'one-time',
    notes: '',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.beneficiaryId) {
      alert('Please select a beneficiary');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h4 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Lier un Bénéficiaire
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="beneficiaryId" className="block text-sm font-medium text-gray-700">
                Bénéficiaire *
              </label>
              <select
                id="beneficiaryId"
                name="beneficiaryId"
                required
                value={formData.beneficiaryId}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Sélectionner un bénéficiaire</option>
                {availableBeneficiaries.map(beneficiary => (
                  <option key={beneficiary.id} value={beneficiary.id}>
                    {beneficiary.name} - {beneficiary.needType === 'financial' ? 'Financier' : 
                                        beneficiary.needType === 'medical' ? 'Médical' : 
                                        beneficiary.needType === 'educational' ? 'Éducatif' : 'Autre'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type de Don</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="financial">Financier</option>
                <option value="goods">Biens</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Montant</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fréquence</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="one-time">Unique</option>
                <option value="monthly">Mensuel</option>
                <option value="quarterly">Trimestriel</option>
                <option value="yearly">Annuel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Lier le Bénéficiaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkBeneficiaryForm;