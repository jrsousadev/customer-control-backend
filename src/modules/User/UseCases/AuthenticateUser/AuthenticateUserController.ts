import { Request, Response } from 'express';
import AuthenticateUserService from './AuthenticateUserService';

export class AuthenticateUserController {
 async handle(request: Request, response: Response): Promise<Response> {

  const {
   email,
   password,
  } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const user = await authenticateUserService.execute({
   email,
   password,
  });

  return response.json(user);
 }
}

export { AuthenticateUserService }