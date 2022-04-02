import { Request, Response } from "express";
import { CreateCustomerService } from "./CreateCustomerService";

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

    const createCustomerService = new CreateCustomerService();
  
    const customer = await createCustomerService.execute({
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

    return response.status(201).json(customer);
  } 
}

export { CreateCustomerController }