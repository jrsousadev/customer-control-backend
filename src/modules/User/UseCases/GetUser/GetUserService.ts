import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest {
  userId: string;
  email: string;
}

class GetUserService{
  async execute({ userId, email }: IRequest){
    let user = null;

    if(user) email = null;
    if(email) userId = null;

    if (userId && !email) {
      const UserAlreadyExist = await UserModel.findOne({_id: userId}).populate('listCustomers.customerId');
      user = UserAlreadyExist;
    } else if (email && !userId) {
      const UserAlreadyExist = await UserModel.findOne({'contact.email': email}).populate('listCustomers.customerId');
      user = UserAlreadyExist;
    }

    if(!user) throw new AppError('User is not exist!');

    return user;
  }
}

export { GetUserService }