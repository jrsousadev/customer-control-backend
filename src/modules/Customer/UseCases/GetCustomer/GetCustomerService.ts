import { AppError } from "../../../../shared/errors/AppError";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
  customerId: string;
  email: string;
}

class GetCustomerService{
  async execute({ customerId, email }: IRequest){
    let customer = null;
    
    if(customerId) email = null;
    if(email) customerId = null;

    if (customerId && !email) {
      const customerAlreadyExist = await CustomerModel.findOne({_id: customerId}).sort({ 'contract.dueDate': -1 });
      customer = customerAlreadyExist;
    } else if (email && !customerId) {
      const customerAlreadyExist = await CustomerModel.findOne({'contact.email': email}).sort({ 'contract.dueDate': -1 });
      customer = customerAlreadyExist;
    }

    if(!customer) throw new AppError('Customer is not exist!');

    return customer
  }
}

export { GetCustomerService }