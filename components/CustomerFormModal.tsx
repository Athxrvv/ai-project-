import React, { useState, useEffect, useRef } from 'react';
import type { Customer } from '../types';
import { DEFAULT_AVATAR } from '../data/mock';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'>) => void;
  customer?: Customer;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ isOpen, onClose, onSave, customer }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pendingAmount: 0,
    dueDate: '',
    lastPaymentDate: '',
    notes: '',
    photoUrl: DEFAULT_AVATAR,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        pendingAmount: customer.pendingAmount,
        dueDate: customer.dueDate,
        lastPaymentDate: customer.lastPaymentDate,
        notes: customer.notes,
        photoUrl: customer.photoUrl || DEFAULT_AVATAR,
      });
    } else {
      setFormData({
        name: '', phone: '', address: '', pendingAmount: 0,
        dueDate: '', lastPaymentDate: '', notes: '', photoUrl: DEFAULT_AVATAR,
      });
    }
  }, [customer, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'pendingAmount' ? Number(value) : value }));
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({...prev, photoUrl: reader.result as string}));
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="md:col-span-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="md:col-span-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
                <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="md:col-span-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                <input name="pendingAmount" type="number" value={formData.pendingAmount} onChange={handleChange} placeholder="Pending Amount" className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
                <div>
                  <label className="text-xs text-gray-500">Due Date</label>
                  <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <img src={formData.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 dark:border-gray-600" />
                  <input type="file" accept="image/*" onChange={handlePhotoChange} ref={fileInputRef} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full text-sm py-1 px-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Upload</button>
                  <button type="button" onClick={() => setFormData(prev => ({...prev, photoUrl: DEFAULT_AVATAR}))} className="w-full text-sm py-1 px-2 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 hover:bg-red-200">Remove</button>
              </div>
            </div>
             <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes/Remarks" className="mt-4 w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 h-24" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="py-2 px-4 rounded bg-primary-600 text-white hover:bg-primary-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
