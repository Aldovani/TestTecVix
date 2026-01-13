import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.AUTH; // /api/v1/auth

const authRoutes = Router();

export const makeAuthController = () => {
  const service = new AuthService();
  return new AuthController(service);
};

const authController = makeAuthController();

authRoutes.post(`${BASE_PATH}/login`, async (req, res) => {
  await authController.login(req, res);
});

authRoutes.post(`${BASE_PATH}/register`, async (req, res) => {
  await authController.register(req, res);
});

export { authRoutes };
