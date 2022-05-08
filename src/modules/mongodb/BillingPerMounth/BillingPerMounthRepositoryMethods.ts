import { 
  BillingPerMounthCreateData, 
  BillingPerMounthGetData,
  BillingPerMounthGetOneData,
  BillingPerMounthRepository 
} from "../../../repositories/BillingsPerMounthsRepository";
import { BillingPerMounthModel } from "./entities/BillingPerMounthModel";

export class MongoDBBillingPerMounthRepository implements BillingPerMounthRepository {

  async getAll({userId}: BillingPerMounthGetData) {
    return await BillingPerMounthModel.find({
      userResponsible: userId
    })
  };

  async getOne({mounthName, userId, year}: BillingPerMounthGetOneData) {
    return await BillingPerMounthModel.findOne({
      userResponsible: userId,
      mounthName,
      year,
    })
  }

  async create ({billing, mounthName, userId, year}: BillingPerMounthCreateData) {
    const data = {
      userResponsible: userId,
      mounthName: mounthName.toLocaleLowerCase(),
      billing,
      year,
    }
    await BillingPerMounthModel.create(data);
  };
}