import { Router } from "express";

//Import Routes
import userRoutes from "./user.routes";
import customerRoutes from "./customer.routes";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import billingPerMounthRoutes from "./billingPerMounth.routes";

const routes = Router();

// Routes 
routes.use('/user', userRoutes);
routes.use(ensureAuthenticated);
routes.use('/customer', customerRoutes);
routes.use('/mounth', billingPerMounthRoutes);

export default routes;