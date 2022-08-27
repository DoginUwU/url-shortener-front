import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ICreateShortener } from '../@types/shortener';
import Footer from '../components/Footer';
import { URL_REGEX_VALIDATE } from '../constants/regex';
import { useUser } from '../contexts/UserContext';
import { ShortenerService } from '../services/api/shortener';

const schema = yup.object({
    url: yup.string().required().trim().matches(URL_REGEX_VALIDATE),
    limit: yup
        .number()
        .min(0)
        .integer()
        .max(100)
        .transform((value) => (isNaN(value) || value === 0 ? undefined : value)),
    password: yup
        .string()
        .trim()
        .transform((value) => (value.length > 0 ? value : undefined)),
    category: yup
        .string()
        .trim()
        .transform((value) => (value.length > 0 ? value : undefined)),
});

const Home: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useUser();
    const { register, handleSubmit, watch } = useForm<ICreateShortener>({
        resolver: yupResolver(schema),
    });
    const watchURL = watch('url');
    const showConfigs = watchURL && watchURL.length > 0;
    const showConfigsStyle = showConfigs ? 'h-fit p-4' : 'h-0 p-0';

    const onSubmit = async (data: ICreateShortener) => {
        const service = isAuthenticated
            ? ShortenerService.createPrivateShortenerUrl
            : ShortenerService.createShortenerUrl;
        const { shortId } = await service(data);

        router.push({
            pathname: '/created',
            query: { id: shortId },
        });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-20">
            <h1 className="leading-[80px] font-bold text-[64px] max-w-[780px] text-center text-white">
                Seu <strong>link</strong> de forma muito mais atrativa.
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2 bg-white rounded-sm flex gap-2 shadow-md">
                    <input
                        className="text-black min-w-[500px] outline-none"
                        placeholder="Digite seu URL"
                        type="text"
                        autoComplete="off"
                        {...register('url')}
                    />
                    <button
                        className="bg-primary text-white px-3 py-2 rounded-md transition border-2 border-transparent hover:bg-white hover:text-primary hover:border-primary"
                        type="submit"
                    >
                        Encurtar
                    </button>
                </div>
                <div
                    className={`${showConfigsStyle} transition-all bg-white rounded-sm flex gap-2 flex-col shadow-md overflow-hidden`}
                >
                    <h2 className="text-black font-bold">Configurações de link:</h2>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="limit">
                            Limite de clicks:
                        </label>
                        <input
                            className="text-black border border-gray-400 rounded-sm px-2"
                            type="number"
                            min="0"
                            max="100"
                            defaultValue="0"
                            id="limit"
                            {...register('limit')}
                        />
                    </div>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="password">
                            Senha:
                        </label>
                        <input
                            className="text-black border border-gray-400 rounded-sm px-2"
                            type="password"
                            placeholder="Ex: 123456"
                            id="password"
                            {...register('password')}
                        />
                    </div>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="category">
                            Categoria:
                        </label>
                        <input
                            className="text-black border border-gray-400 rounded-sm px-2"
                            type="text"
                            placeholder="Ex: jogos"
                            id="category"
                            {...register('category')}
                        />
                    </div>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="length">
                            Quantidade de caracteres:
                        </label>
                        <p className="text-black font-bold">8</p>
                    </div>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="length">
                            Vida útil do link:
                        </label>
                        <p className="text-black font-bold">~ 05/09/2022</p>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Home;
