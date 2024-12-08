import axios from 'axios';
import { API_URL, API_ROUTES } from '../config/config';

export const donorService = {
  getAllDonors: async () => {
    const response = await axios.get(`${API_URL}${API_ROUTES.DONORS.BASE}`);
    return response.data;
  },

  getDonorById: async (id) => {
    const response = await axios.get(`${API_URL}${API_ROUTES.DONORS.BASE}/${id}`);
    return response.data;
  },

  createDonor: async (donorData) => {
    const response = await axios.post(`${API_URL}${API_ROUTES.DONORS.BASE}`, donorData);
    return response.data;
  },

  updateDonor: async (id, donorData) => {
    const response = await axios.put(`${API_URL}${API_ROUTES.DONORS.BASE}/${id}`, donorData);
    return response.data;
  },

  deleteDonor: async (id) => {
    await axios.delete(`${API_URL}${API_ROUTES.DONORS.BASE}/${id}`);
  },

  linkBeneficiary: async (donorId, linkData) => {
    const response = await axios.post(
      `${API_URL}${API_ROUTES.DONORS.LINK_BENEFICIARY(donorId)}`,
      linkData
    );
    return response.data;
  },
};