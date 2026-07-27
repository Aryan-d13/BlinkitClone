'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { User, Sparkles, MapPin, Mail, Phone, Heart, ShoppingBag } from 'lucide-react';

export default function ProfilePage() {
  const { user, orders } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
          <User className="w-4 h-4" /> Customer Profile
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Overview</h1>
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
          </div>
        </div>

        {/* Right Info */}
        <div className="md:col-span-7 space-y-6">
          
          <div className="doppel-shell p-2">
            <div className="doppel-core p-6 bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> DC Stores Member Status
                </span>
                <span className="text-[10px] font-mono text-slate-400">Shajapur, MP</span>
              </div>

              <div>
                <span className="text-xs text-slate-300 font-medium block">Total Orders Placed</span>
                <div className="text-4xl font-black text-white tracking-tight tabular-nums mt-1">
                  {orders.length} <span className="text-xs font-normal text-slate-400">Orders Delivered</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant 30-45 Mins Express Delivery across Shajapur.</span>
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
                <MapPin className="w-4 h-4 text-emerald-700" /> Delivery Addresses
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
