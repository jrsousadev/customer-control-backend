import { Response, Request } from "express";
import { GetUserUseCase } from "../../../../useCases/User/GetUserUseCase";
import { MongoDBUsersRepository } from "../UsersRepositoryMethods";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, email } = request.body;

    const mongoDBUsersRepository = new MongoDBUsersRepository();

    const getUserUseCase = new GetUserUseCase(
      mongoDBUsersRepository
    );

    const user = await getUserUseCase.execute({
      userId,
      email,
    })

    return response.status(202).json(user)
  }
}

export { GetUserController }