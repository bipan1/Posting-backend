import {Router} from 'express';
import postRouter from './post';
import commentRouter from './comment';
import authRouter from './auth';
import profileRouter from './profile';

const router = Router()

router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/auth", authRouter);
router.use("/profile", profileRouter);

export default router;