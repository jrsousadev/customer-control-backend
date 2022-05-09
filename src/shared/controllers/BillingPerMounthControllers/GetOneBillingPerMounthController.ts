import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetOneBillingPerMounthUseCase } from "../../../useCases/BillingPerMounth/GetOneBillingPerMounthUseCase";

export class GetOneBillingPerMounthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { mounthName, year } = request.body;

    const getOneBillingPerMounthUseCase = container.resolve(GetOneBillingPerMounthUseCase)
  
    const mounth = await getOneBillingPerMounthUseCase.execute({
      userId,
      mounthName,
      year
    });

    return response.status(200).json(mounth);
  } 
}