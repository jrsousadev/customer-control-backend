import { BillingPerMounthRepository } from "../../../../BillingsPerMounthsRepository";
import { BillingPerMounthModel } from "../../entities/BillingPerMounthModel";

interface MongoDBGetBillingPerMounthRepositoryRequest {
  userId: string;
}

export class MongoDBGetBillingPerMounthRepository implements BillingPerMounthRepository {
  async getAllBillingPerMounth({
    userId
  }: MongoDBGetBillingPerMounthRepositoryRequest) {
    return await BillingPerMounthModel.find({
      userResponsible: userId
    })
  }
}