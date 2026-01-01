
import React from 'react';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem }) => {
  const canAfford = userPoints >= reward.points;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={reward.image} 
          alt={reward.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#51B677] shadow-sm">
          {reward.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{reward.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{reward.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <span className="block text-2xl font-bold text-gray-900">{reward.points.toLocaleString()}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">คะแนนที่ต้องใช้</span>
          </div>
          
          <button
            disabled={!canAfford}
            onClick={() => onRedeem(reward)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              canAfford 
                ? 'bg-[#51B677] text-white hover:bg-[#45a368] shadow-md hover:shadow-[#51B677]/30' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canAfford ? 'แลกรางวัล' : 'คะแนนไม่พอ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
