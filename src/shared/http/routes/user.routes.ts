import { Router } from "express";
import { validate } from 'express-validation';
import { AuthenticateUserController } from "../../controllers/UserControllers/AuthenticateUserController";
import { CreateUserController } from "../../controllers/UserControllers/CreateUserController";
import { GetUserController } from "../../controllers/UserControllers/GetUserController";

import { 
  CreateAccountSchema, 
  GetUserSchema, 
  LoginAccountSchema 
} from "./schemas/users-schemas";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

// Authenticated
const authenticateUserController = new AuthenticateUserController();
userRoutes.post('/login', validate(LoginAccountSchema), authenticateUserController.handle);

// Create
const createUserController = new CreateUserController();
userRoutes.post('/create', validate(CreateAccountSchema), createUserController.handle);

// Read
const getUserController = new GetUserController();
userRoutes.get('/findone', validate(GetUserSchema), ensureAuthenticated , getUserController.handle);


export default userRoutes;