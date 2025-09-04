import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Calendar, Eye, FileText } from 'lucide-react';
import { mockReports } from '../data/mockData';
import { PurchaseReport } from '../types';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<PurchaseReport | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'At Port':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Pending':
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  const totalInvestment = mockReports.reduce((sum, report) => {
    return sum + Object.values(report.costs).reduce((costSum, cost) => costSum + cost, 0);
  }, 0);

  const totalProfit = mockReports.reduce((sum, report) => {
    return sum + (report.profit || 0);
  }, 0);

  const avgProfitMargin = mockReports.length > 0 
    ? (totalProfit / totalInvestment) * 100 
    : 0;

  const completedDeals = mockReports.filter(report => report.status === 'Delivered').length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Informes y Análisis
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Seguimiento detallado de tus inversiones y resultados
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Inversión Total</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
              <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Ganancia Total</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalProfit)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Margen Promedio</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{avgProfitMargin.toFixed(1)}%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Deals Completados</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{completedDeals}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Historial de Compras</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Vehículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Costo Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Ganancia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {mockReports.map((report) => {
                const totalCost = Object.values(report.costs).reduce((sum, cost) => sum + cost, 0);
                return (
                  <tr key={report.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {report.vehicle.year} {report.vehicle.make} {report.vehicle.model}
                        </p>
                        <p className="text-sm text-neutral-500">VIN: {report.vehicle.vin}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-900 dark:text-white">
                          {new Date(report.purchaseDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(totalCost)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {report.profit !== undefined ? (
                        <span className={`font-medium ${report.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {formatCurrency(report.profit)}
                        </span>
                      ) : (
                        <span className="text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 bg-white p-6 shadow-lg duration-200 sm:rounded-lg dark:border-neutral-800 dark:bg-neutral-950 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Informe Detallado - {selectedReport.vehicle.year} {selectedReport.vehicle.make} {selectedReport.vehicle.model}
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-neutral-950 dark:focus:ring-neutral-300"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                ID: {selectedReport.id}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Cost Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Desglose de Costos</h3>
                <div className="space-y-2">
                  {Object.entries(selectedReport.costs).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      auctionPrice: 'Precio de Subasta',
                      auctionFees: 'Comisiones de Subasta',
                      transportationLand: 'Transporte Terrestre',
                      transportationMaritime: 'Transporte Marítimo',
                      importFees: 'Gastos de Importación',
                      customsDuties: 'Aranceles',
                      documentationFees: 'Documentación',
                      insuranceFees: 'Seguro',
                      storageFees: 'Almacenamiento',
                      otherFees: 'Otros Gastos'
                    };
                    
                    return (
                      <div key={key} className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-800">
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{labels[key]}:</span>
                        <span className="font-medium text-neutral-900 dark:text-white">{formatCurrency(value)}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between py-3 border-t-2 border-primary-200 dark:border-primary-800 font-semibold text-lg">
                    <span className="text-neutral-900 dark:text-white">Total:</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      {formatCurrency(Object.values(selectedReport.costs).reduce((sum, cost) => sum + cost, 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Resumen Financiero</h3>
                <div className="rounded-lg bg-primary-50 dark:bg-primary-950/20 p-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Costo Total:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(Object.values(selectedReport.costs).reduce((sum, cost) => sum + cost, 0))}
                      </span>
                    </div>
                    {selectedReport.salePrice && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Precio de Venta:</span>
                        <span className="font-medium text-neutral-900 dark:text-white">
                          {formatCurrency(selectedReport.salePrice)}
                        </span>
                      </div>
                    )}
                    {selectedReport.profit !== undefined && (
                      <div className="flex justify-between pt-2 border-t border-primary-200 dark:border-primary-800">
                        <span className="text-neutral-600 dark:text-neutral-400">Ganancia:</span>
                        <span className={`font-bold text-lg ${selectedReport.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {formatCurrency(selectedReport.profit)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4">
                  <h4 className="font-medium text-neutral-900 dark:text-white mb-3">Detalles del Vehículo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Casa de Subasta:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{selectedReport.vehicle.auctionHouse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Lote:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{selectedReport.vehicle.lot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Ubicación:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{selectedReport.vehicle.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Condición:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{selectedReport.vehicle.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Daño:</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{selectedReport.vehicle.damage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;