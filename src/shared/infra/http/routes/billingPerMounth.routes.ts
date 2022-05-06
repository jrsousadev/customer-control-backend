import { Router } from "express";
import { CreateBillingPerMounthController } from "../../../../modules/mongodb/BillingPerMounth/UseCases/CreateBillingPerMounth/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../../../modules/mongodb/BillingPerMounth/UseCases/GetBillingPerMounth/GetBillingPerMounthController";

const billingPerMounthRoutes = Router();

// Create
const createBillingPerMounthController = new CreateBillingPerMounthController();
billingPerMounthRoutes.post('/create', createBillingPerMounthController.handle);

// Get
const getBillingPerMounthController = new GetBillingPerMounthController();
billingPerMounthRoutes.get('/:userId', getBillingPerMounthController.handle);

export default billingPerMounthRoutes;