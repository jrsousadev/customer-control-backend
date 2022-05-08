import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/mongodb/User/controllers/AuthenticateUserController";
import { CreateUserController } from "../../../../modules/mongodb/User/controllers/CreateUserController";
import { GetUserController } from "../../../../modules/mongodb/User/controllers/GetUserController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

// Authenticated
const authenticateUserController = new AuthenticateUserController();
userRoutes.post('/login', authenticateUserController.handle);

// Create
const createUserController = new CreateUserController();
userRoutes.post('/create', createUserController.handle);

// Read
const getUserController = new GetUserController();
userRoutes.post('/findone', ensureAuthenticated , getUserController.handle);


export default userRoutes;