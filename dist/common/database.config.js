"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2"));
const debug_1 = __importDefault(require("debug"));
const debugLog = debug_1.default('app:database-config');
class DatabaseConfig {
    constructor() {
        this.conn = mysql.createConnection({ host: 'localhost', user: 'root', password: '12345' }).promise();
    }
    ;
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseConfig();
        }
        return this.instance;
    }
    ;
    configureSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            debugLog('Trying to create database "prova_node_edu_caribe"...');
            yield this.conn.execute("CREATE DATABASE IF NOT EXISTS prova_node_edu_caribe;")
                .then(() => debugLog('MySQL database created.'))
                .catch((err) => debugLog('Unable to create a new database. Error: ', err))
                .finally(() => this.conn.destroy());
        });
    }
    ;
}
exports.default = DatabaseConfig.getInstance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29tbW9uL2RhdGFiYXNlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBZ0M7QUFFaEMsa0RBQTBCO0FBRTFCLE1BQU0sUUFBUSxHQUFvQixlQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUvRCxNQUFNLGNBQWM7SUFJaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4RyxDQUFDO0lBQUEsQ0FBQztJQUVLLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztTQUN4QztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQUVXLGVBQWU7O1lBQ3hCLFFBQVEsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBRWpFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0RBQXNELENBQUM7aUJBQzFFLElBQUksQ0FBQyxHQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztpQkFDckQsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsMENBQTBDLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQy9FLE9BQU8sQ0FBQyxHQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBQUEsQ0FBQztDQUNMO0FBRUQsa0JBQWUsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDIn0=