import authMiddleware from "../middlewars/auth-middlware.js";
import {
  createUser,
  getAllUser,
  login,
} from "../controllers/auth-controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.get("/users", authMiddleware, getAllUser);

export default authRouter;
