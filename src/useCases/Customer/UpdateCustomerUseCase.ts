import { CustomersRepository } from "../../repositories/CustomersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface UpdateCustomerUseCaseRequest {
  userId: string;
  customerId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: string;
  paymentMethod: string;
  serviceStart: string;
}

export class UpdateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    userId,
    customerId,
    name,
    responsibleName,
    email,
    phone,
    value,
    dueDate,
    paymentMethod,
    serviceStart,
  }: UpdateCustomerUseCaseRequest) {
    let emailFormated: string;
    if(email) {emailFormated = email.toLocaleLowerCase();}

    if(!userId || !customerId) throw new AppError('Internal server error!');

    const userAlreadyExist = await this.usersRepository.getUser({userId})
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await this.customersRepository.getOneInID({customerId, userId});
    if(!customerAlreadyExist) throw new AppError('Internal server error!');

    if(email){
      const customerEmailExist = userAlreadyExist.listCustomers.filter(
        (customer: any) => customer.customerId.contact.email === emailFormated
      );
      if(customerEmailExist.length >= 1) throw new AppError('Já existe um cliente com este e-mail'); 
    }

    const customer = await this.customersRepository.update({
      customerId,
      name,
      responsibleName,
      email,
      phone,
      value,
      dueDate,
      paymentMethod,
      serviceStart,
    })

    return customer;
  }
}