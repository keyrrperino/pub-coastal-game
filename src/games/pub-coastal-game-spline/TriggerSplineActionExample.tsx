import React from 'react';
import { useGameContext, GameProvider } from './GlobalGameContext';

// Example function to trigger a Spline action
function triggerSplineSeawallAction(seawallValue: number | null) {
  // Replace this with your Spline API or logic
  if (seawallValue) {
    alert(`Triggering Spline action for Seawall with value: ${seawallValue}`);
    // e.g. call Spline API or send event
  } else {
    alert('Please select a Seawall value first!');
  }
}

const TriggerSplineActionExample: React.FC = () => {
  const { seawallValue } = useGameContext();

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-gray-100 rounded-xl">
      <div className="font-bold text-lg mb-2">Trigger Spline Action Example</div>
      <div className="flex items-center gap-2">
        <span className="text-base">Selected Seawall value:</span>
        <span className="font-mono text-blue-700 text-lg">{seawallValue ?? 'None'}</span>
      </div>
      <button
        className="bg-blue-700 text-white font-bold rounded-lg px-6 py-2 mt-2 cursor-pointer hover:bg-blue-900 transition"
        onClick={() => triggerSplineSeawallAction(seawallValue)}
      >
        Trigger Seawall Spline Action
      </button>
    </div>
  );
};

// Example usage: wrap in GameProvider for context
export default function TriggerSplineActionExampleWrapper() {
  return (
    <GameProvider>
      <TriggerSplineActionExample />
    </GameProvider>
  );
} 