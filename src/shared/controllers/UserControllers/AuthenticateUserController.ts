import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUseCase } from '../../../useCases/User/AuthenticateUseCase';

export class AuthenticateUserController {
 async handle(request: Request, response: Response): Promise<Response> {

  const { email, password } = request.body;

  const authenticateUseCase = container.resolve(AuthenticateUseCase)

  const user = await authenticateUseCase.execute({
   email,
   password,
  });

  return response.json(user);
 }
}
