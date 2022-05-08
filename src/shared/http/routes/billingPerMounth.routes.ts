import { Router } from "express";
import { CreateBillingPerMounthController } from "../../../modules/mongodb/BillingPerMounth/controllers/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../../modules/mongodb/BillingPerMounth/controllers/GetBillingPerMounthController";
import { GetOneBillingPerMounthController } from "../../../modules/mongodb/BillingPerMounth/controllers/GetOneBillingPerMounthController";

const billingPerMounthRoutes = Router();

// Create
const createBillingPerMounthController = new CreateBillingPerMounthController();
billingPerMounthRoutes.post('/create', createBillingPerMounthController.handle);

// Get
const getBillingPerMounthController = new GetBillingPerMounthController();
billingPerMounthRoutes.get('/:userId', getBillingPerMounthController.handle);

// GetOne
const getOneBillingPerMounthController = new GetOneBillingPerMounthController();
billingPerMounthRoutes.post('/getOne/:userId', getOneBillingPerMounthController.handle);

export default billingPerMounthRoutes;