import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5001',
  baseURL: 'http://3.27.132.93:5001', 
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
