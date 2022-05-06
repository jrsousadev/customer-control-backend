import { Response, Request } from "express";
import { GetUserUseCase } from "../../../../../useCases/User/GetUserUseCase";
import { MongoDBGetUserRepository } from "./GetUserService";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, email } = request.body;

    const mongoDBGetUserRepository = new MongoDBGetUserRepository();

    const getUserUseCase = new GetUserUseCase(
      mongoDBGetUserRepository
    );

    const user = await getUserUseCase.execute({
      userId,
      email,
    })

    return response.status(202).json(user)
  }
}

export { GetUserController }