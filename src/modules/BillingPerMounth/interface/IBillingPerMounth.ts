import mongoose from "mongoose";

export interface IBillingPerMounth {
  userResponsible: mongoose.Types.ObjectId;
  mounthName: string;
  year: string;
  billing: number;
}