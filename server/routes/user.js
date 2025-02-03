import express from "express";
import { register } from "../controllers/user.js";
import { verifyUser } from "../controllers/user.js";
const  userRouter = express.Router();

userRouter.post('/user/register',register)
userRouter.post('/user/verify',verifyUser)


export default userRouter;
