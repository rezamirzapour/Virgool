import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create({
    baseURL: "http://localhost:8000/api"
})

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
})

export default axios;