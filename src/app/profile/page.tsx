'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { User, Sparkles, Building, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useApp();

  const remainingCredit = user.dailyCreditLimit - user.creditUsedToday;
  const usedPercentage = Math.round((user.creditUsedToday / user.dailyCreditLimit) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
          <User className="w-4 h-4" /> Account & Corporate Benefits
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Profile & Allowance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Card */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs text-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-900 mx-auto shadow-sm">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">{user.role}</p>
            <p className="text-xs text-slate-400 font-medium">{user.companyName}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-left">
            <div className="flex items-center gap-2.5 text-slate-600">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{user.companyName} Corporate Tier 1</span>
            </div>
          </div>
        </div>

        {/* Right Allowance Card */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="doppel-shell p-2">
            <div className="doppel-core p-6 bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Corporate Credit Balance
                </span>
                <span className="text-[10px] font-mono text-slate-400">Resets Daily at 8:00 AM</span>
              </div>

              <div>
                <span className="text-xs text-slate-300 font-medium block">Available Balance Today</span>
                <div className="text-4xl font-black text-white tracking-tight tabular-nums mt-1">
                  ${remainingCredit.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-slate-400">/ ${user.dailyCreditLimit.toFixed(2)} limit</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Used: ${user.creditUsedToday.toFixed(2)}</span>
                  <span>{usedPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${usedPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Auto-deducted on all Green Bites checkout orders.</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
              <Link
                href="/addresses"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors flex items-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-emerald-700" /> Saved Locations
              </Link>

              <Link
                href="/wishlist"
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors flex items-center gap-2.5"
              >
                <Heart className="w-4 h-4 text-red-500" /> Saved Favorites
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
