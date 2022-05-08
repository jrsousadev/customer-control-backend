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
  dueDate: Date;
  paymentMethod: 'semestral' | 'bimestral' | 'trimestral';
  serviceStart: Date;
}

export class CreateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
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

    const customerAlreadyExist = await this.customersRepository.getOne({name: name});
    if(customerAlreadyExist) throw new AppError('Já existe um cliente com este nome');

    const contact = {
      email: emailFormated,
      phone
    }

    const contract = {
      userResponsible: userAlreadyExist._id,
      value,
      dueDate: `${dueDate}T13:00:00.000Z`,
      paymentMethod,
      serviceStart: `${serviceStart}T13:00:00.000Z`
    }

    const data = {
      name,
      responsibleName,
      contact,
      contract,
    }
  }

}