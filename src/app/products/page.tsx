'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { DietType } from '@/types';
import { SlidersHorizontal, UtensilsCrossed } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [dietFilter, setDietFilter] = useState<DietType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'popular'>('popular');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      if (dietFilter !== 'all' && p.dietType !== dietFilter) {
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
  }, [selectedCategory, dietFilter, maxPrice, sortBy]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Editorial Header */}
      <div className="doppel-shell p-2">
        <div className="doppel-core p-8 bg-slate-900 text-white space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-400">
            Catalog & Filter
          </span>
          <h1 className="text-3xl font-black tracking-tight">Full Meal Menu</h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Nutritionally calibrated warm grain bowls, fresh salads, and organic beverages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Desktop Sidebar Filter */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" /> Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietFilter('all');
                setMaxPrice(200);
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
              Categories
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
                All Categories ({PRODUCTS.length})
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

          {/* Dietary Filter */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              Dietary Preference
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'veg', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'non-veg', label: 'Non-Veg' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setDietFilter(diet.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    dietFilter === diet.id
                      ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Max Price</span>
              <span className="text-slate-900 tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          {/* Sort selector */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              Sort Order
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
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Showing {filteredProducts.length} items</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-3">
              <p className="text-slate-500 font-bold text-sm">No dishes match your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setDietFilter('all');
                  setMaxPrice(200);
                }}
                className="btn-accent-pill text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="horizontal" />
              ))}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono text-xs">Loading menu catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
