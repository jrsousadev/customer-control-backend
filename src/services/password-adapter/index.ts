export interface VerifyPassword {
  password: string;
  user: {
    password: string;
  }
}

export interface PasswordAdapter{
  verify: (data: VerifyPassword) => Promise<boolean>
}