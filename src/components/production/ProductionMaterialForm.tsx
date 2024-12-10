import React from 'react';
import { X, Package, Scale, Ruler } from 'lucide-react';
import type { ProductionMaterial, MaterialType, MaterialSize, CementType, FiberType, ConcreteType } from '../../types/production';

interface ProductionMaterialFormProps {
  onSubmit: (data: Omit<ProductionMaterial, 'id'>) => void;
  onClose: () => void;
}

export default function ProductionMaterialForm({ onSubmit, onClose }: ProductionMaterialFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const specifications: ProductionMaterial['specifications'] = {};
    
    // Add cement type if selected
    const cementType = formData.get('cementType');
    if (cementType) specifications.cementType = cementType as CementType;
    
    // Add fiber type if selected
    const fiberType = formData.get('fiberType');
    if (fiberType) specifications.fiberType = fiberType as FiberType;
    
    // Add concrete type if selected
    const concreteType = formData.get('concreteType');
    if (concreteType) specifications.concreteType = concreteType as ConcreteType;
    
    // Add other specifications
    const grade = formData.get('grade');
    if (grade) specifications.grade = grade as string;
    
    const strength = formData.get('strength');
    if (strength) specifications.strength = strength as string;
    
    const composition = formData.get('composition');
    if (composition) specifications.composition = composition as string;
    
    const mixRatio = formData.get('mixRatio');
    if (mixRatio) specifications.mixRatio = mixRatio as string;
    
    const waterContent = formData.get('waterContent');
    if (waterContent) specifications.waterContent = waterContent as string;

    onSubmit({
      name: formData.get('name') as string,
      type: formData.get('type') as MaterialType,
      size: formData.get('size') as MaterialSize,
      density: Number(formData.get('density')),
      stockQuantity: Number(formData.get('stockQuantity')),
      unit: formData.get('unit') as string,
      location: formData.get('location') as string,
      specifications: Object.keys(specifications).length > 0 ? specifications : undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-blue-600 ml-2" />
            <div>
              <h2 className="text-xl font-semibold">إضافة منتج جديد</h2>
              <p className="text-sm text-gray-500">إضافة منتج جديد إلى مخزون الإنتاج</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">النوع</label>
              <select
                name="type"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="crushed-rock">الركام الخشن</option>
                <option value="sand">الركام الناعم</option>
                <option value="stone-dust">الغبار الحجري</option>
                <option value="granular">مواد التربة الحبيبية</option>
                <option value="cement">الأسمنت</option>
                <option value="admixture">الإضافات الخرسانية</option>
                <option value="fiber">الألياف</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">المقاس</label>
              <select
                name="size"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر المقاس</option>
                <option value="40mm">40 مم - للأساسات</option>
                <option value="20mm">20 مم - للخرسانة المسلحة</option>
                <option value="10mm">10 مم - للخرسانة الدقيقة</option>
                <option value="5mm">5 مم - للطبقات السطحية</option>
                <option value="fine">رمل ناعم</option>
                <option value="coarse">رمل خشن</option>
                <option value="dust">غبار حجري</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الكثافة (جم/سم³)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="density"
                  required
                  step="0.1"
                  min="0"
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Scale className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الكمية</label>
              <input
                type="number"
                name="stockQuantity"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">وحدة القياس</label>
              <select
                name="unit"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="طن">طن</option>
                <option value="متر مكعب">متر مكعب</option>
                <option value="كيلوجرام">كيلوجرام</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">موقع التخزين</label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">المواصفات الإضافية</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">نوع الأسمنت</label>
                  <select
                    name="cementType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">اختر النوع</option>
                    <option value="OPC">بورتلاندي عادي</option>
                    <option value="SRC">مقاوم للكبريتات</option>
                    <option value="PPC">بوزولاني</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">نوع الألياف</label>
                  <select
                    name="fiberType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">اختر النوع</option>
                    <option value="steel">فولاذية</option>
                    <option value="plastic">بلاستيكية</option>
                    <option value="glass">زجاجية</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">نوع الخرسانة</label>
                  <select
                    name="concreteType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">اختر النوع</option>
                    <option value="normal">عادية</option>
                    <option value="reinforced">مسلحة</option>
                    <option value="high-strength">عالية المقاومة</option>
                    <option value="self-compacting">ذاتية الدمك</option>
                    <option value="lightweight">خفيفة الوزن</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الدرجة/القوة</label>
                  <input
                    type="text"
                    name="grade"
                    placeholder="مثال: 30 MPa"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">نسبة الخلط</label>
                  <input
                    type="text"
                    name="mixRatio"
                    placeholder="مثال: 1:2:4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">محتوى الماء</label>
                  <input
                    type="text"
                    name="waterContent"
                    placeholder="مثال: 0.45"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              إضافة المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}