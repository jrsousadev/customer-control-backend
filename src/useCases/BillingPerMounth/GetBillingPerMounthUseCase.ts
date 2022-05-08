

import { BillingPerMounthRepository } from "../../repositories/BillingsPerMounthsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetBillingPerMounthUseCaseRequest {
  userId: string;
}

export class GetBillingPerMounthUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private billingPerMounthRepository: BillingPerMounthRepository,
  ) {}

  async execute(request: GetBillingPerMounthUseCaseRequest) {
    let { userId } = request;

    const userAlreadyExist = await this.usersRepository.getUser({ userId });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const mounths = await this.billingPerMounthRepository.getAll({
      userId
    });

    return mounths;
  }
}