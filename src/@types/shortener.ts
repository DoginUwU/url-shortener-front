interface IShortener {
    id: string;
    url: string;
    shortId: string;
    clicks: number;
    limit?: number;
    userId?: string;
    password?: string;
    category?: string;
    lifeTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface ICreateShortener {
    url: string;
    limit?: number;
    password?: string;
    category?: string;
}

export type { IShortener, ICreateShortener };
