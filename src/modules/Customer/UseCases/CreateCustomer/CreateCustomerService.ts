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
    if(!name) throw new AppError('Preencha o nome da empresa!');
    if(!responsibleName) throw new AppError('Preencha o nome do responsável!');
    if(!email) throw new AppError('Preencha o e-mail!');
    if(!phone) throw new AppError('Preencha o telefone!');
    if(!value) throw new AppError('Preencha o valor do contrato!');
    if(!dueDate) throw new AppError('Preencha o vencimento do contrato!');
    if(!paymentMethod) throw new AppError('Preencha o método de pagamento do contrato!');
    if(!serviceStart) throw new AppError('Preencha a data de inicio do contrato!');
    
    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await UserModel.findOne({ _id: userId });
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await CustomerModel.findOne({'contact.email': emailFormated});
    if(customerAlreadyExist) throw new AppError('Já existe um cliente cadastrado com este e-mail');

    const contact = {
      email: emailFormated,
      phone
    }

    const contract = {
      userResponsible: userAlreadyExist._id,
      value,
      dueDate,
      paymentMethod,
      serviceStart
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