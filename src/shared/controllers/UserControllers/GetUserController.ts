import { Response, Request } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "../../../useCases/User/GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const { id } = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase)

    const user = await getUserUseCase.execute({
      userId: id,
      email,
    });

    return response.status(202).json(user)
  }
}

export { GetUserController }