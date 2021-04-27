import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {connectionDb} from "../helpers/connectionDb";
import {UserType} from "../types/UserType";
import dotenv from "dotenv";
import moment from "moment";
import {generateTokens} from "../helpers/generateToken";
import {errorHandler} from "../helpers/errorHandler";
import mysql2 from "mysql2";
import {sqlRequest} from "../helpers/sqlRequest";

dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const db = await connectionDb();
        // @ts-ignore
        const [user]: [UserType[]] = await db.execute("SELECT * FROM `users` WHERE `email` = ?", [req.body.email]);
        if (user[0]) {
            // @ts-ignore
            const passwordResult = bcrypt.compareSync(req.body.password, user[0].password);

            if (passwordResult) {
                // @ts-ignore
                const tokens = generateTokens(user[0]);

                await db.query("UPDATE `users` SET `refresh_token` = ?, `adate` = ? WHERE id = ?", [tokens.refreshToken, moment().format('YYYY-MM-DD HH:mm:ss'), user[0].id]);

                res.status(200).json({
                    accessToken: `Bearer ${tokens.accessToken}`,
                    refreshToken: tokens.refreshToken
                });

            } else {
                res.status(401).json({
                    message: 'Invalid email and password'
                });
            }
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

export const refreshTokens = async (req: Request, res: Response) => {
    try {
        const refreshToken: any = jwt.verify(req.body.refreshToken, process.env.SECRET_JWT);

        if (refreshToken.type !== 'refresh') {
            res.status(400). json({message: 'Invalid token'});
        }

        const tokens = generateTokens(refreshToken);

        const sql = mysql2.format("UPDATE `users` SET `refresh_token` = ?, `adate` = ? WHERE id = ?", [tokens.refreshToken, moment().format('YYYY-MM-DD HH:mm:ss'), refreshToken.id]);

        await sqlRequest(sql);

        res.status(200).json({
            accessToken: `Bearer ${tokens.accessToken}`,
            refreshToken: tokens.refreshToken
        });

    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(400).json({message: 'Token expired'});
        } else {
            errorHandler(res, err);
        }
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const db = await connectionDb();
        // @ts-ignore
        const [user]: [UserType[]] = await db.execute("SELECT * FROM `users` WHERE `username` = ?", [req.body.email]);
        if (user[0]) {
            res.status(409).json({
                message: "Email is using"
            });
        } else {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(req.body.password, salt);
            await db.query("INSERT INTO `users` SET ?", {username: req.body.email, password: passwordHash, fio: 'test', position: 'test', stoken: 'test', adate: moment().format('YYYY-MM-DD HH:mm:ss'), ishide: 0});
            res.status(200).json({
                message: "Successful"
            });
        }
        await db.end();
    } catch (err) {
        errorHandler(res, err);
    }
};
