import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import authRouter from "./routes/auth-router.js";
import swaggerMiddleware from "./middlewars/swagger-middleware.js";
import createCredentials from "./config/passport.js";
import passportRouter from "./routes/passport-router.js";
import session from "express-session";
import passport from "passport";

dotenv.config();
connect();
createCredentials();

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/api", authRouter);
app.use("/auth", passportRouter);

app.use("/", ...swaggerMiddleware);

app.listen(process.env.PORT || 3000);
