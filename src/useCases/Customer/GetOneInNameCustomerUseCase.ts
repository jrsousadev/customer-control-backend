import { CustomersRepository } from "../../repositories/CustomersRepository";

interface GetOneCustomerUseCaseRequest {
  name: string;
  userId: string;
}

export class GetOneCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ name, userId }: GetOneCustomerUseCaseRequest) {
    return this.customersRepository.getOneInName({
      name, userId
    });
  }
}