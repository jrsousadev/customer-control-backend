import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDueDateCustomerUseCase } from "../../../useCases/Customer/UpdateDueDateCustomerUseCase";

class UpdateDueDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, dueDate } = request.body;
    const { id: userId } = request.user;

    const updateDueDateCustomerUseCase = container.resolve(UpdateDueDateCustomerUseCase);

    const customer = await updateDueDateCustomerUseCase.execute({customerId, dueDate, userId});
    
    return response.status(202).json(customer);
  } 
}

export { UpdateDueDateController }