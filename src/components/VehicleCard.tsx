import React from 'react';
import { Vehicle } from '../types';
import { MapPin, Calendar, Gauge, Fuel, Settings, Eye } from 'lucide-react';

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

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Run and Drive':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Start and Run':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Non-Running':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  const getDamageColor = (damage: string) => {
    switch (damage.toLowerCase()) {
      case 'hail':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'front end':
      case 'rear':
      case 'side':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 cursor-pointer"
      onClick={() => onSelect(vehicle)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-md bg-primary-600 px-2 py-1 text-xs font-medium text-white">
          {vehicle.auctionHouse}
        </div>
        <div className="absolute top-3 right-3 rounded-md bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-neutral-900">
          Lote: {vehicle.lot}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        {/* Price Info */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(vehicle.currentBid)}
            </p>
            <p className="text-xs text-neutral-500">Oferta actual</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              {formatCurrency(vehicle.estimatedValue)}
            </p>
            <p className="text-xs text-neutral-500">Valor estimado</p>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center space-x-1">
            <Gauge className="h-3 w-3 text-neutral-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{vehicle.odometer.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="h-3 w-3 text-neutral-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{vehicle.fuel}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Settings className="h-3 w-3 text-neutral-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-neutral-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{vehicle.location}</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getConditionColor(vehicle.condition)}`}>
            {vehicle.condition}
          </span>
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getDamageColor(vehicle.damage)}`}>
            {vehicle.damage}
          </span>
        </div>

        {/* Sale Date and Action */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-neutral-500" />
            <span className="text-neutral-500">
              {new Date(vehicle.saleDate).toLocaleDateString('es-ES')}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300">
            <Eye className="h-3 w-3" />
            <span>Ver detalles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;