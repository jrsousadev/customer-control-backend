
export interface CustomersCreateData {
  userId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: number;
  dueDate: Date;
  paymentMethod: 'semestral' | 'bimestral' | 'trimestral';
  serviceStart: Date;
}

export interface CustomersRepository {
  create?: (data: CustomersCreateData) => Promise<void>;
}