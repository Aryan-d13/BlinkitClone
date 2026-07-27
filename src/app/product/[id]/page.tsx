'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Clock,
  Plus,
  Minus,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SelectedCustomization } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { addToCart, isInWishlist, toggleWishlist } = useApp();

  const product = PRODUCTS.find((p) => p.id === productId || p.slug === productId) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const isFavorite = isInWishlist(product.id);

  const addonTotal = selectedCustomizations.reduce((acc, c) => acc + c.price, 0);
  const unitPrice = product.price + addonTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedCustomizations, specialInstructions);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Menu
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column Image Showcase */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isFavorite
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white/80 text-slate-700 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-slate-600 font-medium">100% Organic Ingredients</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/70 shadow-xs">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-slate-600 font-medium">Freshly Assembled</span>
            </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono text-[10px] uppercase font-bold">
                {product.categoryName}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" /> {product.rating} ({product.reviewCount}+ reviews)
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{product.name}</h1>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{product.description}</p>
          </div>

          {/* Pricing & Corporate Allowance */}
          <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block">Total Item Price</span>
              <span className="text-3xl font-black text-slate-900 tabular-nums">${totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Covered by $150 Allowance
              </span>
            </div>
          </div>

          {/* Nutrition Table */}
          {product.nutrition && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
                Nutrition Profile
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
                  <span className="text-slate-400 text-[10px] block font-mono">Calories</span>
                  <span className="font-bold text-slate-900 tabular-nums">{product.nutrition.calories} kcal</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
                  <span className="text-slate-400 text-[10px] block font-mono">Protein</span>
                  <span className="font-bold text-emerald-700">{product.nutrition.protein}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
                  <span className="text-slate-400 text-[10px] block font-mono">Carbs</span>
                  <span className="font-bold text-slate-900">{product.nutrition.carbs}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
                  <span className="text-slate-400 text-[10px] block font-mono">Fat</span>
                  <span className="font-bold text-slate-900">{product.nutrition.fat}</span>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block">
              Ingredients
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {product.ingredients.map((ing, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full border border-slate-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-500 hover:text-slate-900 font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-slate-900 w-4 text-center text-sm tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-emerald-700 hover:text-emerald-800 font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-accent-pill text-sm px-6 py-3.5 flex-1 justify-center shadow-lg"
            >
              <span>Add to Lunch Cart</span>
              <span className="tabular-nums">(${totalPrice.toFixed(2)})</span>
            </button>
          </div>

        </div>

      </div>

      {/* Customer Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">Corporate Customer Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                      <Image src={rev.userAvatar} alt={rev.userName} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
