import React, { useState, useMemo } from 'react';
import type { Customer } from '../types';
import { EditIcon, TrashIcon, CreditCardIcon, WhatsAppIcon, SearchIcon } from './icons/Icons';
import { DEFAULT_AVATAR } from '../data/mock';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onAddPayment: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete, onAddPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Customer | 'none'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(
      c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    if (sortField !== 'none') {
      filtered.sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        let comparison = 0;
        if (fieldA > fieldB) {
          comparison = 1;
        } else if (fieldA < fieldB) {
          comparison = -1;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [customers, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSendReminder = (customerName: string) => {
    alert(`(Simulated) WhatsApp reminder sent to ${customerName}.`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  const getStatus = (customer: Customer) => {
    if (customer.pendingAmount === 0) return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">Paid</span>;
    const dueDate = new Date(customer.dueDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (dueDate < today) return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-200">Overdue</span>;
    return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-200">Pending</span>;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">All Customers</h2>
        <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => handleSort('pendingAmount')}>Pending Amount</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => handleSort('dueDate')}>Due Date</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCustomers.length > 0 ? (
              filteredAndSortedCustomers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-full object-cover" src={customer.photoUrl || DEFAULT_AVATAR} alt={customer.name} />
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-4 font-medium ${customer.pendingAmount > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{formatCurrency(customer.pendingAmount)}</td>
                  <td className="py-3 px-4">{customer.dueDate ? new Date(customer.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-3 px-4">{getStatus(customer)}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center items-center space-x-1">
                      <button onClick={() => handleSendReminder(customer.name)} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-gray-600 rounded-full" title="Send Reminder"><WhatsAppIcon /></button>
                      <button onClick={() => onAddPayment(customer)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-full" title="Add Payment"><CreditCardIcon /></button>
                      <button onClick={() => onEdit(customer)} className="p-2 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-gray-600 rounded-full" title="Edit"><EditIcon /></button>
                      <button onClick={() => onDelete(customer.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-600 rounded-full" title="Delete"><TrashIcon /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">No customers found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
