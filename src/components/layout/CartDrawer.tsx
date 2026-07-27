'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  ShoppingBag,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    creditApplied,
    promoDiscount,
    deliveryFee,
    tax,
    totalAmountToPay,
    totalCartItemCount,
    user,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between overflow-hidden border-l border-slate-200"
          >
            {/* Drawer Header */}
            <div className="p-5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Corporate Allowance Review
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">
                  Your Lunch Bag <span className="text-xs font-semibold text-slate-400">({totalCartItemCount} items)</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Your lunch bag is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore today's menu to utilize your ${user.dailyCreditLimit.toFixed(0)} daily corporate lunch credit.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-accent-pill text-xs mt-2"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex gap-3.5"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{item.product.name}</h4>
                            <span className="text-sm font-extrabold text-slate-900 tabular-nums shrink-0">
                              ${item.totalPrice.toFixed(2)}
                            </span>
                          </div>
                          {item.selectedCustomizations.length > 0 && (
                            <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                              {item.selectedCustomizations.map((c) => c.optionName).join(', ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
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
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Input */}
                  <div className="pt-2">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-emerald-700" />
                          <div>
                            <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                            <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                          </div>
                        </div>
                        <button onClick={removePromoCode} className="text-slate-400 hover:text-red-500 text-xs font-semibold">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. GREEN20)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                        />
                        <button type="submit" className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && <p className="text-[11px] text-red-500 mt-1">{promoError}</p>}
                  </div>
                </>
              )}
            </div>

            {/* Financial Summary */}
            {cart.length > 0 && (
              <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span>Meal Total</span>
                    <span className="font-bold text-slate-900 tabular-nums">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {creditApplied > 0 && (
                    <div className="flex justify-between font-bold text-emerald-700">
                      <span>NovaTech Corporate Credit</span>
                      <span className="tabular-nums">-${creditApplied.toFixed(2)}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between font-medium text-emerald-700">
                      <span>Promo Discount</span>
                      <span className="tabular-nums">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-medium">
                    <span>Taxes & Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`} + ${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>You Pay</span>
                    <span className="text-xl text-emerald-700 tabular-nums">${totalAmountToPay.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Only the excess amount is charged to your personal card.</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Place Lunch Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
