import React, { useState } from 'react';
import { updateLoan } from '../firebase';

function AddLoanForm({ personId, onLoanAdded, onCancel }) {
  const [formData, setFormData] = useState({
    creditor: '',
    amount: '',
    dueDate: '',
    pin: '',
    pinConfirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.creditor.trim()) {
      setError('Creditor name is required');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (!formData.dueDate) {
      setError('Due date is required');
      return;
    }
    if (!formData.pin || formData.pin.length !== 3 || !/^\d+$/.test(formData.pin)) {
      setError('PIN must be exactly 3 digits');
      return;
    }
    if (formData.pin !== formData.pinConfirm) {
      setError('PINs do not match');
      return;
    }

    setLoading(true);
    try {
      const loanId = Date.now().toString();
      await updateLoan(personId, loanId, {
        id: loanId,
        creditor: formData.creditor,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        pin: formData.pin,
        isFavorite: false,
        createdAt: new Date().toISOString()
      });
      onLoanAdded();
    } catch (error) {
      console.error('Error adding loan:', error);
      setError('Error adding loan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Loan</h3>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Creditor Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Creditor Name *
          </label>
          <input
            type="text"
            name="creditor"
            value={formData.creditor}
            onChange={handleChange}
            placeholder="e.g., Bank of America, Credit Card Co."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            disabled={loading}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount ($) *
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            disabled={loading}
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Due Date *
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            disabled={loading}
          />
        </div>

        {/* 3-Digit PIN */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              3-Digit PIN *
            </label>
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="000"
              maxLength="3"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Required to delete this loan
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm PIN *
            </label>
            <input
              type="password"
              name="pinConfirm"
              value={formData.pinConfirm}
              onChange={handleChange}
              placeholder="000"
              maxLength="3"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {loading ? 'Adding...' : '✅ Add Loan'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLoanForm;
