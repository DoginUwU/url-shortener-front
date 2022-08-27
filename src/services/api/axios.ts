import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.response.data.error) {
            toast.error(err.response.data.error);

            return Promise.reject(err);
        }

        toast.error('Erro ao realizar requisição');

        return Promise.reject(err);
    },
);

export { api };
