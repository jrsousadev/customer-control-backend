import { Request, Response } from "express";
import { GetBillingPerMounthUseCase } from "../../../../useCases/BillingPerMounth/GetBillingPerMounthUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBBillingPerMounthRepository } from "../BillingPerMounthRepositoryMethods";

class GetBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const mongoDBBillingPerMounthRepository = new MongoDBBillingPerMounthRepository();

    const getBillingPerMounthUseCase = new GetBillingPerMounthUseCase(
      mongoDBUsersRepository,
      mongoDBBillingPerMounthRepository
    )
  
    const mounths = await getBillingPerMounthUseCase.execute({userId});

    return response.status(200).json(mounths);
  } 
}

export { GetBillingPerMounthController }