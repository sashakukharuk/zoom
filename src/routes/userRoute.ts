import {Router} from "express";
import {getUser} from "../controlles/user";
import passport from "passport";

const router  = Router();

router.get('/', passport.authenticate('jwt', {session: false}), getUser);

export default router;
