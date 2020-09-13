import { Router } from 'express'
import profileController from "../controllers/profileController";
import authenticate from "../middleware/authenticate";
import upload from "../middleware/upload";
const profileRouter = Router()

const profileCtrl = new profileController()

profileRouter.post("/create", authenticate, upload.single('picture'), profileCtrl.createProfile)
profileRouter.get("/getProfile", authenticate, profileCtrl.getProfile)
profileRouter.post("/update", authenticate, upload.single('picture'), profileCtrl.updateProfile)


export default profileRouter;