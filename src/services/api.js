import axios from 'axios';
import { API_URL } from '../config/config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createBeneficiary = async (beneficiaryData) => {
  const response = await api.post('/beneficiaries', beneficiaryData);
  return response.data;
};

export default api; 