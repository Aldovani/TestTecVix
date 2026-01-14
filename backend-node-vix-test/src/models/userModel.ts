import { prisma } from "../database/client";
import { TUserUpdated } from "../types/validations/User/updateUser";

export class UserModel {
  async getById(idUser: string) {
    return await prisma.user.findUnique({
      where: { idUser },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    username: string;
    password: string;
    email: string;
  }) {
    return await prisma.user.create({
      data,
    });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data,
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.delete({
      where: { idUser },
    });
  }
}
