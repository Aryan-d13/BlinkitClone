'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PAYMENT_OPTIONS } from '@/data/mockData';
import { SITE_CONTENT } from '@/config/siteContent';
import {
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    addresses,
    selectedAddress,
    setSelectedAddress,
    cartSubtotal,
    promoDiscount,
    deliveryFee,
    tax,
    totalAmountToPay,
    placeOrder,
  } = useApp();

  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(PAYMENT_OPTIONS[0].id);
  const [deliverySlot, setDeliverySlot] = useState<string>('30-45 Mins Express');
  const [upiVpa, setUpiVpa] = useState<string>('rahul@upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No items in checkout</h2>
        <button
          onClick={() => router.push('/products')}
          className="btn-accent-pill text-xs"
        >
          Browse Store
        </button>
      </div>
    );
  }

  const selectedPaymentObj = PAYMENT_OPTIONS.find((p) => p.id === selectedPaymentId) || PAYMENT_OPTIONS[0];

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      const order = placeOrder(deliverySlot, selectedPaymentObj.name, 20);
      router.push(`/order-success/${order.id}`);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> {SITE_CONTENT.checkout.eyebrow}
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{SITE_CONTENT.checkout.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Options Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" /> {SITE_CONTENT.checkout.step1Title}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{addr.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-xs font-bold">{addr.name}</p>
                    <p className={`text-[11px] line-clamp-2 mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {addr.street}, {addr.city}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Slot */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" /> {SITE_CONTENT.checkout.step2Title}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { slot: '30-45 Mins Express', title: 'Standard Express', desc: 'Shajapur Town Delivery' },
                { slot: 'Scheduled Evening (5-7 PM)', title: 'Scheduled Evening', desc: 'Gift Wrap Handover' },
                { slot: 'Express Priority (15-30 Min)', title: 'Priority Dispatch', desc: 'Direct Courier' },
              ].map((item) => (
                <button
                  key={item.slot}
                  type="button"
                  onClick={() => setDeliverySlot(item.slot)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    deliverySlot === item.slot
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold">{item.title}</div>
                  <div className={`text-[11px] font-mono font-bold mt-0.5 ${deliverySlot === item.slot ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {item.slot}
                  </div>
                  <div className={`text-[10px] mt-1 ${deliverySlot === item.slot ? 'text-slate-400' : 'text-slate-400'}`}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Options */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-700" /> {SITE_CONTENT.checkout.step3Title}
            </span>

            <div className="space-y-2.5">
              {PAYMENT_OPTIONS.map((pay) => {
                const isSelected = selectedPaymentId === pay.id;
                return (
                  <button
                    key={pay.id}
                    type="button"
                    onClick={() => setSelectedPaymentId(pay.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        {pay.type === 'upi' && <Smartphone className="w-4.5 h-4.5 text-blue-600" />}
                        {pay.type === 'cod' && <Wallet className="w-4.5 h-4.5 text-emerald-600" />}
                        {pay.type === 'card' && <CreditCard className="w-4.5 h-4.5 text-purple-600" />}
                        {pay.type === 'netbanking' && <Building2 className="w-4.5 h-4.5 text-amber-600" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{pay.name}</span>
                          {pay.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white font-mono text-[9px] uppercase font-bold">
                              {pay.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{pay.details}</p>
                      </div>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {selectedPaymentObj.type === 'upi' && (
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs space-y-2">
                <label className="font-bold text-slate-800 block">{SITE_CONTENT.checkout.upiLabel}</label>
                <input
                  type="text"
                  value={upiVpa}
                  onChange={(e) => setUpiVpa(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs focus:ring-1 focus:ring-slate-900"
                />
              </div>
            )}

          </div>

        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xl space-y-5 sticky top-24">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Final Order Breakdown
            </h2>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between font-medium">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold text-slate-900 tabular-nums">₹{cartSubtotal.toFixed(0)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between font-medium text-emerald-700">
                  <span>Promo Discount</span>
                  <span className="tabular-nums">-₹{promoDiscount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between font-medium">
                <span>GST Taxes & Delivery</span>
                <span className="tabular-nums">₹{(tax + deliveryFee).toFixed(0)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-base font-black text-slate-900">
                <span>Total Due</span>
                <span className="text-xl text-emerald-700 tabular-nums">₹{totalAmountToPay.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{SITE_CONTENT.checkout.simNotice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? SITE_CONTENT.checkout.submittingBtn : SITE_CONTENT.checkout.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
