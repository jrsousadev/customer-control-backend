import { Router } from "express";
import { AuthenticateUserController } from "../../../../../modules/User/UseCases/AuthenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../../modules/User/UseCases/CreateUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post('/create', createUserController.handle);

const authenticateUserController = new AuthenticateUserController();
userRoutes.post('/login', authenticateUserController.handle);

export default userRoutes;