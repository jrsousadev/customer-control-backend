import { Request, Response } from "express";
import { GetOneBillingPerMounthUseCase } from "../../../../../useCases/BillingPerMounth/GetOneBillingPerMounthUseCase";
import { MongoDBGetUserRepository } from "../../../User/UseCases/GetUser/GetUserService";
import { MongoDBOGetOneBillingPerMounthRepository } from "./GetOneBillingPerMounthService";

export class GetOneBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { mounthName, year } = request.body;

    const mongoDBGetOneBillingPerMounthRepository = new MongoDBOGetOneBillingPerMounthRepository();
    const mongoDBGetUserRepository = new MongoDBGetUserRepository();

    const getOneBillingPerMounthUseCase = new GetOneBillingPerMounthUseCase(
      mongoDBGetUserRepository,
      mongoDBGetOneBillingPerMounthRepository
    )
  
    const mounth = await getOneBillingPerMounthUseCase.execute({
      userId,
      mounthName,
      year
    });

    return response.status(200).json(mounth);
  } 
}