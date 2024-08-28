import { Router } from "express";
import { loginUser, signupUser } from "../controllers/user.js";
export const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
