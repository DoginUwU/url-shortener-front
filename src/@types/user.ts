interface IUser {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
}

interface ICreateUser {
    username: string;
    email: string;
    password: string;
}

export type { IUser, ICreateUser };
