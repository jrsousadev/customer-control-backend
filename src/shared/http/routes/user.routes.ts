import { Router } from "express";
import { AuthenticateUserController } from "../../controllers/UserControllers/AuthenticateUserController";
import { CreateUserController } from "../../controllers/UserControllers/CreateUserController";
import { GetUserController } from "../../controllers/UserControllers/GetUserController";
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
userRoutes.get('/findone', ensureAuthenticated , getUserController.handle);


export default userRoutes;