
import React, { useState } from 'react';
import type { Customer } from '../types';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: (customerId: string, amount: number) => void;
  customer: Customer;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ isOpen, onClose, onAddPayment, customer }) => {
  const [amount, setAmount] = useState<number>(customer.pendingAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(amount > 0 && amount <= customer.pendingAmount) {
        onAddPayment(customer.id, amount);
    } else if (amount > customer.pendingAmount) {
        alert("Payment amount cannot be greater than the pending amount.");
    } else {
        alert("Please enter a valid amount.");
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm m-4">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Add Payment</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">For: <span className="font-semibold">{customer.name}</span></p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Current Pending: <span className="font-semibold text-red-500">{formatCurrency(customer.pendingAmount)}</span></p>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Amount</label>
            <input
              id="paymentAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="mt-1 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              required
              min="0.01"
              step="0.01"
              max={customer.pendingAmount}
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="py-2 px-4 rounded bg-primary-600 text-white hover:bg-primary-700">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
