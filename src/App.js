import React, { useState, useEffect } from 'react';
import { onPeopleChange } from './firebase';
import PersonSelector from './components/PersonSelector';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [people, setPeople] = useState({});

  useEffect(() => {
    // Listen to Firebase for real-time updates
    const unsubscribe = onPeopleChange((snapshot) => {
      if (snapshot.exists()) {
        setPeople(snapshot.val());
      } else {
        setPeople({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!currentPerson ? (
        <PersonSelector
          people={people}
          onSelectPerson={setCurrentPerson}
        />
      ) : (
        <Dashboard
          personId={currentPerson}
          personName={currentPerson}
          personData={people[currentPerson] || { name: currentPerson, loans: {} }}
          onBack={() => setCurrentPerson(null)}
        />
      )}
    </div>
  );
}

export default App;
