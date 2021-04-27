import {Request, Response} from "express";
import {connectionDb} from "../helpers/connectionDb";
import {UserType} from "../types/UserType";
import dotenv from "dotenv";
import {errorHandler} from "../helpers/errorHandler";

dotenv.config();

export const getUser = async (req: Request, res: Response) => {
    try {
        const db = await connectionDb();
        // @ts-ignore
        const [user]: [UserType[]] = await db.execute("SELECT * FROM `users` WHERE `email` = ?", [req.user.email]);
        if (user[0]) {
            res.status(200).json({
                id: user[0].id,
                firstName: user[0].first_name,
                lastName: user[0].last_name,
                email: user[0].email,
                role: user[0].role
            })
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
        await db.end();
    } catch (err) {
        errorHandler(res, err);
    }
};

