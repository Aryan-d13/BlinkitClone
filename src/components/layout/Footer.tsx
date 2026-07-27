'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONTENT } from '@/config/siteContent';
import { UtensilsCrossed, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Features Guarantee Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-900 text-xs">
          {SITE_CONTENT.footer.guarantees.map((item, idx) => (
            <div key={idx} className="space-y-1.5 p-5 rounded-2xl bg-slate-900/50 border border-slate-900">
              {idx === 0 && <Clock className="w-5 h-5 text-emerald-400 mb-2" />}
              {idx === 1 && <Sparkles className="w-5 h-5 text-emerald-400 mb-2" />}
              {idx === 2 && <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />}
              {idx === 3 && <Award className="w-5 h-5 text-emerald-400 mb-2" />}
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-slate-400 text-xs">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{SITE_CONTENT.brand.name}</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {SITE_CONTENT.footer.bio}
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400 block">
              {SITE_CONTENT.footer.categoriesTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/products?cat=cat_bowls" className="hover:text-white transition-colors">Protein Bowls</Link></li>
              <li><Link href="/products?cat=cat_salads" className="hover:text-white transition-colors">Superfood Salads</Link></li>
              <li><Link href="/products?cat=cat_beverages" className="hover:text-white transition-colors">Cold-Pressed Juices</Link></li>
              <li><Link href="/products?cat=cat_biryani" className="hover:text-white transition-colors">Dum Biryani Bowls</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400 block">
              {SITE_CONTENT.footer.accountTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/profile" className="hover:text-white transition-colors">Allowance Portal</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order Receipts</Link></li>
              <li><Link href="/addresses" className="hover:text-white transition-colors">Delivery Locations</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Saved Favorites</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400 block">
              {SITE_CONTENT.footer.platformTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white cursor-pointer">About Platform</span></li>
              <li><span className="hover:text-white cursor-pointer">Nutritional Standards</span></li>
              <li><span className="hover:text-white cursor-pointer">Corporate Integration</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy & Terms</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 text-center md:flex md:justify-between items-center text-[11px] text-slate-500">
          <p>{SITE_CONTENT.footer.copyright}</p>
          <p className="mt-2 md:mt-0 flex items-center justify-center gap-1">
            {SITE_CONTENT.footer.footnote}
          </p>
        </div>

      </div>
    </footer>
  );
};
