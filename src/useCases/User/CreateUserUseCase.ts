import { UsersRepository } from "../../repositories/UsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/errors/AppError";

interface CreateUserUseCaseRequest {
  email: string;
  name: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateUserUseCaseRequest) {
    let { name, email, password } = request;

    const emailFormated = email.toLocaleLowerCase();

    const userAlreadyExist = await this.usersRepository.getUser({email: emailFormated});

    if (userAlreadyExist) throw new AppError('User already exist!');

    const data = {
      name, 
      password,
      email: emailFormated
    }

    await this.usersRepository.create(data);
  }
}