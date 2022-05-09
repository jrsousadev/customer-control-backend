import { 
  CustomersCreateData, 
  CustomersDeleteOneData, 
  CustomersGetOneInIDAndNameData, 
  CustomersGetOneInIDData, 
  CustomersGetOneInNameData, 
  CustomersRepository, 
  CustomersUpdateData, 
  CustomersUpdateDueDateData 
} from "../../../repositories/CustomersRepository";
import { CustomerModel } from "./entities/CustomerModel";

export class MongoDBCustomersRepository implements CustomersRepository {
  async create({
    email, 
    name, 
    dueDate,
    paymentMethod,
    phone,
    responsibleName,
    serviceStart,
    userId,
    value
  }: CustomersCreateData) {
    const contact = {
      email,
      phone
    }

    const contract = {
      userResponsible: userId,
      value,
      dueDate: `${dueDate}T13:00:00.000Z`,
      paymentMethod,
      serviceStart: `${serviceStart}T13:00:00.000Z`
    }

    const data = {
      name,
      responsibleName,
      contact,
      contract,
    }
    
    return await CustomerModel.create(data);
  };

  async getOneInName({name, userId}: CustomersGetOneInNameData) {
    return CustomerModel.findOne({
      name,
      userResponsible: userId
    });
  };

  async getOneInID({customerId, userId}: CustomersGetOneInIDData) {
    return CustomerModel.findOne({
      _id: customerId,
      userResponsible: userId
    })
  };

  async updateDueDate({customerId, dueDate}: CustomersUpdateDueDateData) {
    return await CustomerModel.findOneAndUpdate({
      _id: customerId
    }, {'contract.dueDate': dueDate}, {new: true});
  };

  async getOneInIDAndEmail({customerId, email}: CustomersGetOneInIDAndNameData) {
    if(customerId) return await CustomerModel.findOne({_id: customerId}).sort({ 'contract.dueDate': -1 });
    if(email) return await CustomerModel.findOne({'contact.email': email}).sort({ 'contract.dueDate': -1 });
  };

  async deleteOne({customerId, userId}: CustomersDeleteOneData) {
    await CustomerModel.deleteOne({
      _id: customerId,
      'contract.userResponsible': userId
    });
  };

  async update({
    customerId,
    dueDate,
    email,
    name,
    paymentMethod,
    phone,
    responsibleName,
    serviceStart,
    value,
  }: CustomersUpdateData) {
    return await CustomerModel.findOneAndUpdate({
      _id: customerId
    }, {
      name,
      responsibleName,
      'contact.email': email,
      'contact.phone': phone,
      'contract.value': value,
      'contract.dueDate': dueDate,
      'contract.paymentMethod': paymentMethod,
      'contract.serviceStart': serviceStart
    }, {new: true});
  }
}