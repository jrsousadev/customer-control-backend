interface IConfidential {
  email: string;
}

interface IListCustomers {
  customerId: string;
}

export interface IUserSpecification {
  name: string;
  password: string;
  confidential: IConfidential;
  isAdmin: boolean;
  listCustomers: IListCustomers[];
  permissions: string[];
  roles: string[];
}