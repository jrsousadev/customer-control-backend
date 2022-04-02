import jwt from 'jsonwebtoken';

interface IUser {
  _id: string;
}

export function encode(data: IUser) {
  return jwt.sign(data, process.env.JWT_SECRET);
}

export function createUserAuthorizationToken({_id}: IUser){
  return encode({ _id });
}