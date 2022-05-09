import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";

interface GetOneInIDCustomerUseCaseRequest {
  customerId: string;
  userId: string;
}

@injectable()
export class GetOneInIDCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ customerId, userId }: GetOneInIDCustomerUseCaseRequest) {
    return this.customersRepository.getOneInID({
      customerId, userId
    });
  }
}