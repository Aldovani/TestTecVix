import { user } from "@prisma/client";
import { Response } from "express";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";
import { CustomRequest } from "../types/custom";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getById(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    return res.status(STATUS_CODE.OK).json(user);
  }

  async createNewUser(req: CustomRequest<unknown>, res: Response) {
    await this.userService.createNewUser(req.body);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.updateUser(req.body, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    await this.userService.deleteUser(user);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }
}
