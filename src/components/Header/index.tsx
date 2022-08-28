/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { useUser } from '../../contexts/UserContext';

const Header: React.FC = () => {
    const { isAuthenticated, user, logout } = useUser();

    return (
        <nav className="absolute top-0 left-0 w-screen">
            <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
                <Link href="/">
                    <img className="cursor-pointer hidden md:block" src="/assets/logo.svg" alt="Encurte livre" />
                </Link>
                <div className="flex gap-8 items-center justify-between w-full md:w-fit">
                    {isAuthenticated && user ? (
                        <>
                            <Link href="/profile">
                                <p className="cursor-pointer font-bold text-white">Olá, {user.username}</p>
                            </Link>
                            <div
                                className="cursor-pointer px-4 py-2 bg-black rounded-lg font-bold transition text-white hover:bg-gray-800"
                                onClick={logout}
                            >
                                <p>Sair</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <p className="cursor-pointer font-bold text-white">Login</p>
                            </Link>
                            <a
                                className="px-4 py-2 bg-black rounded-lg font-bold transition text-white hover:bg-gray-800"
                                href="https://github.com/DoginUwU/url-shortener-front"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p>Abrir Github</p>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
