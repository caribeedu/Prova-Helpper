import sequelizeService from '../../common/services/sequelize.service';
import { UserDto } from './../dto/users.model';
import { DataTypes, ModelDefined } from 'sequelize';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:dao');

class UsersDao {
    private static instance: UsersDao;

    constructor() {
        debugLog('Syncing database schema...');

        this.Users.sync().then((): void => debugLog('Database schema sync completed successfully.'));
    }

    Users: ModelDefined<UserDto, UserDto> = sequelizeService.getSequelize().define('Users', {
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true, 
                    len: [0, 128]
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true,
                    len: [3, 64]
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,       
                    notEmpty: true
                }
            },
            permission_level: {
                type: DataTypes.ENUM('1', '2'),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {     
                    notEmpty: true, 
                    isAlphanumeric: true,
                    len: [4, 512]
                }
            }
    }, { createdAt: false, updatedAt: false });

    static getInstance(): UsersDao {
        if (!UsersDao.instance) {
            UsersDao.instance = new UsersDao();
        }
        return UsersDao.instance;
    }

    async getUsers() {
        return this.Users.findAll().then((usersList) => { return usersList.map((item) => { return item.get(); }) });
    }
    
    async getUserById(userId: number) {
        return this.Users.findByPk(userId).then((user) => { return user?.get(); });
    }
    
    async getUserByEmail(email: string) {
        return this.Users.findOne({ where: { email } }).then((user) => { return user?.get(); });
    }

    async addUser(user: UserDto) {
        return this.Users.create(user);
    }

    async putUserById(user: UserDto) {
        return this.Users.update(user, { where: { id: user.id } });
    }

    async removeUserById(userId: number) {
        return this.Users.destroy({ where: { id: userId } });
    }
}

export default UsersDao.getInstance();