import mongoose from "mongoose";

export interface IListCustomers {
  customerId: mongoose.Types.ObjectId
}

export interface IConfidential {
  email: string;
}

export interface IUser extends Document {
  name: string;
  password: string;
  confidential: IConfidential;
  isAdmin: boolean;
  listCustomers: IListCustomers[];
}