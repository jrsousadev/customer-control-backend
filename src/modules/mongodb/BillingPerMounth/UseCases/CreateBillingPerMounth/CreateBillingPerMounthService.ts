import { BillingPerMounthRepository } from "../../../../BillingsPerMounthsRepository";
import { BillingPerMounthModel } from "../../entities/BillingPerMounthModel";

interface MongoDBCreateBillingPerMounthRepositoryRequest {
  mounthName: string;
  billing: string;
  year: string;
  userId: string;
}

export class MongoDBCreateBillingPerMounthRepository implements BillingPerMounthRepository {
  async create({
    mounthName,
    billing,
    year,
    userId,
  }: MongoDBCreateBillingPerMounthRepositoryRequest) {
    const data = {
      userResponsible: userId,
      mounthName: mounthName.toLocaleLowerCase(),
      billing,
      year,
    }

    await BillingPerMounthModel.create(data);
  }
}