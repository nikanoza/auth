import { Request, Response } from "express";

export const getGoogleAccountInfo = async (req: Request, res: Response) => {
  const { user } = req;
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(401);
};
