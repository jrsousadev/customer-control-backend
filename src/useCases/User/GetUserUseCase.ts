
import { UsersRepository } from "../../modules/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetUserUseCaseRequest {
  email: string;
  userId: string;
}

export class GetUserUseCase {
  constructor(
    private usersRepositoryGetUser: UsersRepository,
  ) { }

  async execute(request: GetUserUseCaseRequest) {
    let { email, userId } = request;

    let user = null;

    if(user) email = null;
    if(email) userId = null;

    if (userId && !email) {
      const UserAlreadyExist = await this.usersRepositoryGetUser.getUser({ userId });
      user = UserAlreadyExist;
    } else if (email && !userId) {
      const UserAlreadyExist = await this.usersRepositoryGetUser.getUser({ email });
      user = UserAlreadyExist;
    }

    if(!user) throw new AppError('User is not exist!');

    return user;
  }
}