'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import { Plus, Minus, Heart, Star } from 'lucide-react';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: Product;
  variant?: 'horizontal' | 'vertical' | 'hero';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'horizontal' }) => {
  const { cart, addToCart, updateQuantity, isInWishlist, toggleWishlist } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const cartItemsForProduct = cart.filter((ci) => ci.product.id === product.id);
  const totalQtyInCart = cartItemsForProduct.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.customizationGroups && product.customizationGroups.length > 0) {
      setIsModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForProduct.length > 0) {
      updateQuantity(cartItemsForProduct[0].cartItemId, cartItemsForProduct[0].quantity + 1);
    } else {
      handleQuickAdd(e);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForProduct.length > 0) {
      updateQuantity(cartItemsForProduct[0].cartItemId, cartItemsForProduct[0].quantity - 1);
    }
  };

  if (variant === 'hero') {
    return (
      <>
        <div
          onClick={() => setIsModalOpen(true)}
          className="doppel-shell cursor-pointer group"
        >
          <div className="doppel-core p-5 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Image Container */}
            <div className="relative w-full md:w-64 h-52 sm:h-60 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                  isFavorite
                    ? 'bg-red-500 text-white shadow-xs'
                    : 'bg-white/80 text-slate-600 hover:text-red-500 hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount}+)</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between py-1 w-full space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold tracking-wider">
                    {product.categoryName} • Express Delivery
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    ₹{product.price.toFixed(0)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      ₹{product.originalPrice.toFixed(0)}
                    </span>
                  )}
                </div>

                {totalQtyInCart > 0 ? (
                  <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <button
                      onClick={handleDecrement}
                      className="w-7 h-7 rounded-full bg-white text-slate-800 flex items-center justify-center font-bold shadow-xs hover:bg-slate-50"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-slate-900 text-sm tabular-nums">{totalQtyInCart}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleQuickAdd}
                    className="btn-accent-pill text-xs shadow-xs"
                  >
                    <span>{SITE_CONTENT.actions.addToLunch}</span>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        <ProductModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  // Standard Horizontal Product Card
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-2xl p-3.5 border border-slate-200/70 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-4"
      >
        {/* Product Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-red-500 text-white shadow-xs'
                : 'bg-white/80 text-slate-500 hover:text-red-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Info & Pricing */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
              {product.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                ₹{product.price.toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>

            {totalQtyInCart > 0 ? (
              <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 rounded-full bg-white text-slate-700 flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-extrabold text-slate-900 text-xs tabular-nums">{totalQtyInCart}</span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-xs"
                title={SITE_CONTENT.actions.addToLunch}
              >
                <Plus className="w-4 h-4 stroke-[2.2]" />
              </button>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
