import React from 'react';
import { Vehicle } from '../types';
import { MapPin, Calendar, Gauge, Fuel, Settings } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDamageColor = (damage: string) => {
    switch (damage.toLowerCase()) {
      case 'hail':
        return 'bg-yellow-100 text-yellow-800';
      case 'front end':
      case 'rear':
      case 'side':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Run and Drive':
        return 'bg-green-100 text-green-800';
      case 'Start and Run':
        return 'bg-blue-100 text-blue-800';
      case 'Non-Running':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(vehicle)}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
          {vehicle.auctionHouse}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-secondary-900 px-2 py-1 rounded text-sm font-medium">
          Lote: {vehicle.lot}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-secondary-900 mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        {/* Price Info */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-2xl font-bold text-primary-500">
              {formatCurrency(vehicle.currentBid)}
            </p>
            <p className="text-sm text-secondary-600">Oferta actual</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-secondary-700">
              {formatCurrency(vehicle.estimatedValue)}
            </p>
            <p className="text-sm text-secondary-600">Valor estimado</p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-secondary-500" />
            <span className="text-secondary-700">{vehicle.odometer.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="h-4 w-4 text-secondary-500" />
            <span className="text-secondary-700">{vehicle.fuel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-secondary-500" />
            <span className="text-secondary-700">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-secondary-500" />
            <span className="text-secondary-700">{vehicle.location}</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(vehicle.condition)}`}>
            {vehicle.condition}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDamageColor(vehicle.damage)}`}>
            {vehicle.damage}
          </span>
        </div>

        {/* Sale Date */}
        <div className="flex items-center justify-between text-sm text-secondary-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Subasta: {new Date(vehicle.saleDate).toLocaleDateString('es-ES')}</span>
          </div>
          <span className="text-primary-600 font-medium">Ver detalles →</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;