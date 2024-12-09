export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api'
  : 'https://freegaza-backend.vercel.app/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    ME: '/auth/me',
  },
  DONORS: {
    BASE: '/donors',
    LINK_BENEFICIARY: (id) => `/donors/${id}/link-beneficiary`,
  },
  BENEFICIARIES: {
    BASE: '/beneficiaries',
    DONOR_HISTORY: (id) => `/beneficiaries/${id}/donor-history`,
  },
  DONATIONS: {
    BASE: '/donations',
    BY_DONOR: (id) => `/donations/donor/${id}`,
    BY_BENEFICIARY: (id) => `/donations/beneficiary/${id}`,
  },
};