import { user } from "@prisma/client";
import { NextFunction, Response } from "express";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/userModel";
import { CustomRequest } from "../types/custom";
import { verifyToken } from "../utils/jwt";

export const authUser = async (
  req: CustomRequest<user>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];

  const userModel = new UserModel();

  const user = await verifyToken(token);
  const data = await userModel.getById(user.idUser);

  if (!data) {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }

  req.user = data;
  return next();
};
