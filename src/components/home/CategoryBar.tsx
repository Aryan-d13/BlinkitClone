'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORIES } from '@/data/mockData';
import { SITE_CONTENT } from '@/config/siteContent';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const pillFilters = [
    { id: 'cat_all', name: 'All Products' },
    { id: 'cat_tumblers', name: 'Tumblers' },
    { id: 'cat_stationery', name: 'Stationery' },
    { id: 'cat_books', name: 'Books' },
    { id: 'cat_gifts', name: 'Gifts' },
    { id: 'cat_snacks', name: 'Drinks & Treats' },
  ];

  return (
    <div className="space-y-6 mb-10">
      
      {/* Top Category Cards Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400">
            {SITE_CONTENT.homePage.categoriesEyebrow}
          </span>
          <button
            onClick={() => onSelectCategory('cat_all')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            {SITE_CONTENT.homePage.showAllCategories} ({CATEGORIES.length})
          </button>
        </div>

        {/* Horizontal Department Buttons */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200/60 pb-3 custom-scrollbar">
        {pillFilters.map((pill) => {
          const isActive = activeCategory === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => onSelectCategory(pill.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {pill.name}
            </button>
          );
        })}
      </div>

    </div>
  );
};
