import { Request, Response } from "express";
import { GetOneBillingPerMounthUseCase } from "../../../../useCases/BillingPerMounth/GetOneBillingPerMounthUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBBillingPerMounthRepository } from "../BillingPerMounthRepositoryMethods";

export class GetOneBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { mounthName, year } = request.body;

    const mongoDBBillingPerMounthRepository = new MongoDBBillingPerMounthRepository();
    const mongoDBUsersRepository = new MongoDBUsersRepository();

    const getOneBillingPerMounthUseCase = new GetOneBillingPerMounthUseCase(
      mongoDBUsersRepository,
      mongoDBBillingPerMounthRepository
    )
  
    const mounth = await getOneBillingPerMounthUseCase.execute({
      userId,
      mounthName,
      year
    });

    return response.status(200).json(mounth);
  } 
}