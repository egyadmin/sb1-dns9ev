import React from 'react';
import { FileText, AlertTriangle, CheckCircle2, Info, Download, Book, Users, Truck, Scale } from 'lucide-react';

export default function MandatoryList() {
  const mandatoryInfo = [
    {
      title: 'تعريف القائمة الإلزامية',
      content: `القائمة الإلزامية هي قائمة المنتجات والخدمات التي يجب شراؤها من موردين محليين معتمدين.
                تم إعداد هذه القائمة من قبل هيئة المحتوى المحلي والمشتريات الحكومية لتعزيز المحتوى المحلي
                في المملكة العربية السعودية وتحقيق أهداف رؤية 2030.`,
      icon: Info,
      color: 'blue'
    },
    {
      title: 'دور الأطراف المعنية',
      content: `الجهات الحكومية:
                - مراقبة الامتثال للقائمة الإلزامية
                - التحقق من شهادات المنشأ
                - تطبيق العقوبات على المخالفين

                الموردون المحليون:
                - توفير المنتجات والخدمات وفق المعايير المطلوبة
                - الحصول على الشهادات اللازمة
                - الالتزام بمتطلبات الجودة

                المشترون:
                - الالتزام بالشراء من الموردين المحليين المعتمدين
                - توثيق عمليات الشراء
                - تقديم التقارير الدورية`,
      icon: Users,
      color: 'green'
    },
    {
      title: 'تعليمات تسليم المنتجات الوطنية',
      content: `1. التحقق من شهادات المنشأ السعودي
                2. مطابقة المواصفات الفنية المطلوبة
                3. توثيق سلسلة التوريد بالكامل
                4. الاحتفاظ بسجلات المنشأ والجودة
                5. تقديم تقارير الامتثال الدورية
                6. الالتزام بمعايير التغليف والشحن`,
      icon: Truck,
      color: 'purple'
    },
    {
      title: 'ضوابط الاستثناء من القائمة الإلزامية',
      content: `يمكن طلب استثناء في الحالات التالية:
                - عدم توفر المنتج محلياً
                - عدم مطابقة المواصفات الفنية المطلوبة
                - حالات الطوارئ والقوة القاهرة
                - وجود فرق سعري يتجاوز 25%
                - عدم قدرة الموردين المحليين على تلبية الطلب`,
      icon: Scale,
      color: 'yellow'
    }
  ];

  const penalties = [
    {
      violation: 'عدم الالتزام بالشراء من الموردين المحليين',
      penalty: 'غرامة تصل إلى 10% من قيمة المشتريات المخالفة',
      details: 'تطبق على كل عملية شراء مخالفة بشكل منفصل'
    },
    {
      violation: 'تقديم معلومات غير صحيحة',
      penalty: 'غرامة مالية وتعليق التعامل',
      details: 'تعليق التعامل لمدة تصل إلى 6 أشهر'
    },
    {
      violation: 'عدم الإفصاح عن المعلومات المطلوبة',
      penalty: 'إنذار وغرامة مالية',
      details: 'غرامة تصل إلى 100,000 ريال'
    },
    {
      violation: 'تكرار المخالفات',
      penalty: 'مضاعفة الغرامات وإيقاف التراخيص',
      details: 'إيقاف الترخيص لمدة تصل إلى سنة'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">القائمة الإلزامية</h2>
          <p className="mt-1 text-sm text-gray-500">
            معلومات وتعليمات القائمة الإلزامية للمحتوى المحلي
          </p>
        </div>
        <button
          onClick={() => {}}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="w-4 h-4 ml-2" />
          تحميل القائمة الكاملة
        </button>
      </div>

      {/* Main Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mandatoryInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className={`p-2 bg-${info.color}-50 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${info.color}-600`} />
                </div>
                <h3 className="text-lg font-medium">{info.title}</h3>
              </div>
              <div className="prose prose-sm max-w-none">
                {info.content.split('\n').map((line, i) => (
                  <p key={i} className="text-gray-600 whitespace-pre-line">
                    {line.trim()}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Penalties Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-6">الغرامات والعقوبات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {penalties.map((item, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 ml-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-900">{item.violation}</h4>
                  <p className="mt-1 text-sm text-red-700">{item.penalty}</p>
                  <p className="mt-1 text-xs text-red-600">{item.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">موارد إضافية</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Book className="w-5 h-5 text-blue-600 ml-3" />
            <span className="text-blue-900">دليل الامتثال</span>
          </button>
          <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="w-5 h-5 text-green-600 ml-3" />
            <span className="text-green-900">نماذج التقارير</span>
          </button>
          <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-purple-600 ml-3" />
            <span className="text-purple-900">قائمة التحقق</span>
          </button>
        </div>
      </div>
    </div>
  );
}