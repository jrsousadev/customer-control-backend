import moment from "moment";
import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { CustomerModel } from "../../entities/CustomerModel";

interface IRequest {
  customerId: string;
  userId: string;
}

class PaymentSuccessService {

  private async updateDueDate(dueDate) {
    let day = dueDate.getDate();
    let mounth = dueDate.getMonth() + 2;
    let year = dueDate.getFullYear();

    if(mounth > 12) {
      mounth = 1;
      year++
    }

    return new Date(`${year}-${mounth}-${day}`);
  }

  async execute({ userId, customerId }: IRequest){

    const userAlreadyExist = await UserModel.findOne({ _id: userId });
    if(!userAlreadyExist || null ) throw new AppError('Internal server error');

    const customerAlteradyExist = await CustomerModel.findOne({_id: customerId });
    if(!customerAlteradyExist || null ) throw new AppError('Internal server error');

    const getDueDate = customerAlteradyExist?.contract?.dueDate;
    const updateDate = await this.updateDueDate(getDueDate);

    customerAlteradyExist.contract.dueDate = updateDate;
    await customerAlteradyExist.save();

    return customerAlteradyExist;
  }
}

export { PaymentSuccessService }