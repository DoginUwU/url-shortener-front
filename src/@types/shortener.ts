interface IShortener {
    id: string;
    url: string;
    shortId: string;
    clicks: number;
    limit?: number;
    userId?: string;
    password?: string;
    category?: string;
    skip: boolean;
    lifeTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface ICreateShortener {
    url: string;
    lifeTime: string;
    limit?: number;
    password?: string;
    category?: string;
    skip: boolean;
}

export type { IShortener, ICreateShortener };
