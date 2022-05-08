
export interface CustomersCreateData {
  userId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: string;
  paymentMethod: 'semestral' | 'bimestral' | 'trimestral';
  serviceStart: string;
}

export interface CustomersGetOneInNameData {
  name: string;
  userId: string;
}

export interface CustomersGetOneInIDData {
  customerId: string;
  userId: string;
}

export interface CustomersUpdateDueDateData {
  customerId: string;
  dueDate: string;
}

export interface CustomersGetOneInIDAndNameData {
  customerId?: string;
  email?: string;
}

export interface CustomersDeleteOneData {
  customerId: string;
  userId: string;
}

export interface CustomersUpdateData {
  customerId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: string;
  paymentMethod: string;
  serviceStart: string;
}

export interface CustomersRepository {
  create: (data: CustomersCreateData) => Promise<any>;
  getOneInName: (data: CustomersGetOneInNameData) => Promise<any>;
  getOneInID: (data: CustomersGetOneInIDData) => Promise<any>;
  updateDueDate: (data: CustomersUpdateDueDateData) => Promise<any>;
  getOneInIDAndEmail: (data: CustomersGetOneInIDAndNameData) => Promise<any>;
  deleteOne: (data: CustomersDeleteOneData) => Promise<void>;
  update: (data: CustomersUpdateData) => Promise<any>;
}