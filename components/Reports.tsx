
import React from 'react';
import type { Customer, Payment } from '../types';
import { generateCustomerCSV, generatePaymentCSV } from '../services/reportService';
import { DownloadIcon } from './icons/Icons';

interface ReportsProps {
  customers: Customer[];
  payments: Payment[];
}

const Reports: React.FC<ReportsProps> = ({ customers, payments }) => {
  const handleDownloadCustomers = () => {
    generateCustomerCSV(customers);
  };

  const handleDownloadPayments = () => {
    const paymentDataWithCustomerName = payments.map(p => ({
        ...p,
        customerName: customers.find(c => c.id === p.customerId)?.name || 'N/A'
    }));
    generatePaymentCSV(paymentDataWithCustomerName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Generate Reports</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium">Customer Data Report</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Download a CSV file of all customer details.</p>
          </div>
          <button
            onClick={handleDownloadCustomers}
            className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <DownloadIcon />
            <span className="ml-2">Download CSV</span>
          </button>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium">Payment History Report</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Download a CSV file of all payment transactions.</p>
          </div>
          <button
            onClick={handleDownloadPayments}
            className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <DownloadIcon />
            <span className="ml-2">Download CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
