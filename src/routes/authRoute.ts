import {Router} from "express";
import {login, register, refreshTokens} from "../controlles/auth";

const router  = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh-tokens', refreshTokens);

export default router;
