import * as mysql from 'mysql2';
import { Connection } from 'mysql2/promise';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app:database-config');

class DatabaseConfig {
    private static instance: DatabaseConfig;
    private conn: Connection;

    constructor() {
        this.conn = mysql.createConnection({ host:'localhost', user: 'root', password: '12345' }).promise();
    };
    
    public static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseConfig();
        }
        return this.instance;
    };

    public async configureSchema() {
        debugLog('Trying to create database "prova_node_edu_caribe"...');

        await this.conn.execute("CREATE DATABASE IF NOT EXISTS prova_node_edu_caribe;")
            .then((): void => debugLog('MySQL database created.'))
            .catch((err): void => debugLog('Unable to create a new database. Error: ', err))
            .finally((): void => this.conn.destroy());
    };
}

export default DatabaseConfig.getInstance();