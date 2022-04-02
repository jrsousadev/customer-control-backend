import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
  userId: string;
  customerId: string;
}

class DeleteCustomerService {
  async execute({ 
    userId,
    customerId,
  }: IRequest){
    if(!userId || !customerId) throw new AppError('Internal server error!');
    
    const userAlreadyExist = await UserModel.findOne({_id: userId});
    if(!userAlreadyExist) throw new AppError('Internal server error!');

    const customerAlreadyExist = await CustomerModel.findOne({_id: customerId});
    if(!customerAlreadyExist) throw new AppError('Este cliente não existe!');

    await UserModel.findOneAndUpdate({
      _id: userId
    }, { $pull: {listCustomers: {customerId}}}, {new: true});

    await CustomerModel.deleteOne({
      _id: customerId,
      'contract.userResponsible': userId
    });

    return {message: 'Cliente deletado com sucesso!'};
  }
}

export { DeleteCustomerService }