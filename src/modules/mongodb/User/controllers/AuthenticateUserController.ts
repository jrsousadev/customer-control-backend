import { Request, Response } from 'express';
import { BcryptVerifyPasswordService } from '../../../../services/password-adapter/bcrypt/bcryptVerifyPassword';
import { JwtCreateAuthorizationToken } from '../../../../services/token-adapter/jwt/jwtCreateAuthorizationToken';
import { AuthenticateUseCase } from '../../../../useCases/User/AuthenticateUseCase';
import { MongoDBUsersRepository } from '../UsersRepositoryMethods';

export class AuthenticateUserController {
 async handle(request: Request, response: Response): Promise<Response> {

  const { email, password } = request.body;

  const mongoDBUsersRepository = new MongoDBUsersRepository();
  const bcryptVerifyPasswordService = new BcryptVerifyPasswordService();
  const jwtCreateAuthorizationToken = new JwtCreateAuthorizationToken();

  const authenticateUseCase = new AuthenticateUseCase(
    mongoDBUsersRepository,
    bcryptVerifyPasswordService,
    jwtCreateAuthorizationToken
  );

  const user = await authenticateUseCase.execute({
   email,
   password,
  });

  return response.json(user);
 }
}
