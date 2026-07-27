'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, wishlist, selectedAddress, addresses, setSelectedAddress, setIsCartOpen, totalCartItemCount, cartSubtotal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddressMenuOpen, setIsAddressMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-glass-nav transition-all">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#0F1219] text-slate-300 py-1.5 px-3 sm:px-4 text-xs border-b border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f4e8c1] text-[9px] sm:text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 border border-[#d4af37]/30 shrink-0">
              <Sparkles className="w-3 h-3 text-[#d4af37]" /> {SITE_CONTENT.navigation.announcementBadge}
            </span>
            <span className="text-slate-300 text-[11px] truncate">
              {SITE_CONTENT.navigation.announcementSuffix}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px] shrink-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {SITE_CONTENT.brand.cutoffTime}
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-[#f4e8c1]">Location: {SITE_CONTENT.brand.location}</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo + Delivery Location */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#d4af37]/40 bg-[#0F1219] shrink-0">
                <Image
                  src="/images/dc-stores-logo.png"
                  alt="DC Stores Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-none whitespace-nowrap">
                  DC <span className="text-[#b8860b]">STORES</span>
                </h1>
                <span className="text-[9px] sm:text-[10px] font-bold text-[#b8860b] tracking-tight uppercase block mt-0.5 whitespace-nowrap">
                  Anuradha Mehta Enterprises
                </span>
              </div>
            </Link>

            {/* Address Dropdown - Desktop & Tablet */}
            <div className="hidden lg:relative lg:block">
              <button
                onClick={() => setIsAddressMenuOpen(!isAddressMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 transition-colors text-left"
              >
                <MapPin className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <div className="text-xs max-w-[160px] truncate">
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    <span>{selectedAddress.label} - {selectedAddress.city}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-slate-400 text-[10px] truncate">{selectedAddress.street}</div>
                </div>
              </button>

              {isAddressMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Shajapur Address
                  </div>
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setIsAddressMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors ${
                        selectedAddress.id === addr.id
                          ? 'bg-amber-50/70 border border-amber-200/60'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#b8860b] mt-0.5 shrink-0" />
                      <div className="flex-1 text-xs">
                        <div className="font-semibold text-slate-800 flex items-center justify-between">
                          <span>{addr.label}</span>
                          {selectedAddress.id === addr.id && <CheckCircle className="w-3.5 h-3.5 text-[#b8860b]" />}
                        </div>
                        <p className="text-slate-400 text-[11px] truncate">{addr.street}</p>
                      </div>
                    </button>
                  ))}
                  <div className="mt-1 pt-2 border-t border-slate-100 text-center">
                    <Link
                      href="/addresses"
                      onClick={() => setIsAddressMenuOpen(false)}
                      className="text-xs font-semibold text-[#b8860b] hover:text-amber-800"
                    >
                      {SITE_CONTENT.navigation.manageAddressesLink}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={SITE_CONTENT.navigation.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-slate-100/80 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:bg-white transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                /
              </span>
            </div>
          </form>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
              {SITE_CONTENT.navigation.menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Wishlist Icon - Hidden on mobile as MobileBottomNav handles it */}
            <Link
              href="/wishlist"
              className="hidden md:flex relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100/80 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5 stroke-[2]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#b8860b] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile - Hidden on mobile as MobileBottomNav/Profile handles it */}
            <Link href="/profile" className="hidden md:flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100/80 transition-colors">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#d4af37]/50">
                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
              </div>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-accent-pill text-xs px-3 sm:px-5 py-2 sm:py-2.5 shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="tabular-nums">
                {totalCartItemCount === 0 ? 'Bag' : `₹${cartSubtotal.toFixed(0)}`}
              </span>
              {totalCartItemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {totalCartItemCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <form onSubmit={handleSearchSubmit} className="block md:hidden pt-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Tumblers, Books, Gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:bg-white transition-all"
            />
          </div>
        </form>

      </div>

    </header>
  );
};
