import React, { useMemo } from 'react';
import LoanCard from './LoanCard';

function LoanList({ personId, loans }) {
  // Sort loans: favorites first, then by due date
  const sortedLoans = useMemo(() => {
    const loansArray = Object.values(loans);
    
    return loansArray.sort((a, b) => {
      // Favorites come first
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1;
      }
      
      // Within same priority (favorite or not), sort by due date
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
  }, [loans]);

  if (Object.keys(loans).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Your Loans</h3>
      {sortedLoans.map(loan => (
        <LoanCard
          key={loan.id}
          personId={personId}
          loan={loan}
        />
      ))}
    </div>
  );
}

export default LoanList;
