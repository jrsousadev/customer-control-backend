import { BillingPerMounthRepository } from "../../../../BillingsPerMounthsRepository";
import { BillingPerMounthModel } from "../../entities/BillingPerMounthModel";

interface MongoDBGetOneBillingPerMounthRepositoryRequest {
  userId: string;
  mounthName: string;
  year: string;
}

export class MongoDBOGetOneBillingPerMounthRepository implements BillingPerMounthRepository {
  async getOneBillingPerMounth({
    userId,
    year,
    mounthName
  }: MongoDBGetOneBillingPerMounthRepositoryRequest) {
    return await BillingPerMounthModel.findOne({
      userResponsible: userId,
      mounthName,
      year,
    })
  }
}