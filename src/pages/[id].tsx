/* eslint-disable @next/next/no-img-element */
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import requestIp from 'request-ip';
import urlMetadata from 'url-metadata';
import { IShortener } from '../@types/shortener';
import Footer from '../components/Footer';
import { api } from '../services/api/axios';
import { ShortenerService } from '../services/api/shortener';

interface IProps {
    metas?: {
        title: string;
        description: string;
        image: string;
    };
    shortener?: IShortener;
    passwordRequired: boolean;
}

const Shortener: NextPage<IProps> = ({ metas, shortener, passwordRequired }) => {
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((value) => (value > 0 ? value - 1 : value));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!shortener?.url) return;

        if (secondsLeft === 0) {
            window.location.href = shortener.url;
        }
    }, [secondsLeft, shortener?.url]);

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-10">
            <Head>
                <title>{metas?.title}</title>
                <meta name="description" content={metas?.description} />
                <meta name="image" content={metas?.image} />
                <meta property="og:title" content={metas?.title} />
                <meta property="og:description" content={metas?.description} />
                <meta property="og:image" content={metas?.image} />
            </Head>
            <img className="w-48 animate-bounce" src="/assets/logo.svg" alt="Encurte seu link" />
            {!passwordRequired ? (
                <p className="font-bold text-white">Você será redirecionado em {secondsLeft} segundos...</p>
            ) : (
                <form className="flex flex-col gap-4" method="get">
                    <p className="font-bold text-white">Desculpe... mas essa rota precisa de uma senha</p>
                    <input
                        className="h-14 border-2 border-primary outline-primary rounded-md w-full pl-4 text-black"
                        type="password"
                        autoComplete="off"
                        placeholder="Senha do link..."
                        id="password"
                        name="password"
                    />
                    <button className="px-4 py-2 bg-black rounded-lg font-bold transition text-white hover:bg-gray-800">
                        Descriptografar
                    </button>
                </form>
            )}
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, password } = context.query;
    const ip = requestIp.getClientIp(context.req);

    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    let shortener: IShortener;

    try {
        if (ip) {
            api.defaults.headers.common['x-client-ip'] = ip;
            api.defaults.headers.common['x-forwarded-for'] = ip;
        }
        shortener = await ShortenerService.getShortener(id as string, password as string | undefined);
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 403) {
                return {
                    props: {
                        passwordRequired: true,
                    },
                };
            }
        }

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    if (!shortener) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    let metadata: urlMetadata.Result | undefined;

    try {
        metadata = await urlMetadata(shortener.url);
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            metas: {
                title: metadata?.title || 'Encurte seu link',
                description: metadata?.description || 'Seu link de forma muito mais atrativa.',
                image: metadata?.image || '',
            },
            shortener,
            passwordRequired: false,
        },
    };
};

export default Shortener;
