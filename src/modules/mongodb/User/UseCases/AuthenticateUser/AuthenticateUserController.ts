import { Request, Response } from 'express';
import { BcryptVerifyPasswordService } from '../../../../../services/password-adapter/bcrypt/bcryptVerifyPassword';
import { JwtCreateAuthorizationToken } from '../../../../../services/token-adapter/jwt/jwtCreateAuthorizationToken';
import { AuthenticateUseCase } from '../../../../../useCases/User/AuthenticateUseCase';
import { MongoDBGetUserAuthenticateRepository } from './AuthenticateUserService';

export class AuthenticateUserController {
 async handle(request: Request, response: Response): Promise<Response> {

  const { email, password } = request.body;

  //MongoDB
  const mongoDBGetUserAuthenticateRepository = new MongoDBGetUserAuthenticateRepository();
  //Bcrypt
  const bcryptVerifyPasswordService = new BcryptVerifyPasswordService();
  //JWT
  const jwtCreateAuthorizationToken = new JwtCreateAuthorizationToken();

  const authenticateUseCase = new AuthenticateUseCase(
    mongoDBGetUserAuthenticateRepository,
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
