import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../../../useCases/User/CreateUserUseCase";
import { MongoDBGetUserRepository } from "../GetUser/GetUserService";
import { MongoDBCreateUserRepository } from "./CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      name,
      email,
      password,
    } = request.body;


    const mongoDBGetUserRepository = new MongoDBGetUserRepository();
    const mongoDBCreateUserRepository = new MongoDBCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
      mongoDBGetUserRepository,
      mongoDBCreateUserRepository
    );
  
    const user = await createUserUseCase.execute({
      name,
      email,
      password
    });

    return response.status(201).json(user);
  } 
}

export { CreateUserController }