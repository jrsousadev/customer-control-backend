import { Request, Response } from "express";
import { DeleteOneCustomerUseCase } from "../../../../useCases/Customer/DeleteOneCustomerUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId,
      customerId
    } = request.body;

    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const deleteOneCustomerUseCase = new DeleteOneCustomerUseCase(
      mongoDBUsersRepository,
      mongoDBCustomersRepository
    );
  
    await deleteOneCustomerUseCase.execute({
      userId,
      customerId,
    });

    return response.status(202).send();
  } 
}

export { DeleteCustomerController }