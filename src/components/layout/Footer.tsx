'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONTENT } from '@/config/siteContent';
import { ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0f17] text-slate-400 pt-16 pb-12 border-t border-[#d4af37]/20 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Features Guarantee Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-900 text-xs">
          {SITE_CONTENT.footer.guarantees.map((item, idx) => (
            <div key={idx} className="space-y-1.5 p-5 rounded-2xl bg-slate-900/60 border border-[#d4af37]/20">
              {idx === 0 && <Clock className="w-5 h-5 text-[#d4af37] mb-2" />}
              {idx === 1 && <Sparkles className="w-5 h-5 text-[#d4af37] mb-2" />}
              {idx === 2 && <ShieldCheck className="w-5 h-5 text-[#d4af37] mb-2" />}
              {idx === 3 && <Award className="w-5 h-5 text-[#d4af37] mb-2" />}
              <h4 className="font-bold text-[#f4e8c1] text-sm">{item.title}</h4>
              <p className="text-slate-400 text-xs">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#d4af37]/40 bg-[#0F1219] shrink-0">
                <Image
                  src="/images/dc-stores-logo.png"
                  alt="DC Stores Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight leading-none">
                  DC <span className="text-[#d4af37]">STORES</span>
                </h3>
                <span className="text-[10px] font-bold text-[#d4af37] tracking-wider uppercase block mt-1">
                  A Product by Anuradha Mehta Enterprises
                </span>
              </div>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {SITE_CONTENT.footer.bio}
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] block">
              {SITE_CONTENT.footer.categoriesTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/products?cat=cat_tumblers" className="hover:text-white transition-colors">Tumblers & Drinkware</Link></li>
              <li><Link href="/products?cat=cat_stationery" className="hover:text-white transition-colors">Premium Stationery</Link></li>
              <li><Link href="/products?cat=cat_books" className="hover:text-white transition-colors">Books & Novels</Link></li>
              <li><Link href="/products?cat=cat_gifts" className="hover:text-white transition-colors">Gifts & Hampers</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] block">
              {SITE_CONTENT.footer.accountTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/profile" className="hover:text-white transition-colors">Account Portal</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Digital Receipts</Link></li>
              <li><Link href="/addresses" className="hover:text-white transition-colors">Shajapur Locations</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Saved Favorites</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] block">
              {SITE_CONTENT.footer.platformTitle}
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white cursor-pointer">About Store</span></li>
              <li><span className="hover:text-white cursor-pointer">Quality Standards</span></li>
              <li><span className="hover:text-white cursor-pointer">Gift Packaging</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy & Terms</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 text-center md:flex md:justify-between items-center text-[11px] text-slate-500">
          <p>{SITE_CONTENT.footer.copyright}</p>
          <p className="mt-2 md:mt-0 flex items-center justify-center gap-1 text-[#d4af37]">
            {SITE_CONTENT.footer.footnote}
          </p>
        </div>

      </div>
    </footer>
  );
};
