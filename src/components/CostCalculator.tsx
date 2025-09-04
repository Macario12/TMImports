import React, { useState } from 'react';
import { Calculator, DollarSign, Truck, Ship, FileText, Shield, TrendingUp } from 'lucide-react';
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
      items: [
        { key: 'auctionPrice', label: 'Precio de Subasta', value: costs.auctionPrice },
        { key: 'auctionFees', label: 'Comisiones (5%)', value: costs.auctionFees, calculated: true }
      ]
    },
    {
      title: 'Transporte',
      icon: Truck,
      items: [
        { key: 'transportationLand', label: 'Transporte Terrestre', value: costs.transportationLand },
        { key: 'transportationMaritime', label: 'Transporte Marítimo', value: costs.transportationMaritime }
      ]
    },
    {
      title: 'Importación',
      icon: Ship,
      items: [
        { key: 'importFees', label: 'Gastos de Importación', value: costs.importFees },
        { key: 'customsDuties', label: 'Aranceles (15%)', value: costs.customsDuties, calculated: true }
      ]
    },
    {
      title: 'Otros Gastos',
      icon: FileText,
      items: [
        { key: 'documentationFees', label: 'Documentación', value: costs.documentationFees },
        { key: 'insuranceFees', label: 'Seguro', value: costs.insuranceFees },
        { key: 'storageFees', label: 'Almacenamiento', value: costs.storageFees },
        { key: 'otherFees', label: 'Otros Gastos', value: costs.otherFees }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Calculadora de Costos
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Calcula el costo total de importación de tu vehículo
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cost Input Forms */}
        <div className="lg:col-span-2 space-y-6">
          {costCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{category.title}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        {item.label}
                        {item.calculated && <span className="text-xs ml-1 text-neutral-500">(Auto-calculado)</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                        <input
                          type="number"
                          value={item.value}
                          onChange={(e) => updateCost(item.key as keyof CostBreakdown, parseFloat(e.target.value) || 0)}
                          className={`flex h-9 w-full rounded-md border border-neutral-200 bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400 ${
                            item.calculated ? 'bg-neutral-50 dark:bg-neutral-900' : ''
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
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/20">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h2 className="text-lg font-semibold text-green-900 dark:text-green-100">Valor de Venta Estimado</h2>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
              <input
                type="number"
                value={vehicleValue}
                onChange={(e) => setVehicleValue(parseFloat(e.target.value) || 0)}
                className="flex h-9 w-full rounded-md border border-neutral-200 bg-white pl-8 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-green-400"
                placeholder="Precio de venta esperado"
              />
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* Cost Summary */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Resumen de Costos</h3>
            <div className="space-y-3">
              {costCategories.map((category) => {
                const categoryTotal = category.items.reduce((sum, item) => sum + item.value, 0);
                return (
                  <div key={category.title} className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">{category.title}:</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(categoryTotal)}
                    </span>
                  </div>
                );
              })}
              <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-white">Costo Total:</span>
                  <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profit Analysis */}
          {vehicleValue > 0 && (
            <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Análisis de Rentabilidad</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Precio de Venta:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(vehicleValue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Costo Total:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900 dark:text-white">Ganancia:</span>
                    <span className={`font-bold text-lg ${potentialProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {formatCurrency(potentialProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Margen:</span>
                    <span className={`font-medium ${profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Profit Indicator */}
              <div className="mt-4">
                <div className={`rounded-md p-3 text-sm ${
                  potentialProfit >= 5000 
                    ? 'bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
                    : potentialProfit >= 0 
                    ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400' 
                    : 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                }`}>
                  <p className="font-medium">
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