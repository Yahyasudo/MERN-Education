import express from "express";
import { loginUser, myProfil, register } from "../controllers/user.js";
import { verifyUser } from "../controllers/user.js";
import { isAuth } from "../middleweare/isAuth.js";
const  userRouter = express.Router();

userRouter.post('/user/register',register);
userRouter.post('/user/verify',verifyUser);
userRouter.post('/user/login',loginUser);
userRouter.get('/user/me',isAuth,myProfil);


export default userRouter;
