import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetUserUseCaseRequest {
  email: string;
  userId: string;
}

export class GetUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute(request: GetUserUseCaseRequest) {
    let { email, userId } = request;

    let user = null;

    if(user) email = null;
    if(email) userId = null;

    if (userId && !email) {
      const UserAlreadyExist = await this.usersRepository.getUser({ userId });
      user = UserAlreadyExist;
    } else if (email && !userId) {
      const UserAlreadyExist = await this.usersRepository.getUser({ email });
      user = UserAlreadyExist;
    }

    if(!user) throw new AppError('User is not exist!');

    return user;
  }
}