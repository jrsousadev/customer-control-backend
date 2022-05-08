import { Response, Request } from "express";
import { PaymentSuccessCustomerUseCase } from "../../../../useCases/Customer/PaymentSuccessCustomerUseCase";
import { MongoDBUsersRepository } from "../../User/UsersRepositoryMethods";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class PaymentSucesssController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, customerId } = request.body;

    const mongoDBUsersRepository = new MongoDBUsersRepository();
    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const paymentSuccessCustomerUseCase = new PaymentSuccessCustomerUseCase(
      mongoDBUsersRepository,
      mongoDBCustomersRepository
    );

    const customer = await paymentSuccessCustomerUseCase.execute({
      userId,
      customerId
    });

    return response.status(202).json(customer)
  }
}

export { PaymentSucesssController }