import { Response, Request } from "express";
import { PaymentSuccessService } from "./PaymentSuccessService";

class PaymentSucesssController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, customerId } = request.body;

    const paymentSuccessService = new PaymentSuccessService();

    const customer = await paymentSuccessService.execute({
      userId,
      customerId
    });

    return response.status(202).json(customer)
  }
}

export { PaymentSucesssController }