import axios from "axios";

const api_client = axios.create({
    baseURL: 'http://localhost:8000/api',
    // baseURL: ' https://api.pokemontcg.io/v2'
});

api_client.interceptors.request.use((config) => {
    const token = localStorage.getItem('API_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

api_client.interceptors.request.use((res) => {
    return res;
}), (err) => {
    const {res_err} = err;
    if(res_err === 401){
        localStorage.removeItem('API_TOKEN');
    }
    throw err;
}

export default api_client;