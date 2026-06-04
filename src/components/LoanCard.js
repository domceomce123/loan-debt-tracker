import React, { useState } from 'react';
import { updateLoan, deleteLoan } from '../firebase';
import DeletePINModal from './DeletePINModal';

function LoanCard({ personId, loan }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleFavorite = async () => {
    setIsUpdating(true);
    try {
      await updateLoan(personId, loan.id, {
        ...loan,
        isFavorite: !loan.isFavorite
      });
    } catch (error) {
      console.error('Error updating loan:', error);
      alert('Error updating loan. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteConfirm = async (pin) => {
    if (pin !== loan.pin) {
      return false; // Wrong PIN
    }

    try {
      await deleteLoan(personId, loan.id);
      setShowDeleteModal(false);
      return true;
    } catch (error) {
      console.error('Error deleting loan:', error);
      alert('Error deleting loan. Please try again.');
      return false;
    }
  };

  // Format date for display
  const dueDate = new Date(loan.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today;
  const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className={`rounded-lg shadow-md overflow-hidden transition ${
        loan.isFavorite 
          ? 'border-4 border-yellow-400 bg-yellow-50' 
          : 'bg-white border-2 border-gray-200'
      }`}>
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-gray-800">
                  {loan.creditor}
                </h4>
                {loan.isFavorite && (
                  <span className="text-xl">⭐</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Amount: <span className="font-semibold text-red-600">${loan.amount.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Due Date Info */}
          <div className={`mb-4 p-3 rounded-lg ${
            isOverdue 
              ? 'bg-red-100 border-l-4 border-red-500' 
              : 'bg-blue-100 border-l-4 border-blue-500'
          }`}>
            <p className="text-sm font-semibold text-gray-700">
              Due: {dueDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            <p className={`text-sm font-bold ${
              isOverdue 
                ? 'text-red-600' 
                : 'text-blue-600'
            }`}>
              {isOverdue 
                ? `⚠️ OVERDUE by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}` 
                : `📅 ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} remaining`
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleToggleFavorite}
              disabled={isUpdating}
              className={`flex-1 py-2 px-3 rounded-lg font-semibold transition ${
                loan.isFavorite
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              } disabled:opacity-50`}
            >
              {loan.isFavorite ? '⭐ Favorited' : '☆ Favorite'}
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete PIN Modal */}
      {showDeleteModal && (
        <DeletePINModal
          loanCreditor={loan.creditor}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

export default LoanCard;
