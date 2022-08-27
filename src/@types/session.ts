import { IUser } from './user';

interface ISession {
    user: IUser;
    token: string;
}

interface ICreateSession {
    email: string;
    password: string;
}

export type { ISession, ICreateSession };
