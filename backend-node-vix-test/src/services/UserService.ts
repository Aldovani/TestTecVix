import { user } from "@prisma/client";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/userModel";
import { userCreatedSchema } from "../types/validations/User/createUser";
import { userUpdatedSchema } from "../types/validations/User/updateUser";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getById(idUser: string) {
    return this.userModel.getById(idUser);
  }

  async createNewUser(data: unknown) {
    const validateData = userCreatedSchema.parse(data);

    const createdUser = await this.userModel.createUser({
      ...validateData,
    });

    return createdUser;
  }

  async updateUser(data: unknown, user: user) {
    const validateDataSchema = userUpdatedSchema.parse(data);

    const updatedUser = await this.userModel.updateUser(
      user.idUser,
      validateDataSchema,
    );
    return updatedUser;
  }

  async deleteUser(user: user) {
    const oldUser = await this.getById(user.idUser);

    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const deletedUser = await this.userModel.deleteUser(user.idUser);
    return deletedUser;
  }
}
