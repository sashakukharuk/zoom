import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStatic} from "passport";
import {connectionDb} from "../helpers/connectionDb";
import {UserType} from "../types/UserType";
import {config} from "dotenv";
config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT,
}

export const passportJwt = (passport: PassportStatic) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                if (payload.type !== 'access') {
                    done('Invalid token', false);
                }
                const db = await connectionDb();
                // @ts-ignore
                const [user]: [UserType[]] = await db.execute("SELECT * FROM `users` WHERE `id` = ?", [payload.id]);
                if (user[0]) {
                    done(null, user[0]);
                } else {
                    done(null, false);
                }
                await db.end();
            } catch (err) {
                console.log(err);
            }
        })
    );
};
