import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../../useCases/Customer/CreateCustomerUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId,
      name,
      responsibleName,
      email,
      phone,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
    } = request.body;


    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(
      mongoDBUsersRepository,
      mongoDBCustomersRepository
    );
  
    await createCustomerUseCase.execute({
      userId,
      name,
      responsibleName,
      email,
      phone,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
    });

    return response.status(201).send();
  } 
}

export { CreateCustomerController }