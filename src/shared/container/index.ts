import { container } from "tsyringe";

// Interfaces / IRepositories
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { TokenAdapter } from "../../services/token-adapter";
import { PasswordAdapter } from "../../services/password-adapter";
import { BillingPerMounthRepository } from "../../repositories/BillingsPerMounthsRepository";

//UseCases
import { MongoDBCustomersRepository } from "../../modules/mongodb/Customer/CustomersRepositoryMethods";
import { MongoDBUsersRepository } from "../../modules/mongodb/User/UsersRepositoryMethods";
import { MongoDBBillingPerMounthRepository } from "../../modules/mongodb/BillingPerMounth/BillingPerMounthRepositoryMethods";

//Services
import { BcryptVerifyPasswordService } from "../../services/password-adapter/bcrypt/bcryptVerifyPassword";
import { JwtCreateAuthorizationToken } from "../../services/token-adapter/jwt/jwtCreateAuthorizationToken";


// ######## Repositories ########
container.registerSingleton<UsersRepository>(
  "UsersRepository",
  MongoDBUsersRepository
);
container.registerSingleton<CustomersRepository>(
  "CustomersRepository",
  MongoDBCustomersRepository,
);
container.registerSingleton<BillingPerMounthRepository>(
  "BillingsPerMounthRepository",
  MongoDBBillingPerMounthRepository
)

// ######## Services Injeccions ########
container.registerSingleton<TokenAdapter>(
  "TokenAdapter",
  JwtCreateAuthorizationToken
);
container.registerSingleton<PasswordAdapter>(
  "PasswordAdapter",
  BcryptVerifyPasswordService,
);