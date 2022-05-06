import { Request, Response } from "express";
import { UpdateCustomerService } from "./UpdateCustomerService";

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

    const updateCustomerService = new UpdateCustomerService();
  
    const customer = await updateCustomerService.execute({
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