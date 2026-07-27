'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    promoDiscount,
    deliveryFee,
    tax,
    totalAmountToPay,
    totalCartItemCount,
    appliedPromo,
    removePromoCode,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-slate-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-none">Your Shopping Bag</h3>
                <span className="text-xs text-slate-400 font-mono mt-0.5 block">{totalCartItemCount} items</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Your bag is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our aesthetic tumblers, stationery, books, and gift hampers.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-accent-pill text-xs px-6 py-2.5"
              >
                Browse Store
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              
              {/* Items */}
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex gap-3.5 items-center"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                        <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                          ₹{item.totalPrice.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60">
                      <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-full border border-slate-200 text-xs">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-slate-900 w-4 text-center tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-emerald-700 hover:text-emerald-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-red-500 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Applied Banner */}
              {appliedPromo && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                      <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button onClick={removePromoCode} className="text-[10px] text-red-500 font-bold">
                    Remove
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Drawer Footer Financial Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-900 tabular-nums">₹{cartSubtotal.toFixed(0)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between font-medium text-emerald-700">
                    <span>Promo Discount</span>
                    <span className="tabular-nums">-₹{promoDiscount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST & Delivery (Shajapur)</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `₹${(deliveryFee + tax).toFixed(0)}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-lg text-emerald-700 tabular-nums">₹{totalAmountToPay.toFixed(0)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant 30-45 Mins Express Delivery in Shajapur</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{SITE_CONTENT.cart.proceedToCheckoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
