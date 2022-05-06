import { BillingPerMounthRepository } from "../../modules/BillingsPerMounthsRepository";
import { UsersRepository } from "../../modules/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetOneBillingPerMounthUseCaseRequest {
  userId: string;
  mounthName: string;
  year: string;
}

export class GetOneBillingPerMounthUseCase {
  constructor(
    private usersRepositoryGetUser: UsersRepository,
    private billingPerMounthRepositoryGetOneBilling: BillingPerMounthRepository,
  ) {}

  async execute(request: GetOneBillingPerMounthUseCaseRequest) {
    const { userId, mounthName, year } = request;

    const userAlreadyExist = await this.usersRepositoryGetUser.getUser({ userId });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const mounth = await this.billingPerMounthRepositoryGetOneBilling.getOneBillingPerMounth({
      userId,
      mounthName,
      year
    });

    if(!mounth) throw new AppError("Internal server error!");

    return mounth;
  }
}