import { Request, Response } from "express";
import { UpdateDueDateCustomerUseCase } from "../../../../useCases/Customer/UpdateDueDateCustomerUseCase";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class UpdateDueDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, dueDate, userId } = request.body;

    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const updateDueDateCustomerUseCase = new UpdateDueDateCustomerUseCase(
      mongoDBCustomersRepository
    )
    const customer = await updateDueDateCustomerUseCase.execute({customerId, dueDate, userId});
    
    return response.status(202).json(customer);
  } 
}

export { UpdateDueDateController }