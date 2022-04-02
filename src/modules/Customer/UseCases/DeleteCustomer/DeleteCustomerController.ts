import { Request, Response } from "express";
import { DeleteCustomerService } from "./DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      userId,
      customerId
    } = request.body;

    const deleteCustomerService = new DeleteCustomerService();
  
    const res = await deleteCustomerService.execute({
      userId,
      customerId,
    });

    return response.status(202).json(res);
  } 
}

export { DeleteCustomerController }