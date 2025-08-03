import React, { useState } from 'react';
import { Calculator, DollarSign, Truck, Ship, FileText, Shield } from 'lucide-react';
import { CostBreakdown } from '../types';

const CostCalculator: React.FC = () => {
  const [costs, setCosts] = useState<CostBreakdown>({
    auctionPrice: 0,
    auctionFees: 0,
    transportationLand: 0,
    transportationMaritime: 0,
    importFees: 0,
    customsDuties: 0,
    documentationFees: 0,
    insuranceFees: 0,
    storageFees: 0,
    otherFees: 0
  });

  const [vehicleValue, setVehicleValue] = useState(0);

  const updateCost = (field: keyof CostBreakdown, value: number) => {
    setCosts(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Auto-calculate auction fees (typically 5% of auction price)
  React.useEffect(() => {
    if (costs.auctionPrice > 0) {
      const calculatedFees = costs.auctionPrice * 0.05;
      if (costs.auctionFees !== calculatedFees) {
        setCosts(prev => ({
          ...prev,
          auctionFees: calculatedFees
        }));
      }
    }
  }, [costs.auctionPrice]);

  // Auto-calculate customs duties (typically 15% of auction price)
  React.useEffect(() => {
    if (costs.auctionPrice > 0) {
      const calculatedDuties = costs.auctionPrice * 0.15;
      if (costs.customsDuties !== calculatedDuties) {
        setCosts(prev => ({
          ...prev,
          customsDuties: calculatedDuties
        }));
      }
    }
  }, [costs.auctionPrice]);

  const totalCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
  const potentialProfit = vehicleValue - totalCost;
  const profitMargin = vehicleValue > 0 ? (potentialProfit / vehicleValue) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const costCategories = [
    {
      title: 'Costos de Subasta',
      icon: DollarSign,
      color: 'primary',
      items: [
        { key: 'auctionPrice', label: 'Precio de Subasta', value: costs.auctionPrice },
        { key: 'auctionFees', label: 'Comisiones de Subasta (5%)', value: costs.auctionFees, calculated: true }
      ]
    },
    {
      title: 'Transporte',
      icon: Truck,
      color: 'blue',
      items: [
        { key: 'transportationLand', label: 'Transporte Terrestre', value: costs.transportationLand },
        { key: 'transportationMaritime', label: 'Transporte Marítimo', value: costs.transportationMaritime }
      ]
    },
    {
      title: 'Importación',
      icon: Ship,
      color: 'green',
      items: [
        { key: 'importFees', label: 'Gastos de Importación', value: costs.importFees },
        { key: 'customsDuties', label: 'Aranceles (15%)', value: costs.customsDuties, calculated: true }
      ]
    },
    {
      title: 'Otros Gastos',
      icon: FileText,
      color: 'purple',
      items: [
        { key: 'documentationFees', label: 'Documentación', value: costs.documentationFees },
        { key: 'insuranceFees', label: 'Seguro', value: costs.insuranceFees },
        { key: 'storageFees', label: 'Almacenamiento', value: costs.storageFees },
        { key: 'otherFees', label: 'Otros Gastos', value: costs.otherFees }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-50 border-primary-200 text-primary-700';
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      default:
        return 'bg-secondary-50 border-secondary-200 text-secondary-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-primary-500 p-3 rounded-lg">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Calculadora de Costos</h1>
          <p className="text-secondary-600">Calcula el costo total de importación de vehículos</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cost Input Forms */}
        <div className="lg:col-span-2 space-y-6">
          {costCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className={`border-2 rounded-xl p-6 ${getColorClasses(category.color)}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="h-6 w-6" />
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium mb-2">
                        {item.label}
                        {item.calculated && <span className="text-xs ml-1">(Auto-calculado)</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">$</span>
                        <input
                          type="number"
                          value={item.value}
                          onChange={(e) => updateCost(item.key as keyof CostBreakdown, parseFloat(e.target.value) || 0)}
                          className={`w-full pl-8 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            item.calculated ? 'bg-secondary-100 cursor-not-allowed' : 'bg-white'
                          }`}
                          placeholder="0"
                          readOnly={item.calculated}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Vehicle Sale Value */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-700" />
              <h2 className="text-xl font-bold text-green-700">Valor de Venta Estimado</h2>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">$</span>
              <input
                type="number"
                value={vehicleValue}
                onChange={(e) => setVehicleValue(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                placeholder="Precio de venta esperado"
              />
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* Cost Summary */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">Resumen de Costos</h3>
            <div className="space-y-3">
              {costCategories.map((category) => {
                const categoryTotal = category.items.reduce((sum, item) => sum + item.value, 0);
                return (
                  <div key={category.title} className="flex justify-between">
                    <span className="text-secondary-600">{category.title}:</span>
                    <span className="font-semibold text-secondary-900">
                      {formatCurrency(categoryTotal)}
                    </span>
                  </div>
                );
              })}
              <div className="border-t border-secondary-200 pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-secondary-900">Costo Total:</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profit Analysis */}
          {vehicleValue > 0 && (
            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Análisis de Rentabilidad</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Precio de Venta:</span>
                  <span className="font-semibold text-secondary-900">
                    {formatCurrency(vehicleValue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Costo Total:</span>
                  <span className="font-semibold text-secondary-900">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <div className="border-t border-secondary-200 pt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-secondary-900">Ganancia:</span>
                    <span className={`font-bold ${potentialProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(potentialProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-secondary-600">Margen:</span>
                    <span className={`font-semibold ${profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Profit Indicator */}
              <div className="mt-4">
                <div className={`p-3 rounded-lg ${
                  potentialProfit >= 5000 
                    ? 'bg-green-100 text-green-800' 
                    : potentialProfit >= 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <p className="text-sm font-medium">
                    {potentialProfit >= 5000 
                      ? '✅ Excelente oportunidad de inversión' 
                      : potentialProfit >= 0 
                      ? '⚠️ Ganancia marginal - evaluar riesgos' 
                      : '❌ Pérdida potencial - no recomendado'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;