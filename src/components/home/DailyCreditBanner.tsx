'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import { Clock, Truck, ShieldCheck } from 'lucide-react';

export const DailyCreditBanner: React.FC = () => {
  const { user } = useApp();
  const remainingCredit = user.dailyCreditLimit - user.creditUsedToday;

  return (
    <div className="doppel-shell p-2 mb-10">
      <div className="doppel-core p-6 sm:p-10 space-y-8 relative overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none">{user.name}</h2>
              <span className="text-[11px] font-medium text-slate-400 mt-0.5 block">
                {user.role} • <strong className="text-emerald-700 font-semibold">{user.companyName}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/50">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Corporate Benefit Auto-Applied</span>
          </div>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Credit Overview */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              {SITE_CONTENT.homePage.eyebrowTag}
            </span>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                ${remainingCredit.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Remaining of <strong className="text-slate-800 font-semibold">${user.dailyCreditLimit.toFixed(2)}</strong> {SITE_CONTENT.homePage.heroSubtitle}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              {SITE_CONTENT.homePage.heroDescription}
            </p>
          </div>

          {/* Right Column: Hero Dish Showcase */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 bg-slate-100/80 border border-slate-200/60 shadow-lg">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
                  alt="Grilled Chicken Bowl"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Timing Strip */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">{SITE_CONTENT.homePage.cutoffLabel}</span>
              <strong className="font-bold text-slate-900">{SITE_CONTENT.brand.cutoffTime} Today</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">{SITE_CONTENT.homePage.arrivalLabel}</span>
              <strong className="font-bold text-slate-900">{SITE_CONTENT.brand.deliveryWindow}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
