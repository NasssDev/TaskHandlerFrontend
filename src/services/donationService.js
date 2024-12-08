import axios from 'axios';
import { API_URL, API_ROUTES } from '../config/config';

export const donationService = {
  createDonation: async (donationData) => {
    const response = await axios.post(`${API_URL}${API_ROUTES.DONATIONS.BASE}`, donationData);
    return response.data;
  },

  getDonationsByDonor: async (donorId) => {
    const response = await axios.get(`${API_URL}${API_ROUTES.DONATIONS.BY_DONOR(donorId)}`);
    return response.data;
  },

  getDonationsByBeneficiary: async (beneficiaryId) => {
    const response = await axios.get(`${API_URL}${API_ROUTES.DONATIONS.BY_BENEFICIARY(beneficiaryId)}`);
    return response.data;
  }
};