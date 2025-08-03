import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { mockVehicles } from '../data/mockData';
import { Vehicle } from '../types';
import VehicleCard from './VehicleCard';
import VehicleModal from './VehicleModal';

const VehicleCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filters, setFilters] = useState({
    auctionHouse: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    make: '',
    year: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const matchesSearch = searchTerm === '' || 
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase());
      
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Catálogo de Vehículos</h1>
          <p className="text-secondary-600">Explora los mejores autos de subasta</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-600 hover:bg-secondary-100'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-secondary-600 hover:bg-secondary-100'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-500" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo, año o VIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <select
            value={filters.auctionHouse}
            onChange={(e) => setFilters({...filters, auctionHouse: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas las subastas</option>
            <option value="Copart">Copart</option>
            <option value="IAAI">IAAI</option>
          </select>

          <select
            value={filters.make}
            onChange={(e) => setFilters({...filters, make: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas las marcas</option>
            {uniqueMakes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos los años</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={filters.condition}
            onChange={(e) => setFilters({...filters, condition: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas las condiciones</option>
            {uniqueConditions.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio mín."
            value={filters.minPrice}
            onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />

          <input
            type="number"
            placeholder="Precio máx."
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            className="px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter Actions */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={resetFilters}
            className="text-secondary-600 hover:text-secondary-800 font-medium"
          >
            Limpiar filtros
          </button>
          <div className="flex items-center space-x-2 text-sm text-secondary-600">
            <Filter className="h-4 w-4" />
            <span>{filteredVehicles.length} vehículos encontrados</span>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
          <div className="bg-secondary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-secondary-500" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">No se encontraron vehículos</h3>
          <p className="text-secondary-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
          <button
            onClick={resetFilters}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
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