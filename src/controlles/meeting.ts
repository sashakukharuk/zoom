import {Request, Response} from "express";
import {connectionDb} from "../helpers/connectionDb";
import {errorHandler} from "../helpers/errorHandler";


export const getMeetingParameters = async (req: Request, res: Response) => {
    try {
        const db = await connectionDb();
        // @ts-ignore
        const [meeting]: [{ id: number; meeting_number: string; password: string; start: Date }[]] = await db.execute("SELECT * FROM `meetings`");

        await db.end();

        res.status(200).json({
            id: meeting[0].id,
            meetingNumber: meeting[0].meeting_number,
            passWord: meeting[0].password
        });

    } catch (err) {
        errorHandler(res, err);
    }
};
