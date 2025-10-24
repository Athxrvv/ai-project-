import type { Customer, Payment } from '../types';

export const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0U1RTdFQiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTguNjg1IDE5LjA5N0E5LjcyMyA5LjcyMyAwIDAwMjEuNzUgMTJjMC01LjM4NS00LjM2NS05Ljc1LTkuNzUtOS43NVM S5MjUgNi42MTUgMi4yNSAxMmE5LjcyMyA5LjcyMyAwIDAwMy4wNjUgNy4wOTdBOS43MTYgOS43MTYgMCAwMDEyIDIxLjc1YTkuNzE2IDkuNzE2IDAgMDA2LjY4NS0yLjY1M3ptLTEyLjU0LTEuMjg1QTcuNDg2IDcuNDg2IDAgMDExMiAxNWE3LjQ4NiA3LjQ4NiAwIDAxNS44NTUgMi44MTJBOOC4yMjQgOC4yMjQgMCAwMTEyIDIwLjI1YTguMjI0IDguMjI0IDAgMDEtNS44NTUtMi40Mzh6TTE1Ljc1IDlhMy43NSAzLjc1IDAgMTEtNy41IDAgMy43NSAzLjc1IDAgMDE3LjUgMHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz48L3N2Zz4=';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    phone: '9876543210',
    address: '123, MG Road, Bangalore',
    pendingAmount: 2500,
    dueDate: '2024-08-15',
    lastPaymentDate: '2024-07-20',
    notes: 'Ordered 50kg rice',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    id: '2',
    name: 'Priya Patel',
    phone: '9988776655',
    address: '45, Jubilee Hills, Hyderabad',
    pendingAmount: 0,
    dueDate: '2024-07-30',
    lastPaymentDate: '2024-07-25',
    notes: 'Cleared all dues.',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    id: '3',
    name: 'Rohan Singh',
    phone: '8877665544',
    address: '789, Linking Road, Mumbai',
    pendingAmount: 500,
    dueDate: '2024-08-05',
    lastPaymentDate: '2024-07-10',
    notes: 'Monthly grocery',
    photoUrl: DEFAULT_AVATAR,
  },
  {
    id: '4',
    name: 'Sunita Gupta',
    phone: '7766554433',
    address: '101, Connaught Place, Delhi',
    pendingAmount: 8200,
    dueDate: '2024-07-28',
    lastPaymentDate: '2024-06-15',
    notes: 'Large order for event',
    photoUrl: DEFAULT_AVATAR,
  },
];

export const mockPayments: Payment[] = [
    { id: 'p1', customerId: '2', amount: 1500, date: '2024-07-25' },
    { id: 'p2', customerId: '1', amount: 1000, date: '2024-07-20' },
    { id: 'p3', customerId: '4', amount: 5000, date: '2024-06-15' },
    { id: 'p4', customerId: '3', amount: 2000, date: '2024-07-10' },
];
