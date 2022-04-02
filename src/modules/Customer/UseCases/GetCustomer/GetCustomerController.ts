import { Response, Request } from "express";
import { GetCustomerService } from "./GetCustomerService";

class GetCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, email } = request.body;

    const getCustomerService = new GetCustomerService();

    const customer = await getCustomerService.execute({
      customerId,
      email,
    })

    return response.status(202).json(customer)
  }
}

export { GetCustomerController }