import { CustomersRepository } from "../../repositories/CustomersRepository";

interface GetOneInIDCustomerUseCaseRequest {
  customerId: string;
  userId: string;
}

export class GetOneInIDCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ customerId, userId }: GetOneInIDCustomerUseCaseRequest) {
    return this.customersRepository.getOneInID({
      customerId, userId
    });
  }
}