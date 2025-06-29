import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const ApiClient = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' }
});

ApiClient.interceptors.request.use(config => {
  const token =  localStorage.getItem('jwt');
  // console.log(`${token} from apiclient`)
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default ApiClient;
