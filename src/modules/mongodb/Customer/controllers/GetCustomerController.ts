import { Response, Request } from "express";
import { GetOneInIDAndEmailCustomerUseCase } from "../../../../useCases/Customer/GetOneInIDAndEmailCustomerUseCase";
import { MongoDBCustomersRepository } from "../CustomersRepositoryMethods";

class GetCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, email } = request.body;

    const mongoDBCustomersRepository = new MongoDBCustomersRepository();
    const getOneInIDAndEmailCustomerUseCase = new GetOneInIDAndEmailCustomerUseCase(
      mongoDBCustomersRepository
    );

    const customer = await getOneInIDAndEmailCustomerUseCase.execute({
      customerId,
      email,
    })

    return response.status(202).json(customer)
  }
}

export { GetCustomerController }