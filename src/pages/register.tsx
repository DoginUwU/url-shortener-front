import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ICreateUser } from '../@types/user';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';
import { UserService } from '../services/api/user';

const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});

const Register: React.FC = () => {
    const { login } = useUser();
    const router = useRouter();

    const { register, handleSubmit } = useForm<ICreateUser>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ICreateUser) => {
        await UserService.createUser(data);

        await login({
            email: data.email,
            password: data.password,
        });

        router.push('/');
    };

    return (
        <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md p-8 rounded-sm flex flex-col gap-4 bg-white shadow-md transition"
            >
                <h1 className="text-primary font-bold text-4xl">Bem-vindo(a), faça seu registro para continuar.</h1>
                <div className="flex flex-col gap-2 mt-8">
                    <label htmlFor="email" className="text-black">
                        Insira seu nome de usuário para continuar:
                    </label>
                    <input
                        className="h-14 border-2 border-primary outline-primary rounded-md w-full pl-4 text-black"
                        type="text"
                        placeholder="Insira seu nome de usuário"
                        id="username"
                        {...register('username')}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-black">
                        Insira seu e-mail para continuar:
                    </label>
                    <input
                        className="h-14 border-2 border-primary outline-primary rounded-md w-full pl-4 text-black"
                        type="email"
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
                <button
                    className="bg-primary text-white py-4 font-bold rounded-md mt-8 transition hover:opacity-90"
                    type="submit"
                >
                    Criar conta
                </button>
            </form>
            <Link href="/login">
                <p className="text-white cursor-pointer">Já tem uma conta? Clique aqui</p>
            </Link>
            <Footer />
        </div>
    );
};

export default Register;
