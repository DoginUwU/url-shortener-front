import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IAxiosError } from '../../@types/axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.response.use(
    (response) => response,
    (err: AxiosError<IAxiosError>) => {
        if (err.response?.data?.error) {
            toast.error(err.response.data.error, {
                theme: 'dark',
            });

            return Promise.reject(err);
        }

        toast.error('Erro ao realizar requisição', {
            theme: 'dark',
        });

        return Promise.reject(err);
    },
);

export { api };
