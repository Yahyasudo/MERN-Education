import express from "express";
import { register } from "../controllers/user.js";
const  userRouter = express.Router();

userRouter.get('/user/register',register)

export default userRouter;
