import jwt from 'jsonwebtoken';
import { CreateToken, TokenAdapter } from "../index";

export class JwtCreateAuthorizationToken implements TokenAdapter {
  
  private encode(data: CreateToken) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  async createAuthorization({ _id, permissions, roles }: CreateToken) {
    return this.encode({ _id, permissions, roles });
  }
}