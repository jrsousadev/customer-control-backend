import mongoose from "mongoose";

interface IContact {
  email: string;
  phone: string;
}

interface IContract {
  userResponsible: mongoose.Types.ObjectId;
  value: number;
  dueDate: Date;
  paymentMethod: 'semestral' | 'bimestral' | 'trimestral';
  serviceStart: Date;
}

export interface ICustomer {
  name: string;
  responsibleName: string;
  contact: IContact;
  contract: IContract;
}