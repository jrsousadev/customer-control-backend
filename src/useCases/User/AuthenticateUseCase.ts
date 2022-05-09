import { UsersRepository } from "../../repositories/UsersRepository";
import { PasswordAdapter } from "../../services/password-adapter";
import { TokenAdapter } from "../../services/token-adapter";
import { AppError } from "../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("PasswordAdapter")
    private passwordAdapter: PasswordAdapter,
    @inject("TokenAdapter")
    private tokenAdapter: TokenAdapter,
  ) { }

  async execute(request: AuthenticateUseCaseRequest) {
    const { email, password } = request;

    let user = null;

    if (email) {
      const emailFormated = email.toLocaleLowerCase();
      user = await this.usersRepository.getUserAuthenticate({email: emailFormated});
    } else {
      throw new AppError("E-mail não enviado!", 401);
    }

    if (user === null) throw new AppError("E-mail ou senha podem estar incorretos!!", 401);
    if (!password && !user?.password) throw new AppError("E-mail ou senha podem estar incorretos!!", 401);

    const validatePassword = await this.passwordAdapter.verify({ password, user });
    if (!validatePassword) throw new AppError("E-mail ou senha podem estar incorretos!!", 401);

    const userToReturn = user.toObject();
    delete userToReturn.password

    const token = await this.tokenAdapter.createAuthorization({_id: user._id});

    return {
      isAuthorized: true,
      authorization: `Bearer ${token}`,
      ...userToReturn,
     };
  }
}