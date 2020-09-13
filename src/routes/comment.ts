import { Router } from 'express';
import CommentController from '../controllers/commentController';
import authenticate from "../middleware/authenticate";

const commentRouter = Router()

const todoCtrl = new CommentController()

commentRouter.post("/", authenticate, todoCtrl.saveComment);
commentRouter.post("/child", authenticate, todoCtrl.saveChildComment);
commentRouter.post("/getChild", authenticate, todoCtrl.getChildComments);

export default commentRouter;