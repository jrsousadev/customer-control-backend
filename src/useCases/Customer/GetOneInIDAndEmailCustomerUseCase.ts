import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetOneInIDAndEmailCustomerUseCaseRequest {
  customerId: string;
  email: string;
}

@injectable()
export class GetOneInIDAndEmailCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ) {}

  async execute({ customerId, email }: GetOneInIDAndEmailCustomerUseCaseRequest) {
    let customer = null;
    
    if(customerId) email = null;
    if(email) customerId = null;

    if (customerId && !email) {
      const customerAlreadyExist = await this.customersRepository.getOneInIDAndEmail({customerId});;
      customer = customerAlreadyExist;
    } else if (email && !customerId) {
      const customerAlreadyExist = await this.customersRepository.getOneInIDAndEmail({email});
      customer = customerAlreadyExist;
    }

    if(!customer) throw new AppError('Customer is not exist!');

    return customer
  }
}