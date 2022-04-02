import { Router } from "express";
import { CreateCustomerController } from "../../../../../modules/Customer/UseCases/CreateCustomer/CreateCustomerController";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
customerRoutes.post('/create', createCustomerController.handle);


export default customerRoutes;