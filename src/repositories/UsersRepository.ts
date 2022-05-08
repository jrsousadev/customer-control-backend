export interface UsersGetAuthenticateData {
  email: string;
}

export interface UsersGetData {
  userId?: string;
  email?: string;
}

export interface UsersCreateData {
  name: string;
  password: string;
  email: string;
}

export interface UsersUpdateListCustomersData {
  userId: string;
  customerId: string;
  functionMethod: 'removeInList' | 'addInList';
}

export interface UsersRepository {
  getUserAuthenticate: (data: UsersGetAuthenticateData) => Promise<any>;
  getUser: (data: UsersGetData) => Promise<any>;
  create: (data: UsersCreateData) => Promise<void>;
  updateListCustomers: (data: UsersUpdateListCustomersData) => Promise<void>;
}