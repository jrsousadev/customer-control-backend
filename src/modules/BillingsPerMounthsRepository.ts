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
  getAllBillingPerMounth?: (data: BillingPerMounthGetData) => Promise<any>;
  getOneBillingPerMounth?: (data: BillingPerMounthGetOneData) => Promise<any>;
  create?: (data: BillingPerMounthCreateData) => Promise<void>;
}