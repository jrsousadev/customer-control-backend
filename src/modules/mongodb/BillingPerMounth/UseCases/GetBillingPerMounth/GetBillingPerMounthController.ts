import { Request, Response } from "express";
import { GetBillingPerMounthService } from "./GetBillingPerMounthService";

class GetBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const getBillingPerMounthService = new GetBillingPerMounthService();
  
    const mounths = await getBillingPerMounthService.execute({userId});

    return response.status(201).json(mounths);
  } 
}

export { GetBillingPerMounthController }