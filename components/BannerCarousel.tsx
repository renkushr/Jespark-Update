
import React, { useState, useEffect } from 'react';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  color: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    title: 'ฉลองเปิดตัว Jespark Pro',
    subtitle: 'รับคะแนนเพิ่ม x2 สำหรับทุกการแลกรางวัลเครื่องใช้ไฟฟ้าในเดือนนี้เท่านั้น',
    image: '/mask-group-4.png',
    cta: 'ดูรายละเอียด',
    color: 'from-[#51B677] to-[#3a8e57]'
  },
  {
    id: 2,
    title: 'แลกตั๋วเครื่องบินสุดคุ้ม',
    subtitle: 'ใช้คะแนน Jespark บินลัดฟ้าสู่ญี่ปุ่นและยุโรป พร้อมรับสิทธิ์เข้า Lounge ฟรี',
    image: '/mask-group-4.png',
    cta: 'เช็คเส้นทางบิน',
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 3,
    title: 'สิทธิพิเศษระดับ Platinum',
    subtitle: 'อัปเกรดระดับสมาชิกวันนี้ เพื่อรับบริการผู้ช่วยส่วนตัวและคูปองส่วนลดพิเศษ',
    image: '/mask-group-4.png',
    cta: 'อัปเกรดเลย',
    color: 'from-purple-600 to-indigo-600'
  }
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 group">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              className="w-full h-full object-cover" 
              alt={slide.title} 
            />
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-85 mix-blend-multiply`}></div>
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white z-10">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit border border-white/20">
                ข่าวสารล่าสุด
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className="text-white/80 text-sm md:text-lg mb-8 max-w-xl">
                {slide.subtitle}
              </p>
              <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm md:text-base hover:scale-105 transition-transform active:scale-95 w-fit shadow-xl">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === i ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button 
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
};

export default BannerCarousel;
