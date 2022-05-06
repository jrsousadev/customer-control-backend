
import { BillingPerMounthRepository } from "../../modules/BillingsPerMounthsRepository";
import { UsersRepository } from "../../modules/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetBillingPerMounthUseCaseRequest {
  userId: string;
}

export class GetBillingPerMounthUseCase {
  constructor(
    private usersRepositoryGetUser: UsersRepository,
    private billingPerMounthRepositoryGetBilling: BillingPerMounthRepository,
  ) {}

  async execute(request: GetBillingPerMounthUseCaseRequest) {
    let { userId } = request;

    const userAlreadyExist = await this.usersRepositoryGetUser.getUser({ userId });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const mounths = await this.billingPerMounthRepositoryGetBilling.getAllBillingPerMounth({
      userId
    });

    return mounths;
  }
}