import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
  userId: string;
  customerId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: Date;
  paymentMethod: string;
  serviceStart: Date;
}

class UpdateCustomerService {
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
  }: IRequest){
    let emailFormated: string;
    if(email) {emailFormated = email.toLocaleLowerCase();}

    if(!userId || !customerId) throw new AppError('Internal server error!');

    const userAlreadyExist = await UserModel.findOne({_id: userId})
    .populate({
      path: 'listCustomers.customerId',
      select: ['contact.email']
    });
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await CustomerModel.findOne({
      _id: customerId,
      'contract.userResponsible': userId
    });
    if(!customerAlreadyExist) throw new AppError('Internal server error!');

    if(email){
      const customerEmailExist = userAlreadyExist.listCustomers.filter((customer: any) => customer.customerId.contact.email === emailFormated);
      if(customerEmailExist.length >= 1) throw new AppError('Já existe um cliente com este e-mail'); 
    }

    const customer = await CustomerModel.findOneAndUpdate({
      _id: customerId
    }, {
      name,
      responsibleName,
      'contact.email': emailFormated,
      'contact.phone': phone,
      'contract.value': value,
      'contract.dueDate': dueDate,
      'contract.paymentMethod': paymentMethod,
      'contract.serviceStart': serviceStart
    }, {new: true});

    return customer;
  }
}

export { UpdateCustomerService }