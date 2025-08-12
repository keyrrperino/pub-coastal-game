import React, { useState } from 'react';
import Modal from './Modal';

interface TeamNameInputModalProps {
  isOpen: boolean;
  onSubmit: (teamName: string) => void;
  finalScore?: number;
}

const TeamNameInputModal: React.FC<TeamNameInputModalProps> = ({ 
  isOpen, 
  onSubmit, 
  finalScore = 0 
}) => {
  const [teamName, setTeamName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setIsSubmitting(true);
    await onSubmit(teamName.trim());
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-md mx-auto p-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-900 rounded-3xl shadow-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-2">Victory!</h2>
            <p className="text-lg opacity-90">Enter your team name for the leaderboard</p>
          </div>

          {/* Score display */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-6 mb-8 text-center backdrop-blur-sm">
            <div className="text-sm opacity-80 mb-1">Final Score</div>
            <div className="text-4xl font-bold text-yellow-400">
              {finalScore.toLocaleString()}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name..."
                className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                maxLength={20}
                disabled={isSubmitting}
              />
              <div className="text-xs opacity-60 mt-1">
                {teamName.length}/20 characters
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setTeamName('')}
                disabled={!teamName || isSubmitting}
                className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white hover:bg-opacity-20 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={!teamName.trim() || isSubmitting}
                className="flex-1 px-4 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Score'}
              </button>
            </div>
          </form>

          {/* Quick suggestions */}
          <div className="mt-8">
            <p className="text-sm opacity-80 mb-3">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {['Coastal Defenders', 'Wave Warriors', 'Tide Tamers', 'Sea Guardians', 'Storm Breakers'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setTeamName(suggestion)}
                  disabled={isSubmitting}
                  className="px-3 py-1 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 text-xs hover:bg-opacity-20 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-white bg-opacity-5 rounded-xl backdrop-blur-sm">
            <p className="text-xs opacity-70 leading-relaxed">
              Your team name and score will be displayed on the leaderboard. 
              Make it memorable and celebrate your coastal protection success!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamNameInputModal;