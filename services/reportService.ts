import type { Customer, Payment } from '../types';

type PaymentWithCustomerName = Payment & { customerName: string };

const convertToCSV = (data: any[], headers: string[]): string => {
  const headerRow = headers.join(',');
  const rows = data.map(row => 
    headers.map(header => {
      let cell = row[header as keyof typeof row] === null || row[header as keyof typeof row] === undefined ? '' : row[header as keyof typeof row];
      cell = String(cell);
      if (cell.includes(',')) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(',')
  );
  return [headerRow, ...rows].join('\n');
};

const downloadCSV = (csvString: string, filename: string) => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateCustomerCSV = (customers: Customer[]) => {
  const headers = ['id', 'name', 'phone', 'address', 'pendingAmount', 'dueDate', 'lastPaymentDate', 'notes', 'photoUrl'];
  const csvString = convertToCSV(customers, headers);
  downloadCSV(csvString, 'customers_report.csv');
};

export const generatePaymentCSV = (payments: PaymentWithCustomerName[]) => {
  const headers = ['id', 'customerId', 'customerName', 'amount', 'date'];
  const csvString = convertToCSV(payments, headers);
  downloadCSV(csvString, 'payments_report.csv');
};
