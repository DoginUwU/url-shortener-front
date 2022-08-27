import JSConfetti from 'js-confetti';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const Created: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const link = `${process.env.NEXT_PUBLIC_URL}${id}`;

    useEffect(() => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }, []);

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
            <h1 className="leading-[80px] font-bold text-[32px] max-w-[780px] text-center">Seu link foi criado</h1>
            <CopyToClipboard text={link} onCopy={handleCopy}>
                <div className="p-4 rounded-xl flex gap-4 items-center bg-primary cursor-pointer transition hover:-translate-y-1">
                    <p className="text-white">{link}</p>
                </div>
            </CopyToClipboard>
        </div>
    );
};

export default Created;
