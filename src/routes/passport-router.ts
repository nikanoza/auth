import { getGoogleAccountInfo } from "../controllers/passport-controller";
import express from "express";
import passport from "passport";

const passportRouter = express.Router();

passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

passportRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  getGoogleAccountInfo
);

export default passportRouter;
