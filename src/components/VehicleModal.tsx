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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-secondary-200">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-secondary-600">VIN: {vehicle.vin}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-secondary-600" />
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
                      <ChevronLeft className="h-5 w-5 text-secondary-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-secondary-700" />
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
                        index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
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
              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary-700 font-medium">Oferta Actual</span>
                  <span className="text-3xl font-bold text-primary-600">
                    {formatCurrency(vehicle.currentBid)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Valor Estimado</span>
                  <span className="text-xl font-semibold text-secondary-700">
                    {formatCurrency(vehicle.estimatedValue)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-primary-200">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Potencial de Ganancia</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(vehicle.estimatedValue - vehicle.currentBid)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Año</p>
                      <p className="font-semibold text-secondary-900">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gauge className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Millaje</p>
                      <p className="font-semibold text-secondary-900">{vehicle.odometer.toLocaleString()} mi</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Transmisión</p>
                      <p className="font-semibold text-secondary-900">{vehicle.transmission}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Fuel className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Combustible</p>
                      <p className="font-semibold text-secondary-900">{vehicle.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Título</p>
                      <p className="font-semibold text-secondary-900">{vehicle.titleType}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-secondary-500" />
                    <div>
                      <p className="text-sm text-secondary-600">Ubicación</p>
                      <p className="font-semibold text-secondary-900">{vehicle.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Damage Information */}
              <div className="bg-secondary-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Información de Daños</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Daño Primario:</span>
                    <span className="font-medium text-secondary-900">{vehicle.primaryDamage}</span>
                  </div>
                  {vehicle.secondaryDamage && (
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Daño Secundario:</span>
                      <span className="font-medium text-secondary-900">{vehicle.secondaryDamage}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Condición:</span>
                    <span className="font-medium text-secondary-900">{vehicle.condition}</span>
                  </div>
                </div>
              </div>

              {/* Auction Info */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-secondary-900 mb-3">Información de Subasta</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Casa de Subasta:</span>
                    <span className="font-medium text-primary-600">{vehicle.auctionHouse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Número de Lote:</span>
                    <span className="font-medium text-secondary-900">{vehicle.lot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Fecha de Subasta:</span>
                    <span className="font-medium text-secondary-900">
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