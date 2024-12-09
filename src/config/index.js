import { CONFIG as DEV_CONFIG } from './config.development';
import { CONFIG as PROD_CONFIG } from './config.production';

export const CONFIG = process.env.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;

// Export specific configurations
export const API_URL = CONFIG.API_URL;
export const DATABASE = CONFIG.DATABASE; 