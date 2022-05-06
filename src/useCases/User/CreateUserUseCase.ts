
import { UsersRepository } from "../../modules/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface CreateUserUseCaseRequest {
  email: string;
  name: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepositoryGetUser: UsersRepository,
    private usersRepositoryCreateUser: UsersRepository,
  ) { }

  async execute(request: CreateUserUseCaseRequest) {
    let { name, email, password } = request;

    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await this.usersRepositoryGetUser.getUser({email: emailFormated});

    if (userAlreadyExist) throw new AppError('User already exist!');

    const data = {
      name, 
      password,
      email: emailFormated
    }

    await this.usersRepositoryCreateUser.create(data);
  }
}