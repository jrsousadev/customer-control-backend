import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetBillingPerMounthUseCase } from "../../../useCases/BillingPerMounth/GetBillingPerMounthUseCase";

class GetBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const getBillingPerMounthUseCase = container.resolve(GetBillingPerMounthUseCase)
  
    const mounths = await getBillingPerMounthUseCase.execute({userId});

    return response.status(200).json(mounths);
  } 
}

export { GetBillingPerMounthController }