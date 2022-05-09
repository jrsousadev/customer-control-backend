import { Router } from "express";
import { CreateBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/GetBillingPerMounthController";
import { GetOneBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/GetOneBillingPerMounthController";

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