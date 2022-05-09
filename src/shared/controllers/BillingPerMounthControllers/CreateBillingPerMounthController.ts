import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBillingPerMounthUseCase } from "../../../useCases/BillingPerMounth/CreateBillingPerMounthUseCase";

class CreateBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { mounthName, billing, year, userId } = request.body;
    
    const createBillingPerMounthUseCase = container.resolve(CreateBillingPerMounthUseCase)
  
    const newBilling = await createBillingPerMounthUseCase.execute({
      mounthName,
      billing,
      year,
      userId,
    });

    return response.status(201).json(newBilling);
  } 
}

export { CreateBillingPerMounthController }