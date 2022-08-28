import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ICreateSession } from '../@types/session';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});

const Login: React.FC = () => {
    const { login } = useUser();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ICreateSession>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ICreateSession) => {
        await login(data);

        router.push('/');
    };

    return (
        <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md p-8 rounded-sm flex flex-col gap-4 bg-white shadow-md transition"
            >
                <h1 className="text-primary font-bold text-4xl">Bem-vindo(a), faça login para continuar.</h1>
                <div className="flex flex-col gap-2 mt-8">
                    <label htmlFor="email" className="text-black">
                        Insira seu e-mail para continuar:
                    </label>
                    <input
                        className="h-14 border-2 border-primary outline-primary rounded-md w-full pl-4 text-black"
                        type="text"
                        placeholder="Insira seu e-mail"
                        id="email"
                        {...register('email')}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-black">
                        Insira sua senha para continuar:
                    </label>
                    <input
                        className="h-14 border-2 border-primary outline-primary rounded-md w-full pl-4 text-black"
                        type="password"
                        placeholder="Insira sua senha"
                        id="password"
                        {...register('password')}
                    />
                </div>
                <Button className="py-4 font-bold rounded-md mt-8" type="submit" loading={isSubmitting}>
                    Entrar
                </Button>
            </form>
            <Link href="/register">
                <p className="text-white cursor-pointer">Ainda sem conta? Crie uma agora :P</p>
            </Link>
            <Footer />
        </div>
    );
};

export default Login;
