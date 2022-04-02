import { compare } from 'bcrypt';
import { AppError } from '../../../../shared/errors/AppError';
import { createUserAuthorizationToken } from '../../../../shared/utils/authToken';
import { UserModel } from '../../entities/UserModel';

interface IRequest {
 email: string;
 password: string;
}

class AuthenticateCongressmanService {
 public async execute({ email, password }: IRequest) {

  let user = null;

  if (email) {
   const emailFormated = email.toLocaleLowerCase();
   user = await UserModel.findOne({ 'confidential.email': emailFormated });
  } else {
   throw new AppError("E-mail não enviado!", 401);
  }

  if (user === null) {
   throw new AppError("E-mail ou senha podem estar incorretos!!", 401);
  }

  if (!password && !user?.password) {
   throw new AppError("E-mail ou senha podem estar incorretos!!", 401);
  }

  const validatePassword = await compare(
    password.toString(),
    user.password.toString(),
  );

   if (!validatePassword) {
    throw new AppError("E-mail ou senha podem estar incorretos!!", 401);
   }

   const userToReturn = user.toObject();
   delete userToReturn.password

   const token = await createUserAuthorizationToken({ _id: user._id });

   return {
    isAuthorized: true,
    authorization: `Bearer ${token}`,
    ...userToReturn,
   };
  }
}

export default AuthenticateCongressmanService;
