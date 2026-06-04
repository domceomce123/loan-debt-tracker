import React, { useState } from 'react';
import { addPerson } from '../firebase';

function PersonSelector({ people, onSelectPerson }) {
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddPerson = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    try {
      const personId = newName.toLowerCase().replace(/\s+/g, '_');
      await addPerson(personId, {
        name: newName,
        loans: {}
      });
      setNewName('');
      onSelectPerson(personId);
    } catch (error) {
      console.error('Error adding person:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const peopleList = Object.entries(people).map(([id, data]) => ({
    id,
    name: data.name || id
  }));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            💰 Loan Tracker
          </h1>
          <p className="text-gray-600">Manage your debts securely</p>
        </div>

        {/* Select Existing Person */}
        {peopleList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select a Profile
            </h2>
            <div className="space-y-2">
              {peopleList.map((person) => (
                <button
                  key={person.id}
                  onClick={() => onSelectPerson(person.id)}
                  className="w-full p-4 text-left bg-indigo-50 hover:bg-indigo-100 rounded-lg transition border-2 border-indigo-200 hover:border-indigo-400"
                >
                  <span className="text-lg font-medium text-indigo-600">
                    {person.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
        )}

        {/* Create New Person */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {peopleList.length > 0 ? 'Create New Profile' : 'Create Your Profile'}
          </h2>
          <form onSubmit={handleAddPerson} className="space-y-3">
            <input
              type="text"
              placeholder="Enter name (e.g., Raukus, Amber)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newName.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              {loading ? 'Creating...' : '✨ Create Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonSelector;
