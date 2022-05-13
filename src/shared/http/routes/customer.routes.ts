import { Router } from "express";
import { validate } from "express-validation";
import { CreateCustomerController } from "../../controllers/CustomerControllers/CreateCustomerController";
import { DeleteCustomerController } from "../../controllers/CustomerControllers/DeleteCustomerController";
import { GetCustomerController } from "../../controllers/CustomerControllers/GetCustomerController";
import { PaymentSucesssController } from "../../controllers/CustomerControllers/PaymentSuccessController";
import { UpdateCustomerController } from "../../controllers/CustomerControllers/UpdateCustomerController";
import { UpdateDueDateController } from "../../controllers/CustomerControllers/UpdateDueDateController";
import { CreateCustomerSchema, DeleteCustomerSchema, GetCustomerSchema, PaymentSuccessCustomerSchema, UpdateCustomerSchema, UpdateDueDateCustomerSchema } from "./schemas/customers-schemas";

const customerRoutes = Router();

//Create
const createCustomerController = new CreateCustomerController();
customerRoutes.post('/create', validate(CreateCustomerSchema), createCustomerController.handle);

//Read
const getCustomerController = new GetCustomerController();
customerRoutes.get('/findone', validate(GetCustomerSchema), getCustomerController.handle);

//Update
const updateCustomerController = new UpdateCustomerController();
customerRoutes.put('/update', validate(UpdateCustomerSchema), updateCustomerController.handle);

//Delete
const deleteCustomerController = new DeleteCustomerController();
customerRoutes.delete('/delete', validate(DeleteCustomerSchema), deleteCustomerController.handle);

//Update Due Date
const updateDueDateController = new UpdateDueDateController();
customerRoutes.patch('/update-dueDate', validate(UpdateDueDateCustomerSchema), updateDueDateController.handle);

//Payment Success
const paymentSucessController = new PaymentSucesssController();
customerRoutes.patch('/payment-success', validate(PaymentSuccessCustomerSchema), paymentSucessController.handle);

export default customerRoutes;