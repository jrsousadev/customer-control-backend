import { AppError } from "../../../../shared/errors/AppError";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
  customerId: string;
  userId: string;
  dueDate: Date;
}

class UpdateDueDateService {
  async execute({ userId, customerId, dueDate }: IRequest){
    if(!customerId || !dueDate) throw new AppError('Internal server error!');

    const customerAlreadyExist = await CustomerModel.findOne({
      _id: customerId,
      'contract.userResponsible': userId
    });
    if(!customerAlreadyExist) throw new AppError('Internal server error!');

    const customer = await CustomerModel.findOneAndUpdate({
      _id: customerId
    }, {'contract.dueDate': dueDate}, {new: true});

    return customer;
  }
}

export { UpdateDueDateService }