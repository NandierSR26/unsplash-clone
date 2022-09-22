import axios from 'axios';

export const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_PRODUCTION
})

// Todo: configurar interceptores
clienteAxios.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})