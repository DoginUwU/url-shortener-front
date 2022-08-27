/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import urlMetadata from 'url-metadata';
import { IShortener } from '../@types/shortener';
import Footer from '../components/Footer';
import { ShortenerService } from '../services/api/shortener';

interface IProps {
    metas: {
        title: string;
        description: string;
        image: string;
    };
    shortener: IShortener;
}

const Shortener: NextPage<IProps> = ({ metas, shortener }) => {
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((value) => (value > 0 ? value - 1 : value));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (secondsLeft === 0) {
            window.location.href = shortener.url;
        }
    }, [secondsLeft, shortener.url]);

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-10">
            <Head>
                <title>{metas.title}</title>
                <meta name="description" content={metas.description} />
                <meta name="image" content={metas.image} />
                <meta property="og:title" content={metas.title} />
                <meta property="og:description" content={metas.description} />
                <meta property="og:image" content={metas.image} />
            </Head>
            <img className="w-48 animate-bounce" src="/assets/logo.svg" alt="Encurte seu link" />
            <p className="font-bold text-white">Você será redirecionado em {secondsLeft} segundos...</p>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

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
        shortener = await ShortenerService.getShortener(id as string);
    } catch (error) {
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

    const metadata = await urlMetadata(shortener.url);

    return {
        props: {
            metas: {
                title: metadata.title || 'Encurte seu link',
                description: metadata.description || 'Seu link de forma muito mais atrativa.',
                image: metadata.image || '',
            },
            shortener,
        },
    };
};

export default Shortener;
