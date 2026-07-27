'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { SITE_CONTENT } from '@/config/siteContent';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'popular'>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }, [selectedCategory, maxPrice, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Editorial Header */}
      <div className="doppel-shell p-2">
        <div className="doppel-core-dark p-6 sm:p-8 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#d4af37] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> {SITE_CONTENT.productsPage.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{SITE_CONTENT.productsPage.title}</h1>
          <p className="text-xs text-slate-300 max-w-xl">
            {SITE_CONTENT.productsPage.subtitle}
          </p>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex lg:hidden items-center justify-between">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-[#f4e8c1] font-bold text-xs shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
          <span>Refine Store Filters</span>
        </button>
        <span className="text-xs font-mono text-slate-400">{filteredProducts.length} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#b8860b]" /> {SITE_CONTENT.productsPage.filtersTitle}
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(1500);
                setSortBy('popular');
              }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              {SITE_CONTENT.productsPage.categoriesHeading}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Departments ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Max Price</span>
              <span className="text-slate-900 tabular-nums font-mono">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          {/* Sort selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              {SITE_CONTENT.productsPage.sortHeading}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3 space-y-4">
          <div className="hidden lg:flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Showing {filteredProducts.length} items</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-3">
              <p className="text-slate-500 font-bold text-sm">{SITE_CONTENT.productsPage.emptyTitle}</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(2000);
                }}
                className="btn-accent-pill text-xs"
              >
                {SITE_CONTENT.productsPage.clearFiltersBtn}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="horizontal" />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
          />
          <div className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl z-10 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#b8860b]" /> Filter Store Items
              </h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
                Departments
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`p-2.5 rounded-xl text-left font-bold ${
                    selectedCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  All ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-2.5 rounded-xl text-left font-bold truncate ${
                      selectedCategory === cat.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Max Price</span>
                <span className="text-slate-900 tabular-nums font-mono">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono text-xs">Loading store catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
