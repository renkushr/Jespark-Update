
import React from 'react';

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CategoryBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelect: (label: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
      <div className="flex items-center gap-3 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.label)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
              selectedCategory === cat.label
                ? 'bg-[#51B677] text-white border-[#51B677] shadow-lg shadow-[#51B677]/20 scale-105'
                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className={selectedCategory === cat.label ? 'text-white' : 'text-[#51B677]'}>
              {cat.icon}
            </span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
