"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../database.config"));
const debug_1 = __importDefault(require("debug"));
const debugLog = debug_1.default('app:sequelizeservice');
class SequelizeService {
    constructor() {
        database_config_1.default.configureSchema();
        this.sequelize = new sequelize_1.Sequelize('prova_node_edu_caribe', 'root', '12345', {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            retry: {
                max: 3
            },
            pool: {
                min: 0,
                max: 10
            },
            logging: false
        });
        this.connectWithRetry();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new SequelizeService();
        }
        return this.instance;
    }
    ;
    getSequelize() {
        return this.sequelize;
    }
    ;
    connectWithRetry() {
        debugLog('Trying to connect to MySQL server instance...');
        this.sequelize.authenticate()
            .then(() => debugLog('MySQL database connected.'))
            .catch((err) => debugLog('Unable to connect to the MySQL database. Error: ', err));
    }
    ;
}
exports.default = SequelizeService.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvc2VxdWVsaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBc0M7QUFDdEMseUVBQWdEO0FBQ2hELGtEQUEwQjtBQUUxQixNQUFNLFFBQVEsR0FBb0IsZUFBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFaEUsTUFBTSxnQkFBZ0I7SUFJbEI7UUFDSSx5QkFBYyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUMxQix1QkFBdUIsRUFDdkIsTUFBTSxFQUNOLE9BQU8sRUFDUDtZQUNJLElBQUksRUFBRSxXQUFXO1lBQ2pCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEdBQUcsRUFBRSxDQUFDO2FBQ1Q7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsR0FBRyxFQUFFLENBQUM7Z0JBQ04sR0FBRyxFQUFFLEVBQUU7YUFDVjtZQUNELE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBQSxDQUFDO0lBRUssTUFBTSxDQUFDLFdBQVc7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUFBLENBQUM7SUFFSyxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFBQSxDQUFDO0lBRU0sZ0JBQWdCO1FBQ3BCLFFBQVEsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO2FBQ3hCLElBQUksQ0FBQyxHQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUN2RCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFBQSxDQUFDO0NBQ0w7QUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyJ9