'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DailyCreditBanner } from '@/components/home/DailyCreditBanner';
import { CategoryBar } from '@/components/home/CategoryBar';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS } from '@/data/mockData';
import { SITE_CONTENT } from '@/config/siteContent';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('cat_all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'cat_all') return true;
    return p.categoryId === selectedCategory;
  });

  const heroDish = PRODUCTS[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* DC Stores Welcome Hero */}
      <DailyCreditBanner />

      {/* Category Navigation */}
      <CategoryBar
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Recommended Spotlight Product */}
      {selectedCategory === 'cat_all' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400">
              {SITE_CONTENT.homePage.spotlightEyebrow}
            </span>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#b8860b] hover:text-amber-800 flex items-center gap-1 transition-colors"
            >
              <span>{SITE_CONTENT.homePage.viewFullMenu}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProductCard product={heroDish} variant="hero" />
        </section>
      )}

      {/* Popular Products Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{SITE_CONTENT.homePage.popularMealsTitle}</h3>
            <span className="text-xs font-mono text-slate-400">({filteredProducts.length} items)</span>
          </div>

          <Link
            href="/products"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <span>{SITE_CONTENT.homePage.exploreAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="horizontal" />
          ))}
        </div>
      </section>

      {/* DC Stores Local Delivery Banner - Luxury Obsidian & Gold */}
      <section className="doppel-shell p-2 my-12">
        <div className="doppel-core-dark p-8 sm:p-12 space-y-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#d4af37]/20 text-[#f4e8c1] text-xs font-mono font-bold uppercase tracking-wider border border-[#d4af37]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> {SITE_CONTENT.homePage.perksBadge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {SITE_CONTENT.homePage.perksTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {SITE_CONTENT.homePage.perksDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="btn-accent-pill text-xs px-6 py-3"
              >
                {SITE_CONTENT.homePage.perksBrowseCatalogBtn}
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f4e8c1] font-bold text-xs transition-colors border border-[#d4af37]/30"
              >
                Explore All Departments
              </Link>
            </div>
          </div>

          {/* Logo Watermark Badge */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/40 bg-[#0F1219] shrink-0 p-2">
            <Image
              src="/images/dc-stores-logo.png"
              alt="DC Stores Official Logo"
              fill
              className="object-contain p-2"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
