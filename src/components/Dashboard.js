import React, { useState } from 'react';
import LoanList from './LoanList';
import AddLoanForm from './AddLoanForm';

function Dashboard({ personId, personName, personData, onBack }) {
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate total debt
  const loans = personData.loans || {};
  const totalDebt = Object.values(loans).reduce((sum, loan) => {
    return sum + (parseFloat(loan.amount) || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition"
        >
          ← Back to Profiles
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {personName}'s Dashboard
          </h1>
          <p className="text-gray-600">Manage all your loans and debts</p>
        </div>

        {/* Total Debt Display */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-xl p-8 mb-6 text-white">
          <p className="text-lg font-semibold opacity-90">Total Debt Balance</p>
          <h2 className="text-5xl font-bold">
            ${totalDebt.toFixed(2)}
          </h2>
          <p className="text-sm opacity-75 mt-2">
            {Object.keys(loans).length} active loan{Object.keys(loans).length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Add Loan Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition mb-6"
          >
            + Add New Loan
          </button>
        )}

        {/* Add Loan Form */}
        {showAddForm && (
          <AddLoanForm
            personId={personId}
            onLoanAdded={() => setShowAddForm(false)}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Loans List */}
        <LoanList
          personId={personId}
          loans={loans}
        />

        {/* Empty State */}
        {Object.keys(loans).length === 0 && !showAddForm && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">
              No loans yet. Add one to get started! 💳
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
