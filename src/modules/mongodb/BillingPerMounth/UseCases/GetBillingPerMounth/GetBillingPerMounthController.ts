import { Request, Response } from "express";
import { GetBillingPerMounthUseCase } from "../../../../../useCases/BillingPerMounth/GetBillingPerMounthUseCase";
import { MongoDBGetUserRepository } from "../../../User/UseCases/GetUser/GetUserService";
import { MongoDBGetBillingPerMounthRepository } from "./GetBillingPerMounthService";

class GetBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const mongoDBGetBillingPerMounthRepository = new MongoDBGetBillingPerMounthRepository();
    const mongoDBGetUserRepository = new MongoDBGetUserRepository();

    const getBillingPerMounthUseCase = new GetBillingPerMounthUseCase(
      mongoDBGetUserRepository,
      mongoDBGetBillingPerMounthRepository
    )
  
    const mounths = await getBillingPerMounthUseCase.execute({userId});

    return response.status(200).json(mounths);
  } 
}

export { GetBillingPerMounthController }