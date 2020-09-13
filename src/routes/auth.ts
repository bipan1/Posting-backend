import { Router } from 'express'
import AuthController from '../controllers/authController';
const authRouter = Router()

const authCtrl = new AuthController()

authRouter.post("/", authCtrl.register);
authRouter.post("/login", authCtrl.login);

export default authRouter;