import { Router } from "express";
import { CreateCustomerController } from "../../../modules/mongodb/Customer/UseCases/CreateCustomer/CreateCustomerController";
import { DeleteCustomerController } from "../../../modules/mongodb/Customer/UseCases/DeleteCustomer/DeleteCustomerController";
import { GetCustomerController } from "../../../modules/mongodb/Customer/UseCases/GetCustomer/GetCustomerController";
import { PaymentSucesssController } from "../../../modules/mongodb/Customer/UseCases/PaymentSuccess/PaymentSuccessController";
import { UpdateCustomerController } from "../../../modules/mongodb/Customer/UseCases/UpdateCustomer/UpdateCustomerController";
import { UpdateDueDateController } from "../../../modules/mongodb/Customer/UseCases/UpdateDueDate/UpdateDueDateController";

const customerRoutes = Router();

//Create
const createCustomerController = new CreateCustomerController();
customerRoutes.post('/create', createCustomerController.handle);

//Read
const getCustomerController = new GetCustomerController();
customerRoutes.post('/findone', getCustomerController.handle);

//Update
const updateCustomerController = new UpdateCustomerController();
customerRoutes.post('/update', updateCustomerController.handle);

//Delete
const deleteCustomerController = new DeleteCustomerController();
customerRoutes.delete('/delete', deleteCustomerController.handle);

//Update Due Date
const updateDueDateController = new UpdateDueDateController();
customerRoutes.post('/update-dueDate', updateDueDateController.handle);

//Payment Success
const paymentSucessController = new PaymentSucesssController();
customerRoutes.post('/payment-success', paymentSucessController.handle);

export default customerRoutes;