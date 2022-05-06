import { UsersRepository } from "../../../../UsersRepository";
import { UserModel } from "../../entities/UserModel";

interface MongoDBGetUserRepositoryRequest {
  userId: string;
  email: string;
}

class MongoDBGetUserRepository implements UsersRepository {
  async getUser({email, userId}: MongoDBGetUserRepositoryRequest) {

    if(email){
      return await UserModel.findOne({'confidential.email': email})
    } 

    if(userId) {
      return await UserModel.findOne({ _id: userId })
    }

  }
}

export { MongoDBGetUserRepository }