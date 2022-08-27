import { ICreateShortener, IShortener } from '../../../@types/shortener';
import { api } from '../axios';

class ShortenerService {
    static async createShortenerUrl(data: ICreateShortener): Promise<IShortener> {
        const shortener = await api.post<IShortener>('/shortener', data);

        return shortener.data;
    }

    static async getShortener(shortId: string): Promise<IShortener> {
        const shortener = await api.get<IShortener>(`/shortener/${shortId}`);

        return shortener.data;
    }
}

export { ShortenerService };
