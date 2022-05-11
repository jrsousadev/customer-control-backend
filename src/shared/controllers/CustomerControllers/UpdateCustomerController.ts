import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCustomerUseCase } from "../../../useCases/Customer/UpdateCustomerUseCase";

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
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
    const { id: userId } = request.user;

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase)
  
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