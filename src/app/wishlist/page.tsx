'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/data/mockData';
import { ProductCard } from '@/components/products/ProductCard';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useApp();

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-red-500 flex items-center gap-1.5">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" /> Saved Dishes
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Favorites ({favoriteProducts.length})</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No saved favorites yet</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Tap the heart icon on any meal bowl or salad to save it for quick reordering!
          </p>
          <Link href="/products" className="btn-accent-pill text-xs">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="horizontal" />
          ))}
        </div>
      )}

    </div>
  );
}
