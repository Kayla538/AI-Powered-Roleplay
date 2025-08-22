import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import CustomerDashboard from './components/CustomerDashboard';
import ScenarioSelector from './components/ScenarioSelector';
import type { Scenario } from './types';
import { SCENARIOS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const handleEndSession = () => {
    setSelectedScenario(null);
  };

  const renderMainContent = () => {
    if (!selectedScenario) {
      return <ScenarioSelector scenarios={SCENARIOS} onSelectScenario={handleScenarioSelect} />;
    }
    return <CustomerDashboard scenario={selectedScenario} onEndSession={handleEndSession} />;
  }

  return (
      <div className="h-screen bg-gray-900">
        {isLoggedIn ? renderMainContent() : <LoginPage onLogin={handleLogin} />}
      </div>
  );
};

export default App;
