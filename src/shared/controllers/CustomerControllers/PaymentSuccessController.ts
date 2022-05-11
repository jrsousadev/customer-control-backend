import { Response, Request } from "express";
import { container } from "tsyringe";
import { PaymentSuccessCustomerUseCase } from "../../../useCases/Customer/PaymentSuccessCustomerUseCase";

class PaymentSucesssController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.body;
    const { id: userId } = request.user;

    const paymentSuccessCustomerUseCase = container.resolve(PaymentSuccessCustomerUseCase);

    const customer = await paymentSuccessCustomerUseCase.execute({
      userId,
      customerId
    });

    return response.status(202).json(customer)
  }
}

export { PaymentSucesssController }