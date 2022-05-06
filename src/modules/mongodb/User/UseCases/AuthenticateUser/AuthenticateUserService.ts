import { UsersRepository } from "../../../../UsersRepository";
import { UserModel } from "../../entities/UserModel";

interface MongoDBGetUserAuthenticateRepositoryRequest {
  email: string;
}

export class MongoDBGetUserAuthenticateRepository implements UsersRepository {
  async getUserAuthenticate({
    email
  }: MongoDBGetUserAuthenticateRepositoryRequest) {
    return await UserModel.findOne({'confidential.email': email})
  }
 }