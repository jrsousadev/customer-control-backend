import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface CreateCustomerServiceRequest {
  userId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: string;
  paymentMethod: 'semestral' | 'bimestral' | 'trimestral';
  serviceStart: string;
}

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    email,
    name,
    phone,
    dueDate,
    paymentMethod,
    responsibleName,
    serviceStart,
    userId,
    value
  }: CreateCustomerServiceRequest) {
    if(!userId) throw new AppError('Internal server error!');

    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await this.usersRepository.getUser({ userId });
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await this.customersRepository.getOneInName({name, userId});
    if(customerAlreadyExist) throw new AppError('Já existe um cliente com este nome');

    const data = {
      name,
      responsibleName,
      userResponsible: userAlreadyExist._id,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
      email: emailFormated,
      phone,
      userId,
    }

    const customer = await this.customersRepository.create(data);

    await this.usersRepository.updateListCustomers({
      customerId: customer._id,
      userId,
      functionMethod: 'addInList'
    });
  }
}