import React, { useState, useEffect } from 'react';
import { Car, BarChart3, Calculator, Menu, X, Sun, Moon, LogIn, UserPlus } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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

  const handleAuth = (email: string, password: string, name?: string) => {
    // Simulate authentication
    setIsLoggedIn(true);
    setUser({ 
      name: name || email.split('@')[0], 
      email 
    });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
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
              {!isLoggedIn && (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition duration-300 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  aria-label="Login"
                >
                  <LogIn className="h-4 w-4" />
                </button>
              )}
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

              {/* Auth buttons for desktop */}
              {isLoggedIn ? (
                <div className="flex items-center gap-x-4">
                  <div className="hidden md:flex items-center gap-x-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-x-4">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="flex items-center gap-x-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Iniciar Sesión</span>
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Registrarse</span>
                  </button>
                </div>
              )}

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

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </>
  );
};

// Auth Modal Component
interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onAuth: (email: string, password: string, name?: string) => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onAuth, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(email, password, mode === 'signup' ? name : undefined);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 dark:text-white"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary-600 dark:text-secondary-400">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              {mode === 'login' ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;