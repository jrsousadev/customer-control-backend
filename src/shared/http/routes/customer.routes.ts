import { Router } from "express";
import { CreateCustomerController } from "../../controllers/CustomerControllers/CreateCustomerController";
import { DeleteCustomerController } from "../../controllers/CustomerControllers/DeleteCustomerController";
import { GetCustomerController } from "../../controllers/CustomerControllers/GetCustomerController";
import { PaymentSucesssController } from "../../controllers/CustomerControllers/PaymentSuccessController";
import { UpdateCustomerController } from "../../controllers/CustomerControllers/UpdateCustomerController";
import { UpdateDueDateController } from "../../controllers/CustomerControllers/UpdateDueDateController";

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