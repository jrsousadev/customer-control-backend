import { Request, Response } from "express";
import { UpdateDueDateService } from "./UpdateDueDateService";

class UpdateDueDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, dueDate, userId } = request.body;

    const updateDueDateService = new UpdateDueDateService();
    const customer = await updateDueDateService.execute({customerId, dueDate, userId});
    
    return response.status(202).json(customer);
  } 
}

export { UpdateDueDateController }