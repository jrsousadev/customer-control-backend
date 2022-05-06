import { Router } from "express";
import { CreateBillingPerMounthController } from "../../../../modules/mongodb/BillingPerMounth/UseCases/CreateBillingPerMounth/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../../../modules/mongodb/BillingPerMounth/UseCases/GetBillingPerMounth/GetBillingPerMounthController";
import { GetOneBillingPerMounthController } from "../../../../modules/mongodb/BillingPerMounth/UseCases/GetOneBillingPerMounth/GetOneBillingPerMounthController";

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