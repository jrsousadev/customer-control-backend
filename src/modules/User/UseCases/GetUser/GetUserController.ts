import { Response, Request } from "express";
import { GetUserService } from "./GetUserService";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, email } = request.body;

    const getUserService = new GetUserService();

    const user = await getUserService.execute({
      userId,
      email,
    })

    return response.status(202).json(user)
  }
}

export { GetUserController }