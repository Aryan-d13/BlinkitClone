'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DailyCreditBanner } from '@/components/home/DailyCreditBanner';
import { CategoryBar } from '@/components/home/CategoryBar';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS } from '@/data/mockData';
import { SITE_CONTENT } from '@/config/siteContent';
import { ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('cat_meals');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'cat_meals') return true;
    if (selectedCategory === 'cat_bowls') return p.categoryId === 'cat_bowls';
    if (selectedCategory === 'cat_salads') return p.categoryId === 'cat_salads';
    if (selectedCategory === 'cat_beverages') return p.categoryId === 'cat_beverages';
    return p.categoryId === selectedCategory;
  });

  const heroDish = PRODUCTS[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* Editorial Corporate Credit Hero */}
      <DailyCreditBanner />

      {/* Category Navigation */}
      <CategoryBar
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Recommended Spotlight Dish */}
      {selectedCategory === 'cat_meals' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400">
              {SITE_CONTENT.homePage.spotlightEyebrow}
            </span>
            <Link
              href="/products"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
            >
              <span>{SITE_CONTENT.homePage.viewFullMenu}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProductCard product={heroDish} variant="hero" />
        </section>
      )}

      {/* Popular Meals Grid */}
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

      {/* Corporate Allowance Callout Banner */}
      <section className="doppel-shell p-2 my-12">
        <div className="doppel-core p-8 sm:p-12 bg-slate-900 text-white space-y-6 relative overflow-hidden">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> {SITE_CONTENT.homePage.perksBadge}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {SITE_CONTENT.homePage.perksTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {SITE_CONTENT.homePage.perksDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/profile"
              className="btn-accent-pill text-xs px-6 py-3"
            >
              {SITE_CONTENT.homePage.perksCheckBalanceBtn}
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20"
            >
              {SITE_CONTENT.homePage.perksBrowseCatalogBtn}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
