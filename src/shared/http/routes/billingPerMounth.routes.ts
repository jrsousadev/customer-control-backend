import { Router } from "express";
import { validate } from "express-validation";
import { CreateBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/CreateBillingPerMounthController";
import { GetBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/GetBillingPerMounthController";
import { GetOneBillingPerMounthController } from "../../controllers/BillingPerMounthControllers/GetOneBillingPerMounthController";
import { CreateBillingSchema, GetOneBillingSchema } from "./schemas/billingPerMounths-schemas";

const billingPerMounthRoutes = Router();

// Create
const createBillingPerMounthController = new CreateBillingPerMounthController();
billingPerMounthRoutes.post('/create', validate(CreateBillingSchema), createBillingPerMounthController.handle);

// Get
const getBillingPerMounthController = new GetBillingPerMounthController();
billingPerMounthRoutes.get('/', getBillingPerMounthController.handle);

// GetOne
const getOneBillingPerMounthController = new GetOneBillingPerMounthController();
billingPerMounthRoutes.post('/getOne',  validate(GetOneBillingSchema), getOneBillingPerMounthController.handle);

export default billingPerMounthRoutes;