import axios from 'axios';
import { API_URL, API_ROUTES } from '../config/config';

export const beneficiaryService = {
  getAllBeneficiaries: async () => {
    const response = await axios.get(`${API_URL}${API_ROUTES.BENEFICIARIES.BASE}`);
    return response.data;
  },

  getBeneficiaryById: async (id) => {
    const response = await axios.get(`${API_URL}${API_ROUTES.BENEFICIARIES.BASE}/${id}`);
    return response.data;
  },

  createBeneficiary: async (beneficiaryData) => {
    const response = await axios.post(`${API_URL}${API_ROUTES.BENEFICIARIES.BASE}`, beneficiaryData);
    return response.data;
  },

  updateBeneficiary: async (id, beneficiaryData) => {
    const response = await axios.put(`${API_URL}${API_ROUTES.BENEFICIARIES.BASE}/${id}`, beneficiaryData);
    return response.data;
  },

  deleteBeneficiary: async (id) => {
    await axios.delete(`${API_URL}${API_ROUTES.BENEFICIARIES.BASE}/${id}`);
  },

  getDonorHistory: async (id) => {
    const response = await axios.get(`${API_URL}${API_ROUTES.BENEFICIARIES.DONOR_HISTORY(id)}`);
    return response.data;
  },
}; 