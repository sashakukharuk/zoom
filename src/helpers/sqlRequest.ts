import mysql2 from "mysql2";
import {connectionDb} from "./connectionDb";

export const sqlRequest = async (sql: string): Promise<[(mysql2.RowDataPacket[] | mysql2.RowDataPacket[][] | mysql2.OkPacket | mysql2.OkPacket[] | mysql2.ResultSetHeader), mysql2.FieldPacket[]]> => {
    const db = await connectionDb();
    const result = await db.execute(sql);
    await db.end();
    return result;
};
