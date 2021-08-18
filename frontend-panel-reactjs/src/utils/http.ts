import Axios from "axios";

const axios = Axios.create()

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";

axios.defaults.headers.common["Accept"] = "application/json";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (!!token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, (error) => {
  if (error?.response?.status === 401) localStorage.removeItem("access_token");
  return Promise.reject(error.response)
});

export default axios;
