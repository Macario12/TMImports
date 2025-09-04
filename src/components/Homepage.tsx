import React from 'react';
import { Car, TrendingUp, Shield, Globe, Users, Award, ArrowRight, CheckCircle, Search } from 'lucide-react';

interface HomepageProps {
  onSearch: (searchTerm: string) => void;
  onNavigate: (tab: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSearch, onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      onNavigate('catalog');
    }
  };

const Homepage: React.FC = () => {
  const features = [
    {
      icon: Car,
      title: 'Catálogo Exclusivo',
      description: 'Acceso a miles de vehículos premium de Copart e IAAI con información detallada y actualizada en tiempo real.'
    },
    {
      icon: TrendingUp,
      title: 'Análisis Financiero',
      description: 'Calculadora avanzada de costos que incluye todos los gastos: subasta, transporte, importación y aranceles.'
    },
    {
      icon: Shield,
      title: 'Proceso Seguro',
      description: 'Transacciones protegidas con seguimiento completo desde la compra hasta la entrega final.'
    },
    {
      icon: Globe,
      title: 'Importación Global',
      description: 'Especialistas en importación internacional con experiencia en regulaciones aduaneras.'
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Vehículos Importados' },
    { number: '98%', label: 'Satisfacción del Cliente' },
    { number: '15+', label: 'Años de Experiencia' },
    { number: '50+', label: 'Países Atendidos' }
  ];

  const services = [
    'Búsqueda y selección de vehículos',
    'Participación en subastas',
    'Transporte terrestre y marítimo',
    'Gestión de documentación',
    'Trámites aduaneros',
    'Entrega puerta a puerta'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-secondary-800 dark:to-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-secondary-900 dark:text-white">
                Tu Socio en 
                <span className="block text-primary-600 dark:text-primary-400">TM Imports</span>
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
                Especialistas en la importación de vehículos premium desde las principales casas de subasta de Estados Unidos. 
                Transparencia total en costos y proceso garantizado.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-500" />
                  <input
                    type="text"
                    placeholder="Buscar por lote, VIN o palabra clave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 dark:border-secondary-600 dark:text-white shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  onClick={() => onNavigate('catalog')}
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200">
                  onClick={() => onNavigate('calculator')}
                  Calcular Costos
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg" 
                  alt="Vehículo premium de subasta"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">$25,000</div>
                  <div className="text-sm text-primary-100">Ahorro promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-secondary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary-600 dark:text-secondary-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-secondary-50 dark:bg-secondary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="text-primary-600 font-semibold text-lg">Quiénes Somos</span>
              </div>
              <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
                Expertos en Importación de Vehículos Premium
              </h2>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-6 leading-relaxed">
                Somos una empresa especializada en la importación de vehículos de alta gama desde las principales 
                casas de subasta de Estados Unidos. Con más de 15 años de experiencia, hemos desarrollado un 
                proceso transparente y eficiente que garantiza las mejores oportunidades de inversión.
              </p>
              <p className="text-lg text-secondary-700 dark:text-secondary-300 mb-8 leading-relaxed">
                Nuestro equipo de expertos maneja cada aspecto del proceso: desde la selección del vehículo 
                ideal hasta su entrega en tu puerta, incluyendo todos los trámites legales y aduaneros necesarios.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-secondary-700 rounded-2xl p-8 shadow-md">
                <img 
                  src="https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg" 
                  alt="Equipo profesional"
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                    Proceso Transparente
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300">
                    Cada paso documentado con informes detallados de costos y seguimiento en tiempo real.
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-secondary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              ¿Por Qué Elegir AutoSubasta?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              Ofrecemos una experiencia completa y transparente en la importación de vehículos, 
              con herramientas avanzadas y soporte especializado.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-primary-50 dark:bg-primary-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors duration-200">
                    <Icon className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            ¿Listo para Encontrar tu Próximo Vehículo?
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
            Únete a miles de clientes satisfechos que han encontrado vehículos excepcionales 
            a precios incomparables a través de nuestro servicio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('catalog')}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <span>Comenzar Ahora</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
              Contactar Experto
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;