import { ICreateShortener, IShortener } from '../../../@types/shortener';
import { api } from '../axios';

class ShortenerService {
    static async createShortenerUrl(data: ICreateShortener): Promise<IShortener> {
        const shortener = await api.post<IShortener>('/shortener', data);

        return shortener.data;
    }

    static async createPrivateShortenerUrl(data: ICreateShortener): Promise<IShortener> {
        const shortener = await api.post<IShortener>('/shortener/private', data);

        return shortener.data;
    }

    static async getShortener(shortId: string, password?: string): Promise<IShortener> {
        const shortener = await api.get<IShortener>(`/shortener/${shortId}`, {
            params: {
                password,
            },
        });

        return shortener.data;
    }

    static async getShorteners(): Promise<IShortener[]> {
        const shorteners = await api.get<IShortener[]>('/shortener');

        return shorteners.data;
    }

    static async deleteShortener(shortId: string): Promise<void> {
        await api.delete<void>(`/shortener/${shortId}`);
    }
}

export { ShortenerService };
