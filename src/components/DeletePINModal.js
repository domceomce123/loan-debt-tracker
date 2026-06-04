import React, { useState } from 'react';

function DeletePINModal({ loanCreditor, onConfirm, onCancel }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pin || pin.length !== 3) {
      setError('PIN must be exactly 3 digits');
      return;
    }

    setLoading(true);
    try {
      const success = await onConfirm(pin);
      if (!success) {
        setError('Incorrect PIN. Please try again.');
        setPin('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Loan?</h2>
        <p className="text-gray-600 mb-6">
          Enter your 3-digit PIN to permanently delete the loan from <span className="font-semibold">{loanCreditor}</span>.
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, '').slice(0, 3));
                setError('');
              }}
              placeholder="000"
              maxLength="3"
              autoFocus
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || pin.length !== 3}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              {loading ? 'Deleting...' : '🗑️ Delete'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          This action cannot be undone.
        </p>
      </div>
    </div>
  );
}

export default DeletePINModal;
