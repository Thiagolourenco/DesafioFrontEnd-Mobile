import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.147.244.100/api/',
});

export default api;
