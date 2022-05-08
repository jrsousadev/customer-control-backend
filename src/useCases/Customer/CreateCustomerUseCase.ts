import { CustomersRepository } from "../../modules/CustomersRepository";
import { UsersRepository } from "../../modules/UsersRepository";

export class CreateCustomerUseCase {
  constructor(
    usersRepositoryGetOne: UsersRepository,
    customersRepositoryGet: CustomersRepository,
    customersRepositoryCreate: CustomersRepository,
    usersRepositoryUpdateListCustomers: UsersRepository,
  ) {}
}