import JSConfetti from 'js-confetti';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';
import { getShortUrl } from '../utils/string';

const Created: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const link = getShortUrl(id as string);
    const { isAuthenticated, getLinks } = useUser();

    useEffect(() => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ['🦖', '🦴'],
        });
    }, []);

    useEffect(() => {
        if (isAuthenticated) getLinks();
    }, [isAuthenticated, getLinks]);

    const handleCopy = () => {
        router.push('/');
        toast('Copiado para a área de transferência!', {
            icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
            <h1 className="leading-[80px] font-bold text-[32px] max-w-[780px] text-center text-white">
                Seu link foi criado... Viu como é simples?
            </h1>
            <CopyToClipboard text={link} onCopy={handleCopy}>
                <div className="p-4 rounded-xl flex gap-4 items-center bg-white cursor-pointer shadow-md transition hover:-translate-y-1">
                    <p className="text-black">{link}</p>
                </div>
            </CopyToClipboard>
            <Footer />
        </div>
    );
};

export default Created;
