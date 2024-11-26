import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://161.35.143.238:8000/psosa',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosClient;

