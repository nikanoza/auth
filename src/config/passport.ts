import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport, { Profile } from "passport";
import { Request } from "express";
import User from "../models/User";

const createCredentials = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      function (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
      ) {
        try {
          return done(null, profile);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOne({ id });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default createCredentials;
