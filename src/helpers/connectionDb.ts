import {createConnection, Connection} from "mysql2/promise";
import {config} from "dotenv";
config();

export const connectionDb = async (): Promise<Connection> => {
    try {
        return await createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE
        });
    } catch (err) {
        console.log(err);
    }
};
