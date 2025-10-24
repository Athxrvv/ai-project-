import React from 'react';
import type { Customer, Payment } from '../types';
import { CashIcon, ClockIcon, UserGroupIcon } from './icons/Icons';
import { DEFAULT_AVATAR } from '../data/mock';

interface DashboardProps {
  stats: {
    totalPending: number;
    totalCustomers: number;
    upcomingDues: number;
  };
  recentPayments: Payment[];
  customers: Customer[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ stats, recentPayments, customers }) => {
  const getCustomer = (customerId: string) => {
    return customers.find(c => c.id === customerId) || { id: 'unknown', name: 'Unknown Customer', photoUrl: DEFAULT_AVATAR, phone: '', address: '', pendingAmount: 0, dueDate: '', lastPaymentDate: '', notes: '' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Pending Amount" value={formatCurrency(stats.totalPending)} icon={<CashIcon />} color="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" />
        <StatCard title="Total Customers" value={stats.totalCustomers} icon={<UserGroupIcon />} color="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" />
        <StatCard title="Upcoming Dues (7 Days)" value={stats.upcomingDues} icon={<ClockIcon />} color="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.length > 0 ? (
                recentPayments.map(payment => {
                  const customer = getCustomer(payment.customerId);
                  return (
                    <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                            <img className="h-8 w-8 rounded-full object-cover" src={customer.photoUrl || DEFAULT_AVATAR} alt={customer.name} />
                            <span>{customer.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">{formatCurrency(payment.amount)}</td>
                      <td className="py-3 px-4">{new Date(payment.date).toLocaleDateString()}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500">No recent payments.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
