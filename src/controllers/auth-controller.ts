import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import addUserSchema from "../schemas/add-user-schema";
import { sendVerificationLink } from "mail/edge";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const validator = await addUserSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { name, email, password } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    newUser.save();
    await sendVerificationLink(
      email,
      name,
      "https://auth-production-9ab4.up.railway.app/verify"
    );
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email },
      {
        _id: 0,
        __v: 0,
      }
    ).select("+password");

    if (!user) {
      return res.status(401).json("user with this email did not fined");
    }
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const sightData = {
        name: user.name,
        id: user.id,
      };

      const token = jwt.sign(sightData, process.env.JWT_SECRET!);

      return res.status(200).json({ ...sightData, token });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const getAllUser = async (_: Request, res: Response) => {
  const data = await User.find();

  return res.status(200).json(data);
};
