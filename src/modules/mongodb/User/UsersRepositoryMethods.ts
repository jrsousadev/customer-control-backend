import { 
  UsersCreateData, 
  UsersGetAuthenticateData, 
  UsersGetData, 
  UsersRepository 
} from "../../../repositories/UsersRepository";

import { UserModel } from "./entities/UserModel";

export class MongoDBUsersRepository implements UsersRepository {
  async getUserAuthenticate({ email }: UsersGetAuthenticateData) {
    return await UserModel.findOne({'confidential.email': email});
  };

  async getUser({ email, userId }: UsersGetData) {
    if(email) return await UserModel.findOne({'confidential.email': email}).populate('listCustomers.customerId');
    if(userId) return await UserModel.findOne({ _id: userId }).populate('listCustomers.customerId');
  };

  async create({ email, name, password }: UsersCreateData) {
    const data = {
      name,
      password,
      confidential: {
        email
      }
    }
    await UserModel.create(data);
  };
  
}