import React, { useState } from 'react';

const LogoComponent: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-[#51B677] rounded-lg flex items-center justify-center text-white font-bold text-lg">J</div>
        <span className="text-xl font-black text-gray-800 tracking-tight">Jes<span className="text-[#51B677]">park</span></span>
      </div>
    );
  }

  return (
    <img 
      src="/jespark-logo.png" 
      alt="Jespark Logo" 
      className="h-8 w-auto object-contain"
      onError={() => setImageError(true)}
    />
  );
};

const Footer: React.FC = () => {
  const features = [
    {
      title: 'Health Reward Exchange',
      description: 'สะสมแต้มจากการใช้บริการดานสุขภาพ และนำมาแลกกับสินค้า หรือสิทธิประโยชน์ต่าง ๆ ได้ง่ายในที่เดียว'
    },
    {
      title: 'Curated Health Products',
      description: 'คัดสรรสินค้าและบริการด้านสุขภาพที่ได้ มาตรฐาน เพื่อให้ผู้ใช้แลก Reward ได้อย่างมั่นใจ'
    },
    {
      title: 'Digital Health Experience',
      description: 'ประสบการณใชงานที่ออกแบบด้วยแนวคิด ด้านสุขภาพ ใช้งานง่ายทั้งมือถือและเดสก​์ทอป'
    },
    {
      title: 'Secure & Transparent',
      description: 'ระบบจัดการ Reward ที่ชัดเจน โปร่งใส และให้ความสำคัญกับความปลอดภัยของผู้ใช้งาน'
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="px-4 sm:px-8 lg:px-10 py-12 lg:ml-64">
        {/* Description */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 text-base leading-relaxed max-w-4xl mx-auto">
            แพลตฟอร์มสุขภาพสำหรับการสะสมและแลก Reward เพื่อรับสินค้าและบริการด้านสุขภาพอย่างคุ้มค่า
          </p>
        </div>

        {/* 4 Column Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center lg:text-left">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <LogoComponent />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#51B677] transition-colors font-medium">เกี่ยวกับเรา</a>
              <a href="#" className="hover:text-[#51B677] transition-colors font-medium">ติดต่อเรา</a>
              <a href="#" className="hover:text-[#51B677] transition-colors font-medium">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-[#51B677] transition-colors font-medium">ข้อกำหนดการใช้งาน</a>
            </div>
            <div className="text-xs text-gray-400 font-medium">
              © {new Date().getFullYear()} Jespark. สงวนลิขสิทธิ์
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

