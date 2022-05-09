export interface BillingPerMounthGetData {
  userId: string;
}

export interface BillingPerMounthCreateData {
  mounthName: string;
  billing: string;
  year: string;
  userId: string;
}

export interface BillingPerMounthGetOneData { 
  userId: string;
  year: string;
  mounthName: string;
}

export interface BillingPerMounthRepository {
  getAll: (data: BillingPerMounthGetData) => Promise<any>;
  getOne: (data: BillingPerMounthGetOneData) => Promise<any>;
  create: (data: BillingPerMounthCreateData) => Promise<void>;
}