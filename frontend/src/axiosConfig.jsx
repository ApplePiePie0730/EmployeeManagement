import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.27.132.93:5001', // local
  //baseURL: 'http://13.238.218.155/', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
