import { UsersRepository } from "../../repositories/UsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/errors/AppError";

interface GetUserUseCaseRequest {
  email: string;
  userId: string;
}

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) { }

  async execute(request: GetUserUseCaseRequest) {
    let { email, userId } = request;

    if(email === null && userId === null && email === "" && userId === "") 
    throw new AppError(`Internal server error`)

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