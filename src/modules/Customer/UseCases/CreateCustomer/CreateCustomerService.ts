import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
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

class CreateCustomerService {
  async execute({ 
    userId,
    name,
    responsibleName,
    email,
    phone,
    value,
    dueDate,
    paymentMethod,
    serviceStart  
  }: IRequest){
    if(!userId) throw new AppError('Internal server error!');
    
    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await UserModel.findOne({ _id: userId });
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await CustomerModel.findOne({'contact.email': emailFormated});
    if(customerAlreadyExist) throw new AppError('Já existe um cliente cadastrado com este e-mail');

    const contact = {
      email: emailFormated,
      phone
    }

    console.log('oi')

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

    const customer = await CustomerModel.create(data);

    await UserModel.findOneAndUpdate({
      _id: userId
    }, { $push: {listCustomers: {
      customerId: customer._id
    }}}, {new: true});

    return customer;
  }
}

export { CreateCustomerService }