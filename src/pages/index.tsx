import { yupResolver } from '@hookform/resolvers/yup';
import { addDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { ICreateShortener } from '../@types/shortener';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import { URL_REGEX_VALIDATE } from '../constants/regex';
import { useUser } from '../contexts/UserContext';
import { ShortenerService } from '../services/api/shortener';

const schema = yup.object({
    url: yup.string().required('Digite uma URL').trim().matches(URL_REGEX_VALIDATE, 'URL invalido'),
    lifeTime: yup.date().min(addDays(new Date(), 1), 'A data de expiração deve ser maior que a data atual'),
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
    skip: yup.boolean().transform((value) => !value),
});

const Home: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useUser();
    const estimatedLife = format(addDays(new Date(), 10), "yyyy-MM-dd'T'HH:mm");
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<ICreateShortener>({
        resolver: yupResolver(schema),
        defaultValues: {
            lifeTime: estimatedLife,
            skip: true,
        },
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

    const onInvalid = (data: FieldErrorsImpl<ICreateShortener>) => {
        const error = Object.values(data)[0].message;

        toast.error(error, {
            theme: 'dark',
        });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-4 md:gap-20 p-8 md:p-0">
            <h1 className="md:leading-[80px] font-bold text-[42px] md:text-[64px] max-w-[780px] text-center text-white">
                Seu <strong>link</strong> de forma muito mais atrativa.
            </h1>
            <form className="flex flex-col gap-5 w-full md:w-fit" onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div className="p-2 bg-white rounded-sm flex flex-col sm:flex-row gap-2 shadow-md">
                    <input
                        className="text-black flex-1 md:min-w-[500px] outline-none"
                        placeholder="Digite seu URL"
                        type="text"
                        autoComplete="off"
                        {...register('url')}
                    />
                    <Button type="submit" loading={isSubmitting}>
                        Encurtar
                    </Button>
                </div>
                <div
                    className={`${showConfigsStyle} transition-all bg-white rounded-sm flex gap-2 flex-col shadow-md overflow-hidden`}
                >
                    <h2 className="text-black font-bold">Configurações de link:</h2>
                    <div className="flex gap-2 items-center justify-between flex-col sm:flex-row sm:gap-5">
                        <label className="text-black" htmlFor="limit">
                            Limite de clicks:
                        </label>
                        <Input
                            className="w-full sm:w-52"
                            type="number"
                            min="0"
                            max="100"
                            defaultValue="0"
                            autoComplete="off"
                            id="limit"
                            {...register('limit')}
                        />
                    </div>
                    <div className="flex gap-2 items-center justify-between flex-col sm:flex-row sm:gap-5">
                        <label className="text-black" htmlFor="password">
                            Senha:
                        </label>
                        <Input
                            className="w-full sm:w-52"
                            type="password"
                            placeholder="Ex: 123456"
                            autoComplete="off"
                            id="password"
                            {...register('password')}
                        />
                    </div>
                    <div className="flex gap-2 items-center justify-between flex-col sm:flex-row sm:gap-5">
                        <label className="text-black" htmlFor="category">
                            Categoria:
                        </label>
                        <Input
                            className="w-full sm:w-52"
                            type="text"
                            placeholder="Ex: jogos"
                            autoComplete="off"
                            id="category"
                            {...register('category')}
                        />
                    </div>
                    <div className="flex gap-2 items-center justify-between flex-col sm:flex-row sm:gap-5">
                        <label className="text-black" htmlFor="life">
                            Vida útil do link:
                        </label>
                        <Input
                            className="w-full sm:w-52"
                            type="datetime-local"
                            autoComplete="off"
                            {...register('lifeTime')}
                        />
                    </div>

                    <div className="flex gap-5 items-center justify-between mt-4 sm:mt-0">
                        <label className="text-black" htmlFor="life">
                            Temporizador:
                        </label>
                        <label htmlFor="teal-toggle" className="inline-flex relative items-center cursor-pointer">
                            <input
                                className="sr-only peer"
                                type="checkbox"
                                value=""
                                id="teal-toggle"
                                {...register('skip')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Home;
