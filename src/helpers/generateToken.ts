import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {UserType} from "../types/UserType";
dotenv.config();

export const generateTokens = (user: UserType) => {

    const accessToken = jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        type: 'access'
    }, process.env.SECRET_JWT, {expiresIn: 60 * 15});

    const refreshToken = jwt.sign({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        type: 'refresh'
    }, process.env.SECRET_JWT, {expiresIn: '24h'});

    return {accessToken, refreshToken};
};
