import React from 'react';
import { Car, TrendingUp, Shield, Globe, Users, Award, ArrowRight, CheckCircle, Search, Star, ChevronRight } from 'lucide-react';

interface HomepageProps {
  onSearch?: (searchTerm: string) => void;
  onNavigate?: (tab: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSearch, onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch && onNavigate) {
      onSearch(searchTerm);
      onNavigate('catalog');
    }
  };

  const features = [
    {
      icon: Car,
      title: 'Catálogo Premium',
      description: 'Acceso exclusivo a vehículos de alta gama desde las principales casas de subasta de EE.UU.'
    },
    {
      icon: TrendingUp,
      title: 'Análisis Inteligente',
      description: 'Herramientas avanzadas de análisis financiero para maximizar tu retorno de inversión.'
    },
    {
      icon: Shield,
      title: 'Proceso Seguro',
      description: 'Transacciones protegidas con seguimiento completo y garantía de satisfacción.'
    },
    {
      icon: Globe,
      title: 'Alcance Global',
      description: 'Red internacional de logística para importación eficiente a cualquier destino.'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Empresario',
      content: 'Excelente servicio. Importé un BMW 2022 y el proceso fue transparente desde el inicio.',
      rating: 5
    },
    {
      name: 'Ana García',
      role: 'Coleccionista',
      content: 'La calculadora de costos me ayudó a tomar decisiones informadas. Muy recomendado.',
      rating: 5
    },
    {
      name: 'Roberto Silva',
      role: 'Inversor',
      content: 'Profesionalismo excepcional. Ya he importado 3 vehículos con resultados excelentes.',
      rating: 5
    }
  ];

  const stats = [
    { number: '5,000+', label: 'Vehículos Importados' },
    { number: '98%', label: 'Satisfacción del Cliente' },
    { number: '15+', label: 'Años de Experiencia' },
    { number: '50+', label: 'Países Atendidos' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
              Importa Vehículos Premium con{' '}
              <span className="text-primary-600 dark:text-primary-400">Confianza Total</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Especialistas en la importación de vehículos de alta gama desde las principales casas de subasta de Estados Unidos. 
              Proceso transparente, costos claros, resultados garantizados.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 flex items-center justify-center">
              <form onSubmit={handleSearch} className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Buscar por lote, VIN o palabra clave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-neutral-200 bg-white pl-10 pr-24 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    Buscar
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => onNavigate?.('catalog')}
                className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Explorar Catálogo
              </button>
              <button
                onClick={() => onNavigate?.('calculator')}
                className="text-sm font-semibold leading-6 text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
              >
                Calcular Costos <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-50 py-24 sm:py-32 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                Resultados que Hablan por Sí Solos
              </h2>
              <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                Más de una década construyendo confianza y entregando resultados excepcionales.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col bg-white p-8 dark:bg-neutral-800">
                  <dt className="text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {stat.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
              Servicios Completos
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Todo lo que Necesitas en un Solo Lugar
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Desde la búsqueda hasta la entrega, manejamos cada aspecto del proceso de importación 
              con la máxima profesionalidad y transparencia.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral-900 dark:text-white">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600 dark:text-neutral-400">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-neutral-50 py-24 sm:py-32 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Miles de clientes satisfechos confían en nosotros para sus importaciones de vehículos.
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-neutral-900/5 dark:bg-neutral-800 dark:ring-white/10">
                  <div className="flex items-center gap-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary-400 text-primary-400" />
                    ))}
                  </div>
                  <blockquote className="text-neutral-900 dark:text-white">
                    <p>"{testimonial.content}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
              Proceso Simple
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Cómo Funciona Nuestro Servicio
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Un proceso optimizado que te lleva desde la selección hasta la entrega de tu vehículo ideal.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  1. Busca y Selecciona
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Explora nuestro catálogo de vehículos premium y utiliza nuestras herramientas de análisis.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  2. Calcula Costos
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Usa nuestra calculadora para obtener un desglose completo de todos los costos involucrados.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  3. Recibe tu Vehículo
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Nosotros manejamos todo el proceso de importación y entrega hasta tu puerta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Listo para Comenzar?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Únete a miles de clientes satisfechos que han encontrado vehículos excepcionales 
              a precios incomparables.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => onNavigate?.('catalog')}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explorar Catálogo
              </button>
              <button
                onClick={() => onNavigate?.('calculator')}
                className="text-sm font-semibold leading-6 text-white hover:text-primary-100 flex items-center"
              >
                Calcular Costos <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl text-neutral-900 dark:text-white">
                  TMImports
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                Especialistas en importación de vehículos premium con más de 15 años de experiencia 
                en el mercado internacional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>Catálogo de Vehículos</li>
                <li>Calculadora de Costos</li>
                <li>Informes Detallados</li>
                <li>Asesoría Especializada</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>info@tmimports.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Miami, FL</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              © 2024 TMImports. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;