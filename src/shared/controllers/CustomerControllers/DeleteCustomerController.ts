import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteOneCustomerUseCase } from "../../../useCases/Customer/DeleteOneCustomerUseCase";

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      customerId
    } = request.body;
    const { id: userId } = request.user;

    const deleteOneCustomerUseCase = container.resolve(DeleteOneCustomerUseCase)
  
    await deleteOneCustomerUseCase.execute({
      userId,
      customerId,
    });

    return response.status(202).send();
  } 
}

export { DeleteCustomerController }