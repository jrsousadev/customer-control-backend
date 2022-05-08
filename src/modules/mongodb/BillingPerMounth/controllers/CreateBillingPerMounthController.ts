import { Request, Response } from "express";
import { CreateBillingPerMounthUseCase } from "../../../../useCases/BillingPerMounth/CreateBillingPerMounthUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBBillingPerMounthRepository } from "../BillingPerMounthRepositoryMethods";

class CreateBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { mounthName, billing, year, userId } = request.body;

    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const mongoDBBillingPerMounthRepository = new MongoDBBillingPerMounthRepository();

    const createBillingPerMounthUseCase = new CreateBillingPerMounthUseCase(
      mongoDBUsersRepository,
      mongoDBBillingPerMounthRepository,
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