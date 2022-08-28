import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { UserProvider } from '../contexts/UserContext';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Head>
                <title>Encurte Livre</title>
            </Head>
            <ToastContainer limit={5} />
            <Header />
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
