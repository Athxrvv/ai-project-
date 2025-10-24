
import React, { useState, useEffect, useMemo } from 'react';
import type { Customer, Payment } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { mockCustomers, mockPayments } from './data/mock';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import Reports from './components/Reports';
import { PlusIcon, UserGroupIcon, ChartBarIcon, HomeIcon } from './components/icons/Icons';
import CustomerFormModal from './components/CustomerFormModal';
import AddPaymentModal from './components/AddPaymentModal';

type View = 'dashboard' | 'customers' | 'reports';

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', mockCustomers);
  const [payments, setPayments] = useLocalStorage<Payment[]>('payments', mockPayments);
  const [view, setView] = useState<View>('dashboard');

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(undefined);
  const [paymentCustomer, setPaymentCustomer] = useState<Customer | undefined>(undefined);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const dashboardStats = useMemo(() => {
    const totalPending = customers.reduce((sum, c) => sum + c.pendingAmount, 0);
    const upcomingDues = customers.filter(c => {
      if (!c.dueDate) return false;
      const due = new Date(c.dueDate);
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      return due > today && due <= sevenDaysFromNow && c.pendingAmount > 0;
    }).length;
    return { totalPending, totalCustomers: customers.length, upcomingDues };
  }, [customers]);

  const handleOpenAddCustomer = () => {
    setEditingCustomer(undefined);
    setIsCustomerModalOpen(true);
  };

  const handleOpenEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsCustomerModalOpen(true);
  };
  
  const handleOpenPaymentModal = (customer: Customer) => {
    setPaymentCustomer(customer);
    setIsPaymentModalOpen(true);
  }

  const handleCustomerSave = (customer: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? { ...c, ...customer, id: c.id } : c));
    } else {
      const newCustomer: Customer = { id: Date.now().toString(), ...customer };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setIsCustomerModalOpen(false);
  };
  
  const handleAddPayment = (customerId: string, amount: number) => {
    const paymentDate = new Date().toISOString().split('T')[0];
    const newPayment: Payment = {
        id: Date.now().toString(),
        customerId,
        amount,
        date: paymentDate
    };
    setPayments(prev => [newPayment, ...prev]);
    setCustomers(prev => prev.map(c => 
        c.id === customerId ? {
            ...c,
            pendingAmount: Math.max(0, c.pendingAmount - amount),
            lastPaymentDate: paymentDate
        } : c
    ));
    setIsPaymentModalOpen(false);
  };

  const handleCustomerDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      setCustomers(customers.filter(c => c.id !== customerId));
      setPayments(payments.filter(p => p.customerId !== customerId));
    }
  };
  
  const renderView = () => {
    switch (view) {
      case 'customers':
        return <CustomerList customers={customers} onEdit={handleOpenEditCustomer} onDelete={handleCustomerDelete} onAddPayment={handleOpenPaymentModal} />;
      case 'reports':
        return <Reports customers={customers} payments={payments} />;
      case 'dashboard':
      default:
        return <Dashboard stats={dashboardStats} recentPayments={payments.slice(0, 5)} customers={customers} />;
    }
  };
  
  const NavItem: React.FC<{ currentView: View, viewName: View, icon: React.ReactNode, label: string }> = ({ currentView, viewName, icon, label }) => (
    <button onClick={() => setView(viewName)} className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${currentView === viewName ? 'bg-primary-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        {icon}
        <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">Udhari Manager</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
            <NavItem currentView={view} viewName="dashboard" icon={<HomeIcon />} label="Dashboard" />
            <NavItem currentView={view} viewName="customers" icon={<UserGroupIcon />} label="Customers" />
            <NavItem currentView={view} viewName="reports" icon={<ChartBarIcon />} label="Reports" />
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={handleOpenAddCustomer}
                className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                <PlusIcon />
                <span className="ml-2">New Customer</span>
            </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header theme={theme} toggleTheme={toggleTheme} onAddCustomer={handleOpenAddCustomer} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {renderView()}
        </main>
      </div>
      {isCustomerModalOpen && (
        <CustomerFormModal
          isOpen={isCustomerModalOpen}
          onClose={() => setIsCustomerModalOpen(false)}
          onSave={handleCustomerSave}
          customer={editingCustomer}
        />
      )}
      {isPaymentModalOpen && paymentCustomer && (
        <AddPaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            onAddPayment={handleAddPayment}
            customer={paymentCustomer}
        />
      )}
    </div>
  );
};

export default App;
