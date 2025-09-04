import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import VehicleCatalog from './components/VehicleCatalog';
import CostCalculator from './components/CostCalculator';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Homepage onSearch={handleSearch} onNavigate={setActiveTab} />;
      case 'catalog':
        return <VehicleCatalog searchTerm={searchTerm} />;
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