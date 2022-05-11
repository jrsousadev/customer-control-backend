import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "../../../useCases/Customer/CreateCustomerUseCase";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
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

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase)
  
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