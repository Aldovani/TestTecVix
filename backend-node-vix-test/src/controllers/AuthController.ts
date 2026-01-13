import { Response } from "express";
import { STATUS_CODE } from "../constants/statusCode";
import { AuthService } from "../services/AuthService";
import { CustomRequest } from "../types/custom";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: CustomRequest<unknown>, res: Response) {
    const result = await this.authService.login(req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    await this.authService.register(req.body);
    return res.status(STATUS_CODE.NO_CONTENT).send();
  }
}
