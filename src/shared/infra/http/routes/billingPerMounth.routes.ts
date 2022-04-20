import { Router } from "express";
import { CreateBillingPerMounthController } from "../../../../modules/BillingPerMounth/UseCases/CreateBillingPerMounth/CreateBillingPerMounthController";

const billingPerMounthRoutes = Router();

// Create
const createBillingPerMounthController = new CreateBillingPerMounthController();
billingPerMounthRoutes.post('/create', createBillingPerMounthController.handle);


export default billingPerMounthRoutes;