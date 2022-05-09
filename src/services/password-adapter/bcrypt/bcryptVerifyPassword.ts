import { compare } from "bcrypt";
import { PasswordAdapter, VerifyPassword } from "../index";

export class BcryptVerifyPasswordService implements PasswordAdapter {
  async verify({ password, user }: VerifyPassword) {
    return await compare(
      password.toString(),
      user.password.toString(),
    );
  }
}