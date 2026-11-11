import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const loginAdmin = (ruta, body) => api.post(`${ruta}/login`, body);
export const loginCliente = (ruta, body) => api.post(`${ruta}/login`, body);


// AUTENTICACIÓN

// Renovar Access Token

export const refreshAuthToken = (refreshToken) => {
    return api.post('auth/refresh', { refreshToken });
}

// cerrar sesion en el backend
export const logoutAuth = (refreshToken) => {
    return api.post('auth/logout', { refreshToken });
}

// CLIENTE
export const getPerfil = (ruta, token) => {
    return api.get(`${ruta}/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const getPublicProducts = (params) => {
    return api.get(`products/`, {
        params
    });
}

// ADMIN

export const getUsuarios = (token) => {

    return api.get('admin/usuarios', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMetricas = (ruta, token) => {
    return api.get(`${ruta}/metricas`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
export const getProducts = (params, token = null) => {
    return api.get(`products/`, {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const createProduct = (body, token) => {
    return api.post(`products/`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const editProduct = (id, body, token) => {
    return api.put(`products/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const deleteProduct = (id, token) => {
    return api.delete(`products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}