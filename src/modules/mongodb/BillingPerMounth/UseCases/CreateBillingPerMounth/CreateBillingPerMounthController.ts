import { Request, Response } from "express";
import { CreateBillingPerMounthUseCase } from "../../../../../useCases/BillingPerMounth/CreateBillingPerMounthUseCase";
import { MongoDBGetUserRepository } from "../../../User/UseCases/GetUser/GetUserService";
import { MongoDBOGetOneBillingPerMounthRepository } from "../GetOneBillingPerMounth/GetOneBillingPerMounthService";
import { MongoDBCreateBillingPerMounthRepository } from "./CreateBillingPerMounthService";

class CreateBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { mounthName, billing, year, userId } = request.body;

    const mongoDBGetUserRepository = new MongoDBGetUserRepository();
    const mongoDBOGetOneBillingPerMounthRepository = new MongoDBOGetOneBillingPerMounthRepository();
    const mongoDBCreateBillingPerMounthRepository = new MongoDBCreateBillingPerMounthRepository();

    const createBillingPerMounthUseCase = new CreateBillingPerMounthUseCase(
      mongoDBGetUserRepository,
      mongoDBOGetOneBillingPerMounthRepository,
      mongoDBCreateBillingPerMounthRepository
    );
  
    const newBilling = await createBillingPerMounthUseCase.execute({
      mounthName,
      billing,
      year,
      userId,
    });

    return response.status(201).json(newBilling);
  } 
}

export { CreateBillingPerMounthController }