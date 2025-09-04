import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { mockVehicles } from '../data/mockData';
import { Vehicle } from '../types';
import VehicleCard from './VehicleCard';
import VehicleModal from './VehicleModal';

interface VehicleCatalogProps {
  searchTerm?: string;
}

const VehicleCatalog: React.FC<VehicleCatalogProps> = ({ searchTerm: initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    auctionHouse: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    make: '',
    year: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  React.useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const matchesSearch = searchTerm === '' || 
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.lot.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAuctionHouse = filters.auctionHouse === '' || vehicle.auctionHouse === filters.auctionHouse;
      const matchesCondition = filters.condition === '' || vehicle.condition === filters.condition;
      const matchesMake = filters.make === '' || vehicle.make === filters.make;
      const matchesYear = filters.year === '' || vehicle.year.toString() === filters.year;
      
      const matchesMinPrice = filters.minPrice === '' || vehicle.currentBid >= parseFloat(filters.minPrice);
      const matchesMaxPrice = filters.maxPrice === '' || vehicle.currentBid <= parseFloat(filters.maxPrice);

      return matchesSearch && matchesAuctionHouse && matchesCondition && 
             matchesMake && matchesYear && matchesMinPrice && matchesMaxPrice;
    });
  }, [searchTerm, filters]);

  const uniqueMakes = [...new Set(mockVehicles.map(v => v.make))].sort();
  const uniqueYears = [...new Set(mockVehicles.map(v => v.year))].sort((a, b) => b - a);
  const uniqueConditions = [...new Set(mockVehicles.map(v => v.condition))];

  const resetFilters = () => {
    setFilters({
      auctionHouse: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      make: '',
      year: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Catálogo de Vehículos
        </h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
          Descubre vehículos premium de las mejores casas de subasta
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo, año, VIN o lote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white pl-10 pr-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-neutral-200 bg-white hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 px-4 py-2"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </button>
            <span className="text-sm text-neutral-500">
              {filteredVehicles.length} vehículos encontrados
            </span>
          </div>
          
          <div className="flex items-center space-x-1 rounded-md border border-neutral-200 p-1 dark:border-neutral-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Casa de Subasta
                </label>
                <select
                  value={filters.auctionHouse}
                  onChange={(e) => setFilters({...filters, auctionHouse: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                >
                  <option value="">Todas</option>
                  <option value="Copart">Copart</option>
                  <option value="IAAI">IAAI</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Marca
                </label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters({...filters, make: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                >
                  <option value="">Todas</option>
                  {uniqueMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Año
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                >
                  <option value="">Todos</option>
                  {uniqueYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Condición
                </label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                >
                  <option value="">Todas</option>
                  {uniqueConditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Precio Mín.
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
                  Precio Máx.
                </label>
                <input
                  type="number"
                  placeholder="$999,999"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 px-4 py-2"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Grid/List */}
      {filteredVehicles.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "space-y-4"
        }>
          {filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={setSelectedVehicle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 rounded-full bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
            <Search className="h-12 w-12 text-neutral-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
            No se encontraron vehículos
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Intenta ajustar tus criterios de búsqueda o filtros
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Vehicle Modal */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
};

export default VehicleCatalog;