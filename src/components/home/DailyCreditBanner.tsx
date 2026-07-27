'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONTENT } from '@/config/siteContent';
import { Clock, Truck, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const DailyCreditBanner: React.FC = () => {
  return (
    <div className="doppel-shell p-2 mb-10">
      <div className="doppel-core p-6 sm:p-10 space-y-8 relative overflow-hidden bg-white">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {SITE_CONTENT.brand.location}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Aesthetic Lifestyle & Gift Store
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/50">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>30-45 Mins Express Delivery Active</span>
          </div>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Store Value Proposition */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-amber-700 block">
              {SITE_CONTENT.homePage.eyebrowTag}
            </span>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Aesthetic Tumblers, Journals, Books & Custom Gifts
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg leading-relaxed">
                {SITE_CONTENT.homePage.heroDescription}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="btn-accent-pill text-xs px-5 py-2.5 shadow-sm"
              >
                <span>Browse Store Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/categories"
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                View Departments
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-2 bg-slate-100/80 border border-slate-200/60 shadow-xl overflow-hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
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
        <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">{SITE_CONTENT.homePage.cutoffLabel}</span>
              <strong className="font-bold text-slate-900">30-45 Mins Shajapur</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Free Shipping</span>
              <strong className="font-bold text-slate-900">Orders over ₹499</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
