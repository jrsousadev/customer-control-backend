import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "../../../../useCases/Customer/UpdateCustomerUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId,
      customerId,
      name,
      responsibleName,
      email,
      phone,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
    } = request.body;

    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(
      mongoDBUsersRepository,
      mongoDBCustomersRepository
    );
  
    const customer = await updateCustomerUseCase.execute({
      userId,
      customerId,
      name,
      responsibleName,
      email,
      phone,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
    });

    return response.status(202).json(customer);
  } 
}

export { UpdateCustomerController }