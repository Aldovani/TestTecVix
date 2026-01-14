import { Router } from "express";
import { authUser } from "../auth/authUser";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  const service = new UserService();
  return new UserController(service);
};

const userController = makeUserController();

userRoutes.get(`${BASE_PATH}/me`, authUser, async (req, res) => {
  await userController.getById(req, res);
});

userRoutes.post(`${BASE_PATH}/`, async (req, res) => {
  await userController.createNewUser(req, res);
});

userRoutes.put(`${BASE_PATH}/`, authUser, async (req, res) => {
  await userController.updateUser(req, res);
});

userRoutes.delete(`${BASE_PATH}/`, authUser, async (req, res) => {
  await userController.deleteUser(req, res);
});

export { userRoutes };
