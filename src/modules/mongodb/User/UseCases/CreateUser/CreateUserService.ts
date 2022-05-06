import { AppError } from "../../../../../shared/errors/AppError";
import { UsersRepository } from "../../../../UsersRepository";
import { UserModel } from "../../entities/UserModel";

interface MongoDBCreateUserRepositoryRequest {
  name: string;
  email: string;
  password: string;
}

export class MongoDBCreateUserRepository implements UsersRepository {
  async create({ 
    name, email, password 
  }: MongoDBCreateUserRepositoryRequest){
    const data = {
      name,
      password,
      confidential: {
        email
      }
    }

    await UserModel.create(data);
  }
}
