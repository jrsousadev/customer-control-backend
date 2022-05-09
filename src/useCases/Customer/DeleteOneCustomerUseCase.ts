import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface DeleteOneCustomerUseCaseRequest {
  userId: string;
  customerId: string;
}

@injectable()
export class DeleteOneCustomerUseCase { 
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ){}

  async execute({
    userId,
    customerId
  }: DeleteOneCustomerUseCaseRequest) {
    const userAlreadyExist = await this.usersRepository.getUser({userId});
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await this.customersRepository.getOneInID({customerId, userId});
    if(!customerAlreadyExist) throw new AppError('Este cliente não existe!');

    await this.usersRepository.updateListCustomers({
      customerId,
      userId,
      functionMethod: 'removeInList'
    });

    await this.customersRepository.deleteOne({customerId, userId});

    return {message: 'Cliente deletado com sucesso!'};
  }
}