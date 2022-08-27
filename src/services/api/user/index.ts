import { ICreateUser, IUser } from '../../../@types/user';
import { api } from '../axios';

class UserService {
    static async createUser(data: ICreateUser): Promise<IUser> {
        const user = await api.post<IUser>('/user', data);

        return user.data;
    }
}

export { UserService };
