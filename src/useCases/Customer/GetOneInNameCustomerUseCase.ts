import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";

interface GetOneInNameCustomerUseCaseRequest {
  name: string;
  userId: string;
}

@injectable()
export class GetOneInNameCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ name, userId }: GetOneInNameCustomerUseCaseRequest) {
    return this.customersRepository.getOneInName({
      name, userId
    });
  }
}