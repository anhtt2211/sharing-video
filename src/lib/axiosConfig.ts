import axios from 'axios';
import Cookies from 'js-cookie';

// Set the default config for axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
