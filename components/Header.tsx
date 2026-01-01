
import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const LogoComponent: React.FC<{ height?: string }> = ({ height = "h-8" }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center gap-2">
        <div className={`${height} aspect-square bg-[#51B677] rounded-lg flex items-center justify-center text-white font-bold text-lg`}>J</div>
        <span className="text-xl font-black text-gray-800 tracking-tight">Jes<span className="text-[#51B677]">park</span></span>
      </div>
    );
  }

  return (
    <img 
      src="/jespark-logo.png" 
      alt="Jespark Logo" 
      className={`${height} w-auto object-contain`}
      onError={() => setImageError(true)}
    />
  );
};

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Logo - Visible on mobile when sidebar is hidden */}
      <div className="flex items-center gap-2 lg:hidden">
        <LogoComponent height="h-8" />
      </div>

      {/* Placeholder for desktop when sidebar is present (left alignment) */}
      <div className="hidden lg:block w-48">
        <div className="flex items-center gap-2 opacity-0 pointer-events-none">
          <LogoComponent height="h-8" />
        </div>
      </div>

      {/* Search Bar - Middle */}
      <div className="flex-1 max-w-xl relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 group-focus-within:text-[#51B677] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="ค้นหารางวัล, กิจกรรม หรือความช่วยเหลือ..."
          className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#51B677]/20 focus:bg-white transition-all"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Auth Buttons - Right */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
          เข้าสู่ระบบ
        </button>
        <button className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#51B677] to-[#3a8e57] text-white font-bold text-sm rounded-full hover:shadow-lg hover:shadow-[#51B677]/20 transition-all active:scale-95 whitespace-nowrap">
          สมัครสมาชิก
        </button>
      </div>
    </header>
  );
};

export default Header;
