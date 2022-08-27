import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ICreateSession, ISession } from '../@types/session';
import { IShortener } from '../@types/shortener';
import { IUser } from '../@types/user';
import { api } from '../services/api/axios';
import { SessionService } from '../services/api/session';
import { ShortenerService } from '../services/api/shortener';

interface IUserContext {
    login: (data: ICreateSession) => Promise<void>;
    getLinks: () => Promise<IShortener[]>;
    user: IUser | null;
    links: IShortener[];
    token: string | null;
    isAuthenticated: boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [links, setLinks] = useState<IShortener[]>([]);

    const login = async (data: ICreateSession): Promise<void> => {
        const response = await SessionService.createSession(data);

        handleInformations(response);

        if (!response) return;
    };

    const getLinks = useCallback(async (): Promise<IShortener[]> => {
        const response = await ShortenerService.getShorteners();
        setLinks(response);

        return response;
    }, []);

    const handleInformations = useCallback(
        (session: ISession): void => {
            setUser(session.user);
            setToken(session.token);
            setIsAuthenticated(true);

            localStorage.setItem('user', JSON.stringify(session.user));
            localStorage.setItem('token', session.token);

            api.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;

            getLinks();
        },
        [getLinks],
    );

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (user && token) {
            handleInformations({ user: JSON.parse(user), token });
        }
    }, [handleInformations]);

    return (
        <UserContext.Provider value={{ login, getLinks, user, token, links, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };
