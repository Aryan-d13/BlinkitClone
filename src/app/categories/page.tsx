'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mockData';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="doppel-shell p-2">
        <div className="doppel-core p-8 bg-slate-900 text-white space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-400">
            Category Catalog
          </span>
          <h1 className="text-3xl font-black tracking-tight">Browse by Category</h1>
          <p className="text-xs text-slate-300 max-w-xl">
            From warm protein grain bowls to fresh organic salads and cold-pressed juices.
          </p>
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?cat=${cat.id}`}
            className="doppel-shell group cursor-pointer"
          >
            <div className="doppel-core p-4 space-y-3">
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-white">
                  {cat.itemCount} Items
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{cat.description}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
