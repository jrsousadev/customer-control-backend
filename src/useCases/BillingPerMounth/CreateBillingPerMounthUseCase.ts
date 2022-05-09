

import { inject, injectable } from "tsyringe";
import { BillingPerMounthRepository } from "../../repositories/BillingsPerMounthsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface CreateBillingPerMounthUseCaseRequest {
  mounthName: string;
  billing: string;
  year: string;
  userId: string;
}

@injectable()
export class CreateBillingPerMounthUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("BillingsPerMounthRepository")
    private billingsPerMounthRepository: BillingPerMounthRepository,
  ) { }

  async execute(request: CreateBillingPerMounthUseCaseRequest) {
    const { mounthName, billing, year, userId } = request;

    const userAlreadyExist = await this.usersRepository.getUser({userId});

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const MounthAlteradyExist = await this.billingsPerMounthRepository.getOne({
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

    await this.billingsPerMounthRepository.create(data);
  }
}