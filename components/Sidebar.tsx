
import React, { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LogoComponent: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#51B677] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#51B677]/20">J</div>
        <span className="text-2xl font-black text-gray-800 tracking-tight">Jes<span className="text-[#51B677]">park</span></span>
      </div>
    );
  }

  return (
    <img 
      src="/jespark-logo.png" 
      alt="Jespark Logo" 
      className="h-10 w-auto object-contain"
      onError={() => setImageError(true)}
    />
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'หน้าหลัก', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    )},
    { id: 'dashboard', label: 'ข้อมูลวิเคราะห์', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    )},
    { id: 'rewards', label: 'แคตตาล็อกรางวัล', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
    )},
    { id: 'history', label: 'ประวัติกิจกรรม', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
    )},
    { id: 'profile', label: 'โปรไฟล์ของฉัน', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
    )},
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full fixed left-0 top-0 hidden lg:flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <LogoComponent />
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-[#51B677]/10 text-[#51B677] font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-gray-100">
        <div className="bg-[#51B677]/5 rounded-2xl p-4 text-center">
          <p className="text-sm font-medium text-[#51B677] mb-2">ต้องการคะแนน Jespark เพิ่มไหม?</p>
          <button className="w-full bg-[#51B677] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#45a368] transition-colors">
            แนะนำเพื่อนเลย
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
