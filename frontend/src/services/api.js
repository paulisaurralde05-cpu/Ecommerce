import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const loginAdmin = (ruta, body) => api.post(`${ruta}/`, body);
export const loginCliente = (ruta, body) => api.post(`${ruta}/login`, body);
export const getPerfil = (ruta) => {
    const clientAccessToken = localStorage.getItem("clientAccessToken");
    console.log("Token:", clientAccessToken);
    return api.get(`${ruta}/perfil`, { headers: { Authorization: `Bearer ${clientAccessToken}` } });
}

export const getMetricas = (ruta) => {
    const adminAccessToken = localStorage.getItem("adminAccessToken");
    console.log("Admin Access Token:", adminAccessToken);
    return api.get(`${ruta}/metricas`, { headers: { Authorization: `Bearer ${adminAccessToken}` } });
}
export const getProducts = (params) => {
    const token = localStorage.getItem("ac");
    return api.get(`products/`, { params, headers: { Authorization: `Bearer ${token}`} });
}