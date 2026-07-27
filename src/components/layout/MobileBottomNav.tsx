'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Store, Grid, Search, Heart, ShoppingBag, History } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { wishlist, totalCartItemCount, setIsCartOpen } = useApp();

  const navItems = [
    { label: 'Store', href: '/', icon: Store },
    { label: 'Departments', href: '/categories', icon: Grid },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Favorites', href: '/wishlist', icon: Heart, badge: wishlist.length },
    { label: 'Orders', href: '/orders', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#d4af37]/30 z-40 md:hidden px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
              isActive ? 'text-[#b8860b] font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-[#b8860b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight leading-none font-semibold">
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Cart Trigger Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center flex-1 py-1 text-center text-slate-700 hover:text-slate-900"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-[#0F1219] text-[#f4e8c1] flex items-center justify-center shadow-md border border-[#d4af37]/40">
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
          </div>
          {totalCartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#d4af37] text-[#0F1219] text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
              {totalCartItemCount}
            </span>
          )}
        </div>
      </button>
    </nav>
  );
};
