import bcrypt from "bcryptjs";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/userModel";
import { loginAuthSchema } from "../types/validations/Auth/loginAuth";
import { registerAuthSchema } from "../types/validations/Auth/registerAuth";
import { genToken } from "../utils/jwt";

export class AuthService {
  constructor() { }

  private userModel = new UserModel();

  async login(body: unknown) {
    const loginCredentialsParsed = loginAuthSchema.parse(body);

    const user = await this.userModel.findByEmail(loginCredentialsParsed.email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const passwordMatch = await bcrypt.compare(
      loginCredentialsParsed.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const accessToken = genToken({
      id: user.idUser,
      role: user.role,
    });

    return { message: "Login successful", user, accessToken };
  }

  async register(body: unknown) {
    const registerCredentialsParsed = registerAuthSchema.parse(body);

    const { username, password, email } = registerCredentialsParsed;

    const existingUser = await this.userModel.findByEmail(email);

    if (existingUser) {
      throw new AppError(
        ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.createUser({
      username,
      password: hashedPassword,
      email,
    });

    return {
      user: {
        idUser: newUser.idUser,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }
}
