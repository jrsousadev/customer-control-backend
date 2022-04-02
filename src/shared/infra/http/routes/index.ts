import { Router } from "express";

//Import Routes
import userRoutes from "./user/user.routes";
import customerRoutes from "./customer/customer.routes";

const routes = Router();

// Routes 
routes.use('/user', userRoutes);
routes.use('/customer', customerRoutes);

export default routes;