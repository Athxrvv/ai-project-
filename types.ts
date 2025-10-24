
export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  pendingAmount: number;
  dueDate: string; // YYYY-MM-DD
  lastPaymentDate: string; // YYYY-MM-DD
  notes: string;
  photoUrl: string;
}

export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  date: string; // YYYY-MM-DD
}