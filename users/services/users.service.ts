import usersDao from '../daos/users.dao';
import { CRUD } from "../../common/interfaces/crud.interface";
import { UserDto } from "../dto/users.model";

class UsersService implements CRUD {
    private static instance: UsersService;

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    async create(resource: UserDto) {
        return await usersDao.addUser(resource);
    }

    async deleteById(resourceId: number) {
        return await usersDao.removeUserById(resourceId);
    };

    async list() {
        return await usersDao.getUsers();
    };

    async readById(resourceId: number) {
        return await usersDao.getUserById(resourceId);
    };
    
    async getByEmail(resource: string) {
        return await usersDao.getUserByEmail(resource);
    };

    async updateById(resource: UserDto) {
        return await usersDao.putUserById(resource);
    };
}

export default UsersService.getInstance();