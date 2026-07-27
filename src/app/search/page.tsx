'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS } from '@/data/mockData';
import { Search, Tag, UtensilsCrossed } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const popularTags = ['Grilled Chicken Bowl', 'Quinoa', 'Tofu', 'Detox Juice', 'Biryani', 'Salad'];

  const results = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Search Header Input */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
          Instant Search
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Search Meals & Ingredients</h1>

        <div className="relative">
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search 'Chicken Bowl', 'High Protein', 'Matcha'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200/80 shadow-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
            autoFocus
          />
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Trending:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <h2 className="text-sm font-bold text-slate-800">
          {query ? `Search Results for "${query}"` : 'All Menu Dishes'}
        </h2>
        <span className="text-xs font-mono text-slate-400">{results.length} items found</span>
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-3">
          <UtensilsCrossed className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching meals found</h3>
          <p className="text-xs text-slate-400">Try searching for terms like "chicken", "salad", or "juice"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} variant="horizontal" />
          ))}
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono text-xs">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
