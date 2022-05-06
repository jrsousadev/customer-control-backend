import { UsersRepository } from "../../../../UsersRepository";
import { UserModel } from "../../entities/UserModel";

interface MongoDBGetUserRepositoryRequest {
  userId: string;
  email: string;
}

class MongoDBGetUserRepository implements UsersRepository {
  async getUser({email, userId}: MongoDBGetUserRepositoryRequest) {

    if(email){
      return await UserModel.findOne({'confidential.email': email}).populate('listCustomers.customerId');
    } 

    if(userId) {
      return await UserModel.findOne({ _id: userId }).populate('listCustomers.customerId');
    }

  }
}

export { MongoDBGetUserRepository }