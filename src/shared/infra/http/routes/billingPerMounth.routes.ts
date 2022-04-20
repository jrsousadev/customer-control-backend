import { Router } from "express";
import { CreateBillingPerMounthController } from "../../../../modules/BillingPerMounth/UseCases/CreateBillingPerMounth/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../../../modules/BillingPerMounth/UseCases/GetBillingPerMounth/GetBillingPerMounthController";

const billingPerMounthRoutes = Router();

// Create
const createBillingPerMounthController = new CreateBillingPerMounthController();
billingPerMounthRoutes.post('/create', createBillingPerMounthController.handle);

// Get
const getBillingPerMounthController = new GetBillingPerMounthController();
billingPerMounthRoutes.get('/:userId', getBillingPerMounthController.handle);

export default billingPerMounthRoutes;