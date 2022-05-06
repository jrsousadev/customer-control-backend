import { AppError } from "../../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { BillingPerMounthModel } from "../../entities/BillingPerMounthModel";

interface IRequest {
  userId: string;
}

class GetBillingPerMounthService {
  async execute({
    userId,
  }: IRequest){
    const userAlreadyExist = await UserModel.findOne({
      _id: userId
    });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const mounths = await BillingPerMounthModel.find({
      userResponsible: userId,
    });

    return mounths;
  } 
}

export { GetBillingPerMounthService }