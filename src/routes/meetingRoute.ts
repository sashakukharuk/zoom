import {Router} from "express";
import {getMeetingParameters} from "../controlles/meeting";
import passport from "passport";

const router  = Router();

router.get('/parameters', passport.authenticate('jwt', {session: false}), getMeetingParameters);

export default router;
