import { Response, Request } from "express";
import { container } from "tsyringe";
import { GetOneInIDAndEmailCustomerUseCase } from "../../../useCases/Customer/GetOneInIDAndEmailCustomerUseCase";

class GetCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, email } = request.body;

    const getOneInIDAndEmailCustomerUseCase = container.resolve(GetOneInIDAndEmailCustomerUseCase);

    const customer = await getOneInIDAndEmailCustomerUseCase.execute({
      customerId,
      email,
    })

    return response.status(202).json(customer)
  }
}

export { GetCustomerController }