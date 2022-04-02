import { Router } from "express";

//Import Routes
import userRoutes from "./user/user.routes";
import customerRoutes from "./customer/customer.routes";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();

// Routes 
routes.use('/user', userRoutes);
routes.use(ensureAuthenticated);
routes.use('/customer', customerRoutes);

export default routes;