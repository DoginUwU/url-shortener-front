import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from './helper';
import { ICreateShortener } from '../../@types/shortener';
import { ShortenerService } from '../../services/api/shortener';
import { useRouter } from 'next/router';

const Hero: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ICreateShortener>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ICreateShortener) => {
        const { shortId } = await ShortenerService.createShortenerUrl(data);

        router.push({
            pathname: '/created',
            query: { id: shortId },
        });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-20">
            <h1 className="leading-[80px] font-bold text-[64px] max-w-[780px] text-center">
                Seu <strong className="text-primary">link</strong> de forma muito mais atrativa.
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2 bg-white rounded-xl flex gap-2">
                    <input
                        className="text-black min-w-[500px]"
                        placeholder="Digite seu URL"
                        type="text"
                        {...register('url')}
                    />
                    <button
                        className="bg-primary px-3 py-2 rounded-xl transition border-2 hover:bg-white hover:text-primary hover:border-primary"
                        type="submit"
                    >
                        Encurtar
                    </button>
                </div>
                <div className="p-4 bg-white rounded-xl flex gap-2 flex-col">
                    <h2 className="text-black font-bold">Configurações de link:</h2>
                    <div className="flex gap-5 items-center justify-between">
                        <label className="text-black" htmlFor="limit">
                            Limite de clicks:
                        </label>
                        <input
                            className="text-black border-2 border-gray-400 rounded-md px-2"
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
                            className="text-black border-2 border-gray-400 rounded-md px-2"
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
                            className="text-black border-2 border-gray-400 rounded-md px-2"
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
        </div>
    );
};

export default Hero;
