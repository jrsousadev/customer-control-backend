import { Response, Request } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "../../../useCases/User/GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, email } = request.body;

    const getUserUseCase = container.resolve(GetUserUseCase)

    const user = await getUserUseCase.execute({
      userId,
      email,
    })

    return response.status(202).json(user)
  }
}

export { GetUserController }