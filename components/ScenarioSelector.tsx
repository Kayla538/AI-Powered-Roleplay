
import React from 'react';
import type { Scenario } from '../types';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
}

const ScenarioCard: React.FC<{ scenario: Scenario; onSelect: () => void }> = ({ scenario, onSelect }) => (
  <div
    className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    onClick={onSelect}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onSelect()}
  >
    <div>
      <h3 className="text-xl font-bold text-blue-400 mb-2">{scenario.title}</h3>
      <p className="text-gray-400 text-sm">{scenario.description}</p>
    </div>
    <div className="mt-4">
      <p className="text-xs text-gray-500">
        Customer: <span className="font-semibold text-gray-300">{scenario.customerName}</span> | Mood: <span className="font-semibold text-gray-300">{scenario.mood}</span>
      </p>
    </div>
  </div>
);

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ scenarios, onSelectScenario }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Select a Training Scenario</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a scenario below to start a roleplaying session with an AI-powered customer. Your goal is to resolve their issue professionally.
        </p>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onSelect={() => onSelectScenario(scenario)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScenarioSelector;