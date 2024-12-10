import React, { useState } from 'react';
import { Search, Filter, Building2, Package, Percent, Download, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calculateLocalContent } from '../../utils/localContent';
import { mockSuppliers } from '../../data/mockSuppliers';
import { productionMaterials } from '../../data/mockProduction';

export default function LocalContentAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const stats = calculateLocalContent(mockSuppliers, productionMaterials);

  const mandatoryCategories = [
    { name: 'المواد الأولية', target: 40, current: 45 },
    { name: 'المعدات والآلات', target: 25, current: 30 },
    { name: 'قطع الغيار', target: 30, current: 28 },
    { name: 'الخدمات', target: 50, current: 55 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تحليل المحتوى المحلي</h2>
          <p className="mt-1 text-sm text-gray-500">
            تحليل تفصيلي لنسب المحتوى المحلي حسب الفئات
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير التحليل
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Calculator className="w-4 h-4 ml-2" />
            احتساب المحتوى المحلي
          </button>
        </div>
      </div>

      {/* Mandatory Categories Progress */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">القائمة الإلزامية - نسب الإنجاز</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mandatoryCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    category.current >= category.target ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {category.current >= category.target ? (
                      <CheckCircle2 className={`w-5 h-5 ${
                        category.current >= category.target ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="mr-3">
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-gray-500">المستهدف: {category.target}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    category.current >= category.target ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {category.current}%
                  </p>
                  <p className="text-xs text-gray-500">النسبة الحالية</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    category.current >= category.target ? 'bg-green-600' : 'bg-yellow-600'
                  }`}
                  style={{ width: `${category.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">تحليل المواد</h3>
        <div className="grid gap-6">
          {stats.materialAnalysis.map((material, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-blue-600 ml-3" />
                  <div>
                    <h4 className="font-medium">{material.name}</h4>
                    <p className="text-sm text-gray-500">{material.origin}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{material.localContent}%</p>
                  <p className="text-xs text-gray-500">محتوى محلي</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${material.localContent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">تحليل الموردين</h3>
        <div className="grid gap-6">
          {stats.supplierAnalysis.map((supplier, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-green-600 ml-3" />
                  <div>
                    <h4 className="font-medium">{supplier.name}</h4>
                    <p className="text-sm text-gray-500">
                      {supplier.type === 'local' ? 'مورد محلي' : 'مورد دولي'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{supplier.contribution}%</p>
                  <p className="text-xs text-gray-500">نسبة المساهمة</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    supplier.type === 'local' ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${supplier.contribution}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}