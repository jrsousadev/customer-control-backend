import { Router } from "express";
import { CreateCustomerController } from "../../../../../modules/Customer/UseCases/CreateCustomer/CreateCustomerController";
import { DeleteCustomerController } from "../../../../../modules/Customer/UseCases/DeleteCustomer/DeleteCustomerController";
import { UpdateCustomerController } from "../../../../../modules/Customer/UseCases/UpdateCustomer/UpdateCustomerController";

const customerRoutes = Router();

//Create
const createCustomerController = new CreateCustomerController();
customerRoutes.post('/create', createCustomerController.handle);

//Delete
const deleteCustomerController = new DeleteCustomerController();
customerRoutes.delete('/delete', deleteCustomerController.handle);

//Update
const updateCustomerController = new UpdateCustomerController();
customerRoutes.post('/update', updateCustomerController.handle);

export default customerRoutes;