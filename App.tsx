
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import RewardCard from './components/RewardCard';
import AIChat from './components/AIChat';
import BannerCarousel from './components/BannerCarousel';
import CategoryBar, { CategoryItem } from './components/CategoryBar';
import { MOCK_USER, MOCK_REWARDS, MOCK_TRANSACTIONS, PRIMARY_COLOR } from './constants';
import { Reward } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(MOCK_USER);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const categories: CategoryItem[] = [
    { id: 'all', label: 'ทั้งหมด', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg> },
    { id: 'elec', label: 'เครื่องใช้ไฟฟ้า', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
    { id: 'vouch', label: 'บัตรกำนัล', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg> },
    { id: 'life', label: 'ไลฟ์สไตล์', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg> },
    { id: 'travel', label: 'การเดินทาง', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  ];

  const categoryMap: Record<string, string> = {
    'ทั้งหมด': 'All',
    'เครื่องใช้ไฟฟ้า': 'Electronics',
    'บัตรกำนัล': 'Vouchers',
    'ไลฟ์สไตล์': 'Lifestyle',
    'การเดินทาง': 'Travel'
  };

  const handleRedeem = (reward: Reward) => {
    if (user.availablePoints >= reward.points) {
      if (confirm(`ยืนยันการแลกรางวัล ${reward.name} โดยใช้ ${reward.points} คะแนน?`)) {
        setUser(prev => ({
          ...prev,
          availablePoints: prev.availablePoints - reward.points
        }));
        alert("แลกของรางวัลสำเร็จ! โปรดตรวจสอบรายละเอียดในอีเมลของคุณ");
      }
    }
  };

  const handleCategorySelect = (label: string) => {
    setSelectedCategory(label);
    if (activeTab !== 'rewards') {
      setActiveTab('rewards');
    }
  };

  const filteredRewards = MOCK_REWARDS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const mappedCategory = categoryMap[selectedCategory];
    const matchesCategory = mappedCategory === 'All' || r.category === mappedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedRewards = MOCK_REWARDS.filter(r => r.points >= 5000).slice(0, 3);
  const electronicsRewards = MOCK_REWARDS.filter(r => r.category === 'Electronics');
  const voucherRewards = MOCK_REWARDS.filter(r => r.category === 'Vouchers');
  const lifestyleRewards = MOCK_REWARDS.filter(r => r.category === 'Lifestyle');

  const chartData = [
    { name: 'จ.', points: 12000 },
    { name: 'อ.', points: 12200 },
    { name: 'พ.', points: 12100 },
    { name: 'พฤ.', points: 12500 },
    { name: 'ศ.', points: 12850 },
  ];

  const RewardGroup = ({ title, rewards }: { title: string, rewards: Reward[] }) => (
    <section className="pt-4 border-t border-gray-100 last:border-b-0">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#51B677] rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <button onClick={() => { setSelectedCategory(title); setActiveTab('rewards'); }} className="text-[#51B677] text-sm font-bold hover:underline">
          ดูทั้งหมด
        </button>
      </div>
      
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar">
        {rewards.length > 0 ? (
          rewards.map(reward => (
            <div key={reward.id} className="min-w-[80vw] sm:min-w-[320px] md:min-w-0 snap-center">
              <RewardCard 
                reward={reward} 
                userPoints={user.availablePoints}
                onRedeem={handleRedeem}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full w-full py-16 text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">ไม่พบรางวัลในหมวดหมู่นี้</p>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header searchTerm={searchTerm} onSearch={setSearchTerm} />

        {/* Global Category Sub-Header */}
        {(activeTab === 'home' || activeTab === 'rewards') && (
          <div className="sticky top-[73px] z-30 bg-[#f9fafb]/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-2">
            <CategoryBar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={handleCategorySelect} 
            />
          </div>
        )}

        <main className="p-4 sm:p-8 lg:p-10 transition-all duration-300 pb-28 lg:pb-10 flex-1">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {activeTab === 'home' ? `สวัสดี, คุณ${user.name}!` :
                 activeTab === 'dashboard' ? 'ข้อมูลวิเคราะห์คะแนน' : 
                 activeTab === 'rewards' ? 'แคตตาล็อกของรางวัล' : 
                 activeTab === 'history' ? 'ประวัติกิจกรรม' : 'โปรไฟล์ของคุณ'}
              </h1>
              <p className="text-gray-500 font-medium">
                {activeTab === 'home' ? 'ค้นพบวิธีใหม่ๆ ในการใช้คะแนนของคุณวันนี้' :
                 activeTab === 'dashboard' ? 'รายละเอียดคะแนนสะสมของคุณ' : 
                 activeTab === 'rewards' ? 'สินค้าพิเศษสำหรับคุณโดยเฉพาะ' : 
                 activeTab === 'history' ? 'ตรวจสอบกิจกรรมย้อนหลังของคุณ' : 'จัดการตั้งค่าบัญชีของคุณ'}
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100 pr-4">
              <div className="w-12 h-12 bg-[#51B677]/10 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-xl font-bold text-[#51B677]">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 leading-none mb-1">{user.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${user.tier === 'Gold' ? 'bg-yellow-400' : 'bg-[#51B677]'}`}></span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">ระดับ {user.tier}</span>
                </div>
              </div>
            </div>
          </header>

          {activeTab === 'home' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <BannerCarousel />

              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#51B677] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#51B677]/20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">คะแนนคงเหลือของคุณ</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-gray-900">{user.availablePoints.toLocaleString()}</span>
                      <span className="text-gray-400 font-bold">คะแนน</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('rewards')} className="bg-[#51B677] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#51B677]/20 hover:scale-105 transition-transform active:scale-95">
                    แลกรางวัลเลย
                  </button>
                  <button className="bg-gray-100 text-gray-600 px-8 py-3.5 rounded-full font-bold hover:bg-gray-200 transition-colors active:scale-95">
                    รับคะแนนเพิ่ม
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <h3 className="font-bold text-gray-800">โอนคะแนน</h3>
                  <p className="text-sm text-gray-400 mt-1">ส่งคะแนนให้เพื่อนได้ทันที</p>
                </div>
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h3 className="font-bold text-gray-800">ซื้อคะแนน</h3>
                  <p className="text-sm text-gray-400 mt-1">คะแนนไม่พอ? เติมได้ง่ายๆ</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <h3 className="font-bold text-gray-800">สถานะระดับสมาชิก</h3>
                  <p className="text-sm text-gray-400 mt-1">ดูสิทธิประโยชน์ระดับ Gold</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setActiveTab('history')}>
                  <div className="w-12 h-12 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h3 className="font-bold text-gray-800">ประวัติกิจกรรม</h3>
                  <p className="text-sm text-gray-400 mt-1">ตรวจสอบประวัติคะแนนล่าสุด</p>
                </div>
              </div>

              {/* Recommended Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">ของรางวัลแนะนำ</h3>
                  <button onClick={() => setActiveTab('rewards')} className="text-[#51B677] font-bold text-sm hover:underline flex items-center gap-1">
                    ดูทั้งหมด 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar">
                  {recommendedRewards.map(reward => (
                    <div key={reward.id} className="min-w-[80vw] sm:min-w-[320px] md:min-w-0 snap-center">
                      <RewardCard 
                        reward={reward} 
                        userPoints={user.availablePoints}
                        onRedeem={handleRedeem}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Three Category Groups */}
              <RewardGroup title="เครื่องใช้ไฟฟ้า" rewards={electronicsRewards} />
              <RewardGroup title="บัตรกำนัล" rewards={voucherRewards} />
              <RewardGroup title="ไลฟ์สไตล์" rewards={lifestyleRewards} />
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#51B677] rounded-3xl p-6 text-white shadow-xl shadow-[#51B677]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  <div className="relative z-10">
                    <span className="text-white/80 font-semibold text-sm uppercase tracking-wider block mb-2">คะแนนที่ใช้ได้</span>
                    <div className="text-4xl font-extrabold mb-4">{user.availablePoints.toLocaleString()}</div>
                    <div className="bg-white/20 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>
                      พร้อมแลกรางวัล
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider block mb-2">คะแนนสะสมทั้งหมด</span>
                    <div className="text-3xl font-extrabold text-gray-800">{user.totalPoints.toLocaleString()}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-500">รวมตลอดการใช้งาน</span>
                    <span className="text-[#51B677] font-bold">+12% จากเดือนที่แล้ว</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider block mb-2">เป้าหมายรางวัลถัดไป</span>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-[#51B677] h-full rounded-full" style={{ width: '85.6%' }}></div>
                      </div>
                      <span className="text-sm font-extrabold text-gray-800">85%</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-medium text-gray-500">
                    คุณขาดอีกเพียง <span className="text-[#51B677] font-bold">2,150 คะแนน</span> เพื่อแลก หูฟังไร้สายระดับโปร!
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800">ประวัติคะแนน</h2>
                    <select className="bg-gray-50 border-none rounded-full px-4 text-xs font-bold text-gray-500 focus:ring-[#51B677]">
                      <option>7 วันล่าสุด</option>
                      <option>30 วันล่าสุด</option>
                    </select>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={PRIMARY_COLOR} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                          itemStyle={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="points" stroke={PRIMARY_COLOR} strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">กิจกรรมล่าสุด</h2>
                  <div className="space-y-5">
                    {MOCK_TRANSACTIONS.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'earned' ? 'bg-green-50 text-[#51B677]' : 'bg-red-50 text-red-500'
                          }`}>
                            {tx.type === 'earned' ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-tight">{tx.description}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tx.date}</p>
                          </div>
                        </div>
                        <span className={`font-bold text-sm ${tx.type === 'earned' ? 'text-[#51B677]' : 'text-red-500'}`}>
                          {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className="w-full mt-8 py-3 bg-gray-50 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    ดูประวัติทั้งหมด
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRewards.length > 0 ? (
                  filteredRewards.map(reward => (
                    <RewardCard 
                      key={reward.id} 
                      reward={reward} 
                      userPoints={user.availablePoints}
                      onRedeem={handleRedeem}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">ไม่พบของรางวัล</h3>
                    <p className="text-gray-500">ลองปรับคำค้นหาของคุณใหม่อีกครั้ง</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">รหัสธุรกรรม</th>
                      <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">วันที่</th>
                      <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">รายละเอียด</th>
                      <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">จำนวน</th>
                      <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">ประเภท</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_TRANSACTIONS.map(tx => (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 text-sm font-medium text-gray-400">#{tx.id}</td>
                        <td className="px-8 py-5 text-sm font-bold text-gray-700">{tx.date}</td>
                        <td className="px-8 py-5 text-sm font-bold text-gray-800">{tx.description}</td>
                        <td className="px-8 py-5 text-sm">
                          <span className={`font-bold ${tx.type === 'earned' ? 'text-[#51B677]' : 'text-red-500'}`}>
                            {tx.type === 'earned' ? '+' : '-'}{tx.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                            tx.type === 'earned' ? 'bg-green-50 text-[#51B677]' : 'bg-red-50 text-red-500'
                          }`}>
                            {tx.type === 'earned' ? 'ได้รับ' : 'แลกไป'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-8 bg-gray-50/30 flex justify-between items-center">
                <p className="text-sm text-gray-500 font-medium">แสดง {MOCK_TRANSACTIONS.length} รายการ</p>
                <div className="flex gap-2">
                  <button className="px-5 py-2 rounded-full bg-white border border-gray-100 text-sm font-bold text-gray-400 cursor-not-allowed">ก่อนหน้า</button>
                  <button className="px-5 py-2 rounded-full bg-white border border-gray-100 text-sm font-bold text-gray-700 hover:bg-gray-50">ถัดไป</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                  <div className="w-24 h-24 bg-[#51B677]/10 rounded-full overflow-hidden mx-auto mb-6 shadow-xl shadow-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#51B677]">{user.name.charAt(0)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">สมาชิกชั้น {user.tier}</p>
                  <div className="flex justify-center gap-2 mb-8">
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">สนับสนุนระดับพรีเมียม</div>
                    <div className="bg-[#51B677]/10 text-[#51B677] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">เข้าถึงก่อนใคร</div>
                  </div>
                  <button className="w-full bg-[#51B677] text-white py-3 rounded-full font-bold hover:shadow-lg hover:shadow-[#51B677]/20 transition-all">
                    แก้ไขโปรไฟล์
                  </button>
                </div>
                
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">การแจ้งเตือน</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-50 transition-colors px-5">
                      <span className="text-sm font-medium text-gray-700">แจ้งเตือนคะแนน</span>
                      <div className="w-10 h-6 bg-[#51B677] rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-50 transition-colors px-5">
                      <span className="text-sm font-medium text-gray-700">โปรโมชั่น</span>
                      <div className="w-10 h-6 bg-[#51B677] rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-full hover:bg-gray-50 transition-colors px-5">
                      <span className="text-sm font-medium text-gray-700">ประวัติการแลกรับ</span>
                      <div className="w-10 h-6 bg-gray-200 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-8">ข้อมูลบัญชี</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ที่อยู่อีเมล</label>
                      <div className="text-sm font-bold text-gray-700 bg-gray-50 px-5 py-3 rounded-full">jespark.loyalty@example.com</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">เป็นสมาชิกตั้งแต่</label>
                      <div className="text-sm font-bold text-gray-700 bg-gray-50 px-5 py-3 rounded-full">มกราคม 2021</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">เบอร์โทรศัพท์</label>
                      <div className="text-sm font-bold text-gray-700 bg-gray-50 px-5 py-3 rounded-full">+66 (081) 987-6543</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">สกุลเงินหลัก</label>
                      <div className="text-sm font-bold text-gray-700 bg-gray-50 px-5 py-3 rounded-full">THB (บาทไทย)</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-8">ความปลอดภัย</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-4 border-2 border-gray-100 rounded-full font-bold text-gray-700 hover:border-[#51B677]/30 transition-all">
                      เปลี่ยนรหัสผ่าน
                    </button>
                    <button className="flex-1 py-4 border-2 border-gray-100 rounded-full font-bold text-gray-700 hover:border-[#51B677]/30 transition-all">
                      ยืนยันตัวตนสองชั้น
                    </button>
                  </div>
                  <p className="mt-6 text-xs text-gray-400 font-medium">เปลี่ยนรหัสผ่านล่าสุด: 3 เดือนที่แล้ว</p>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>

      <AIChat userPoints={user.availablePoints} rewards={MOCK_REWARDS} />
      
      {/* Mobile Bottom Navigation */}
      <nav className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-[60] shadow-2xl" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))', minHeight: '70px' }}>
        <div className="flex items-center justify-around px-1 py-2 max-w-full">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === 'home' 
                ? 'text-[#51B677]' 
                : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a 1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span className="text-[10px] font-semibold leading-tight">หน้าหลัก</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === 'dashboard' 
                ? 'text-[#51B677]' 
                : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span className="text-[10px] font-semibold leading-tight">วิเคราะห์</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('rewards')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === 'rewards' 
                ? 'text-[#51B677]' 
                : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'rewards' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span className="text-[10px] font-semibold leading-tight">รางวัล</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === 'history' 
                ? 'text-[#51B677]' 
                : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'history' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <span className="text-[10px] font-semibold leading-tight">ประวัติ</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 flex-1 ${
              activeTab === 'profile' 
                ? 'text-[#51B677]' 
                : 'text-gray-500'
            }`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span className="text-[10px] font-semibold leading-tight">โปรไฟล์</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
