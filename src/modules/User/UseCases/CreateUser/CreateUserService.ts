import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../entities/UserModel";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IRequest){
    if(!name)throw new AppError('Por favor, preencha o nome');
    if(!email)throw new AppError('Por favor, preencha o e-mail');
    if(!password)throw new AppError('Por favor, digite a senha');

    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await UserModel.findOne({ 
      'confidential.email': emailFormated
    });
    
    if (userAlreadyExist) throw new AppError('User already exist!');

    const data = {
      name, 
      password,
      confidential:{
        email: emailFormated
      }
    }

    const user = await UserModel.create(data);
    return user;
  }
}

export { CreateUserService }