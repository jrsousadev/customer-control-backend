import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../../useCases/User/CreateUserUseCase";
import { MongoDBUsersRepository } from "../UsersRepositoryMethods";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      name,
      email,
      password,
    } = request.body;


    const mongoDBUsersRepository = new MongoDBUsersRepository();

    const createUserUseCase = new CreateUserUseCase(
      mongoDBUsersRepository
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