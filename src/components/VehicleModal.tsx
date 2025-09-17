import React, { useState } from 'react';
import { Vehicle } from '../types';
import { X, MapPin, Calendar, Gauge, Fuel, Settings, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ vehicle, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">VIN: {vehicle.vin}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-80 object-cover rounded-lg"
                />
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-neutral-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-neutral-700" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {vehicle.images.length}
                </div>
              </div>

              {/* Thumbnail navigation */}
              {vehicle.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-yellow-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Details */}
            <div>
              {/* Price Section */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-700 dark:text-yellow-300 font-medium">Oferta Actual</span>
                  <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {formatCurrency(vehicle.currentBid)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Valor Estimado</span>
                  <span className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                    {formatCurrency(vehicle.estimatedValue)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-800">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">Potencial de Ganancia</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(vehicle.estimatedValue - vehicle.currentBid)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Año</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Millaje</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.odometer.toLocaleString()} mi</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Transmisión</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.transmission}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Fuel className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Combustible</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Título</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.titleType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Ubicación</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{vehicle.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Damage Information */}
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Información de Daños</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Daño Primario:</span>
                    <span className="font-medium text-neutral-900 dark:text-white">{vehicle.primaryDamage}</span>
                  </div>
                  {vehicle.secondaryDamage && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Daño Secundario:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{vehicle.secondaryDamage}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Condición:</span>
                    <span className="font-medium text-neutral-900 dark:text-white">{vehicle.condition}</span>
                  </div>
                </div>
              </div>

              {/* Auction Info */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Información de Subasta</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Casa de Subasta:</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">{vehicle.auctionHouse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Número de Lote:</span>
                    <span className="font-medium text-neutral-900 dark:text-white">{vehicle.lot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Fecha de Subasta:</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {new Date(vehicle.saleDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;