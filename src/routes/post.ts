import { Router } from 'express'
import PostController from '../controllers/postController';
import authenticate from "../middleware/authenticate";

const postRouter = Router()

const postCtrl = new PostController()

postRouter.post("/create", authenticate, postCtrl.post)
// postRouter.get("/:id", todoCtrl.getById)
postRouter.post("/getAll", postCtrl.get)
postRouter.post("/delete", authenticate, postCtrl.deletePost)
postRouter.post("/update", authenticate, postCtrl.updatePost)
postRouter.get("/getOwn", authenticate, postCtrl.getOwnPosts)


export default postRouter;