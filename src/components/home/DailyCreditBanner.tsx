'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONTENT } from '@/config/siteContent';
import { Clock, Truck, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const DailyCreditBanner: React.FC = () => {
  return (
    <div className="doppel-shell p-2 mb-8 sm:mb-10">
      <div className="doppel-core p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative overflow-hidden bg-white">
        
        {/* Top Header Row - Hidden on mobile screens to prevent visual repetition */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-[#d4af37]/40 bg-[#0F1219] shrink-0">
              <Image
                src="/images/dc-stores-logo.png"
                alt="DC Stores Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 leading-none">DC STORES</h4>
              <span className="text-[10px] font-bold text-[#b8860b] mt-0.5 block">
                A Product by Anuradha Mehta Enterprises
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4e8c1]/60 text-slate-900 text-xs font-bold border border-[#d4af37]/40">
            <ShieldCheck className="w-4 h-4 text-[#b8860b] shrink-0" />
            <span>30-45 Mins Express Delivery in Shajapur</span>
          </div>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Store Value Proposition */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold text-[#b8860b] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> {SITE_CONTENT.homePage.eyebrowTag}
            </span>

            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Aesthetic Tumblers, Journals, Books & Custom Gifts
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg leading-relaxed">
                {SITE_CONTENT.homePage.heroDescription}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/products"
                className="btn-accent-pill text-xs px-4 sm:px-5 py-2.5 shadow-sm"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/categories"
                className="px-4 sm:px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                View Departments
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-2xl sm:rounded-3xl p-2 bg-slate-100/80 border border-[#d4af37]/30 shadow-xl overflow-hidden">
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
                  alt="Aesthetic Stainless Steel Tumbler"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Delivery Info Strip */}
        <div className="pt-4 sm:pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#0F1219] text-[#f4e8c1] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 block">{SITE_CONTENT.homePage.cutoffLabel}</span>
              <strong className="font-bold text-slate-900 text-xs">30-45 Mins Shajapur</strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#0F1219] text-[#f4e8c1] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 block">Free Shipping</span>
              <strong className="font-bold text-slate-900 text-xs">Orders over ₹499</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
