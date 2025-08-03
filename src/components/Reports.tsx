import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Calendar, Eye } from 'lucide-react';
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
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'At Port':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-primary-500 p-3 rounded-lg">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Informes y Análisis</h1>
          <p className="text-secondary-600">Seguimiento detallado de compras e inversiones</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-600 text-sm">Inversión Total</p>
              <p className="text-2xl font-bold text-secondary-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-600 text-sm">Ganancia Total</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalProfit)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-600 text-sm">Margen Promedio</p>
              <p className="text-2xl font-bold text-blue-600">{avgProfitMargin.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-600 text-sm">Deals Completados</p>
              <p className="text-2xl font-bold text-purple-600">{completedDeals}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">Historial de Compras</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Vehículo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Costo Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Ganancia</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {mockReports.map((report) => {
                const totalCost = Object.values(report.costs).reduce((sum, cost) => sum + cost, 0);
                return (
                  <tr key={report.id} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-900">
                          {report.vehicle.year} {report.vehicle.make} {report.vehicle.model}
                        </p>
                        <p className="text-sm text-secondary-600">VIN: {report.vehicle.vin}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-secondary-500" />
                        <span className="text-secondary-900">
                          {new Date(report.purchaseDate).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-secondary-900">
                        {formatCurrency(totalCost)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {report.profit !== undefined ? (
                        <span className={`font-semibold ${report.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(report.profit)}
                        </span>
                      ) : (
                        <span className="text-secondary-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Ver detalles</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-secondary-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900">
                    Informe Detallado - {selectedReport.vehicle.year} {selectedReport.vehicle.make} {selectedReport.vehicle.model}
                  </h2>
                  <p className="text-secondary-600">ID: {selectedReport.id}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-secondary-500 hover:text-secondary-700"
                >
                  <Eye className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Cost Breakdown */}
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">Desglose de Costos</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Precio de Subasta:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.auctionPrice)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Comisiones de Subasta:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.auctionFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Transporte Terrestre:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.transportationLand)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Transporte Marítimo:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.transportationMaritime)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Gastos de Importación:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.importFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Aranceles:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.customsDuties)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Documentación:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.documentationFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Seguro:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.insuranceFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Almacenamiento:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.storageFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-secondary-100">
                      <span className="text-secondary-600">Otros Gastos:</span>
                      <span className="font-semibold">{formatCurrency(selectedReport.costs.otherFees)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t-2 border-primary-200 font-bold text-lg">
                      <span className="text-secondary-900">Total:</span>
                      <span className="text-primary-600">
                        {formatCurrency(Object.values(selectedReport.costs).reduce((sum, cost) => sum + cost, 0))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">Resumen Financiero</h3>
                  <div className="bg-primary-50 rounded-lg p-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Costo Total:</span>
                        <span className="font-semibold text-secondary-900">
                          {formatCurrency(Object.values(selectedReport.costs).reduce((sum, cost) => sum + cost, 0))}
                        </span>
                      </div>
                      {selectedReport.salePrice && (
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Precio de Venta:</span>
                          <span className="font-semibold text-secondary-900">
                            {formatCurrency(selectedReport.salePrice)}
                          </span>
                        </div>
                      )}
                      {selectedReport.profit !== undefined && (
                        <div className="flex justify-between pt-2 border-t border-primary-200">
                          <span className="text-secondary-600">Ganancia:</span>
                          <span className={`font-bold text-lg ${selectedReport.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(selectedReport.profit)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <h4 className="font-semibold text-secondary-900 mb-3">Detalles del Vehículo</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Casa de Subasta:</span>
                        <span className="font-medium">{selectedReport.vehicle.auctionHouse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Lote:</span>
                        <span className="font-medium">{selectedReport.vehicle.lot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Ubicación:</span>
                        <span className="font-medium">{selectedReport.vehicle.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Condición:</span>
                        <span className="font-medium">{selectedReport.vehicle.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Daño:</span>
                        <span className="font-medium">{selectedReport.vehicle.damage}</span>
                      </div>
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