import { Request, Response } from "express";
import { CreateBillingPerMounthService } from "./CreateBillingPerMounthService";

class CreateBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { mounthName, billing, year, userId } = request.body;

    const createBillingPerMounthService = new CreateBillingPerMounthService();
  
    const newBilling = await createBillingPerMounthService.execute({
      mounthName,
      billing,
      year,
      userId,
    });

    return response.status(201).json(newBilling);
  } 
}

export { CreateBillingPerMounthController }