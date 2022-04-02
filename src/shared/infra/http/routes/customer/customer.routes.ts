import { Router } from "express";
import { CreateCustomerController } from "../../../../../modules/Customer/UseCases/CreateCustomer/CreateCustomerController";
import { DeleteCustomerController } from "../../../../../modules/Customer/UseCases/DeleteCustomer/DeleteCustomerController";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
customerRoutes.post('/create', createCustomerController.handle);

const deleteCustomerController = new DeleteCustomerController();
customerRoutes.delete('/delete', deleteCustomerController.handle);

export default customerRoutes;