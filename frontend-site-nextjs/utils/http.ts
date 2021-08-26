import Cookies from 'js-cookie';
import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create({
    baseURL: "http://localhost:8000/api"
})

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.withCredentials = true
    let accessToken
    accessToken = process.browser
        ? localStorage.getItem("access_token")
        : Cookies.get('access_token')
    if (accessToken)
        config.headers['Authorization'] = `Bearer ${accessToken}`
    return config;
})

export default axios;