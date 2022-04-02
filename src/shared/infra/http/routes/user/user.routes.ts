import { Router } from "express";
import { CreateUserController } from "../../../../../modules/User/UseCases/CreateUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post('/create', createUserController.handle);

export default userRoutes;