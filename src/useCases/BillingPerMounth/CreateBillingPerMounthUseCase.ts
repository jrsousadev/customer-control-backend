
import { BillingPerMounthRepository } from "../../modules/BillingsPerMounthsRepository";
import { UsersRepository } from "../../modules/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface CreateBillingPerMounthUseCaseRequest {
  mounthName: string;
  billing: string;
  year: string;
  userId: string;
}

export class CreateBillingPerMounthUseCase {
  constructor(
    private usersRepositoryGetUser: UsersRepository,
    private billingsPerMounthRepositoryGetBilling: BillingPerMounthRepository,
    private billingsPerMounthRepositoryCreateBilling: BillingPerMounthRepository,
  ) { }

  async execute(request: CreateBillingPerMounthUseCaseRequest) {
    const { mounthName, billing, year, userId } = request;

    const userAlreadyExist = await this.usersRepositoryGetUser.getUser({userId});

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const MounthAlteradyExist = await this.billingsPerMounthRepositoryGetBilling.getOneBillingPerMounth({
      userId,
      mounthName,
      year,
    })

    if(MounthAlteradyExist) throw new AppError('Mês já criado, verifique o ano!');

    const data = {
      userId,
      mounthName: mounthName.toLocaleLowerCase(),
      billing,
      year,
    }

    await this.billingsPerMounthRepositoryCreateBilling.create(data);
  }
}