import { ICreateSession, ISession } from '../../../@types/session';
import { api } from '../axios';

class SessionService {
    static async createSession(data: ICreateSession): Promise<ISession> {
        const session = await api.post<ISession>('/session', data);

        return session.data;
    }
}

export { SessionService };
