import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../../../modules/mongodb/User/entities/UserModel';

interface IPayload{
  _id: string;
}

export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) throw new AppError('TOKEN_IS_MISSING');

  const [, token] = authHeader.split(' ');

  try {
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET) throw new AppError("SEND SECRET TOKEN");

    const { _id} = verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as unknown as IPayload 
    
    const user = await UserModel.findById(_id, { password: 0 })
    if(!user) throw new Error("User does not exists")
  
    return next();  
  } catch (err) {
    throw new AppError("INVALID_TOKEN");
  }
}