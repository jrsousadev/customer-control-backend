import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface PaymentSuccessCustomerUseCaseRequest {
  customerId: string;
  userId: string;
}

@injectable()
export class PaymentSuccessCustomerUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  private async updateDueDate(dueDate) {
    let day = dueDate.getDate();
    let mounth = dueDate.getMonth() + 2;
    let year = dueDate.getFullYear();

    if(mounth > 12) {
      mounth = 1;
      year++
    }

    return new Date(`${year}-${mounth}-${day}`);
  }

  async execute({customerId, userId}: PaymentSuccessCustomerUseCaseRequest) {
    const userAlreadyExist = await this.usersRepository.getUser({ userId });
    if(!userAlreadyExist || null ) throw new AppError('Internal server error');

    const customerAlteradyExist = await this.customersRepository.getOneInIDAndEmail({customerId});
    if(!customerAlteradyExist || null ) throw new AppError('Internal server error');

    const getDueDate = customerAlteradyExist?.contract?.dueDate;
    const updateDate = await this.updateDueDate(getDueDate);

    customerAlteradyExist.contract.dueDate = updateDate;
    await customerAlteradyExist.save();

    return customerAlteradyExist;
  }

}