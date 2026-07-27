'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Tag,
  HeartHandshake,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    promoDiscount,
    deliveryFee,
    tax,
    totalAmountToPay,
    totalCartItemCount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useApp();

  const [tip, setTip] = useState(20);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) setPromoError(res.message);
    else setPromoInput('');
  };

  const finalPayWithTip = Number((totalAmountToPay + tip).toFixed(2));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> DC Stores Express Review
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Review Your Bag</h1>
        </div>
        <Link
          href="/products"
          className="px-4 py-2 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
        >
          + Add More Items
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your shopping bag is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore our collection of aesthetic tumblers, leather journals, books, and gift hampers.
          </p>
          <Link href="/products" className="btn-accent-pill text-xs">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Items List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block border-b border-slate-100 pb-3">
                Selected Store Items ({totalCartItemCount})
              </span>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex gap-4 items-center"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold text-slate-900">{item.product.name}</h3>
                          <span className="text-base font-extrabold text-slate-900 tabular-nums">
                            ₹{item.totalPrice.toFixed(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60">
                        <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-xs">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-slate-900 w-4 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-emerald-700 hover:text-emerald-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-red-500 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rider Tip */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400">
                  Delivery Rider Tip
                </span>
              </div>
              <p className="text-xs text-slate-500">100% of tips go directly to your Shajapur express delivery partner.</p>
              <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                {[0, 10, 20, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTip(amt)}
                    className={`py-2 rounded-xl border transition-all ${
                      tip === amt
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {amt === 0 ? 'No Tip' : `₹${amt}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xl space-y-5">
              <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                Order Financial Summary
              </h2>

              {/* Promo Code */}
              <div className="space-y-2">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                        <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                      </div>
                    </div>
                    <button onClick={removePromoCode} className="text-xs text-red-500 font-bold">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. SHAJAPUR10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between font-medium">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-900 tabular-nums">₹{cartSubtotal.toFixed(0)}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between font-medium text-emerald-700">
                    <span>Promo Discount</span>
                    <span className="tabular-nums">-₹{promoDiscount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between font-medium">
                  <span>Shajapur Delivery Fee</span>
                  <span className="text-emerald-700 font-bold">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(0)}`}
                  </span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>GST Tax</span>
                  <span className="tabular-nums">₹{tax.toFixed(0)}</span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between font-medium text-slate-700">
                    <span>Rider Tip</span>
                    <span className="tabular-nums">₹{tip.toFixed(0)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-base font-black text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-xl text-emerald-700 tabular-nums">₹{finalPayWithTip.toFixed(0)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Fast 30-45 Mins Delivery across Shajapur, MP.</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{SITE_CONTENT.cart.proceedToCheckoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
