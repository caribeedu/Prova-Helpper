import { Sequelize } from 'sequelize';
import databaseConfig from '../database.config';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:sequelizeservice');

class SequelizeService {
    private static instance: SequelizeService;
    public sequelize: Sequelize;

    constructor() {
        databaseConfig.configureSchema();

        this.sequelize = new Sequelize(
            'prova_node_edu_caribe',
            'root',
            '12345',
            {
                host: 'localhost',
                dialect: 'mysql',
                port: 3306,
                retry: {
                    max: 3
                },            
                pool: {
                    min: 0,
                    max: 10
                }
            }
        );
        
        this.connectWithRetry();
    };

    public static getInstance() {
        if (!this.instance) {
            this.instance = new SequelizeService();
        }
        return this.instance;
    };

    public getSequelize() {
        return this.sequelize;
    };

    private connectWithRetry() {
        debugLog('Trying to connect to MySQL server instance...');

        this.sequelize.authenticate()
            .then((): void => debugLog('MySQL database connected.'))
            .catch((err): void => debugLog('Unable to connect to the MySQL database. Error: ', err));
    };
}

export default SequelizeService.getInstance();