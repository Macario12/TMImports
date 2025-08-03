import React, { useState, useEffect } from 'react';
import { Car, BarChart3, Calculator, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Car },
    { id: 'catalog', label: 'Catálogo', icon: Car },
    { id: 'calculator', label: 'Calculadora', icon: Calculator },
    { id: 'reports', label: 'Informes', icon: BarChart3 }
  ];

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('hs_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('hs_theme', !darkMode ? 'dark' : 'default');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky inset-x-0 top-4 z-50 w-full">
      <nav 
        className="relative mx-2 w-full rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md transition-all duration-300 dark:border-neutral-700/40 dark:bg-neutral-800/80 md:flex md:items-center md:justify-between md:px-6 lg:px-8 xl:mx-auto"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center space-x-3 rounded-lg text-xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Brand"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-md">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary-600 to-secondary-900 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-200">
              TMImports
            </span>
          </a>

          {/* Mobile buttons */}
          <div className="flex items-center gap-x-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition duration-300 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition duration-300 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-[1.25rem] w-[1.25rem]" />
              ) : (
                <Menu className="h-[1.25rem] w-[1.25rem]" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={`hs-collapse ${mobileMenuOpen ? 'block' : 'hidden'} grow basis-full overflow-hidden transition-all duration-300 md:block`}>
          <div className="mt-5 flex flex-col gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 lg:gap-x-7 md:gap-y-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Dark mode toggle for desktop */}
            <button
              onClick={toggleDarkMode}
              className="hidden h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition duration-300 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 md:flex"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>
      <br/>
    </header>
  );
};

export default Header;