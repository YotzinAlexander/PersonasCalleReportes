

import axios from 'axios';
import {getEnvVariables} from '../helpers/getEnvVariables'

const {VITE_API_URL} = getEnvVariables

const reporteApi = axios.create({
    baseURL: 'http://localhost:3001',
});


// cambiar por ip de servidor en CardEventosAsignadosUser y CardEventosAsignados para hcer la conexion de los sockets


reporteApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default reporteApi;