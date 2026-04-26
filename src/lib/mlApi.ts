import axios from 'axios';

const mlApi = axios.create({
  baseURL: import.meta.env.VITE_ML_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mlApi;
