import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import VehicleCatalog from './components/VehicleCatalog';
import CostCalculator from './components/CostCalculator';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage />;
      case 'catalog':
        return <VehicleCatalog />;
      case 'calculator':
        return <CostCalculator />;
      case 'reports':
        return <Reports />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="pb-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;