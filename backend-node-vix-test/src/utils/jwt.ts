import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/userModel";

const secret = process.env.JWT_SECRET;

interface IPayload {
  id: string;
  role: string;
}

const userModel = new UserModel();
export const genToken = (payload: IPayload) => {
  const token = jwt.sign(payload, secret as string, { expiresIn: "1d" });
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const data = jwt.verify(token, secret as string) as IPayload;

    const user = await userModel.getById(data.id);

    if (!user) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    return user;
  } catch {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
