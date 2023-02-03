import axios from 'axios';

export interface ApiError {
  timestamp: Date;
  message: string;
  description: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});
