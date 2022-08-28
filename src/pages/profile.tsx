import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';
import { ShortenerService } from '../services/api/shortener';
import { distanceFromNow } from '../utils/date';
import { getShortUrl } from '../utils/string';

const Profile: NextPage = () => {
    const router = useRouter();
    const { links, isAuthenticated, getLinks } = useUser();

    const handleDelete = async (shortId: string) => {
        await ShortenerService.deleteShortener(shortId);

        toast.success('URL deletado com sucesso!', {
            theme: 'dark',
        });

        getLinks();
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [router, isAuthenticated]);

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-5 p-4">
            <Head>
                <title>Profile</title>
            </Head>
            <div className="w-full max-h-96 overflow-x-auto p-4 rounded-xl flex flex-col gap-4 bg-white shadow-md transition">
                <h2 className="text-black font-bold text-lg text-center">Seus links:</h2>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Link
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Link completo
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Cliques
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Limite
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Categoria
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Expira em
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link) => {
                            const shortUrl = getShortUrl(link.shortId);

                            return (
                                <tr
                                    key={link.shortId}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="py-4 px-6">
                                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                                            {shortUrl}
                                        </a>
                                    </td>
                                    <td className="py-4 px-6">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.url}
                                        </a>
                                    </td>
                                    <td className="py-4 px-6">{link.clicks}</td>
                                    <td className="py-4 px-6">{link.limit}</td>
                                    <td className="py-4 px-6">{link.category}</td>
                                    <td className="py-4 px-6">{distanceFromNow(new Date(link.lifeTime))}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            className="cursor-pointer p-2 bg-red-400 rounded-lg font-bold transition text-white hover:bg-red-500"
                                            onClick={() => handleDelete(link.shortId)}
                                        >
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
