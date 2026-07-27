'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SITE_CONTENT } from '@/config/siteContent';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
  Gift,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders } = useApp();

  const order = orders.find((o) => o.id === orderId) || orders[0];
  const [secondsRemaining, setSecondsRemaining] = useState(2400);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto py-4">
      
      {/* Top Banner */}
      <div className="doppel-shell p-2">
        <div className="doppel-core p-8 bg-slate-900 text-white text-center space-y-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md text-amber-400 flex items-center justify-center mx-auto border border-white/20">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Order #{order.id} Confirmed
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{SITE_CONTENT.orderSuccess.headline}</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {SITE_CONTENT.orderSuccess.subtitle}
          </p>

          <div className="pt-2 inline-flex items-center gap-3 bg-slate-950/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">{SITE_CONTENT.orderSuccess.arrivalLabel}</span>
              <span className="text-lg font-black font-mono tracking-wider tabular-nums">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds} mins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Stepper */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400 block flex items-center gap-2">
          <Gift className="w-4 h-4 text-emerald-700" /> {SITE_CONTENT.orderSuccess.stepperEyebrow}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {order.trackingSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                step.completed
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase font-bold">Step 0{idx + 1}</span>
                {step.completed && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
              </div>
              <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Driver & Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <Image
                src={order.driverAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'}
                alt={order.driverName || 'Driver'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">{SITE_CONTENT.orderSuccess.riderTitle}</span>
              <h4 className="font-bold text-sm text-slate-900">{order.driverName}</h4>
              <span className="text-xs text-emerald-700 font-semibold">{SITE_CONTENT.orderSuccess.riderSub}</span>
            </div>
          </div>

          <a
            href={`tel:${order.driverPhone}`}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400">{SITE_CONTENT.orderSuccess.deliveringTo}</span>
            <h4 className="font-bold text-slate-900">{order.address.label} - {order.address.name}</h4>
            <p className="text-slate-500 line-clamp-1">{order.address.street}, {order.address.city}</p>
          </div>
        </div>
      </div>

      {/* Itemized Receipt */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm">{SITE_CONTENT.orderSuccess.receiptTitle}</h3>
          <span className="text-xs text-slate-400">Payment: {order.paymentMethod}</span>
        </div>

        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-700 w-5 tabular-nums">{item.quantity}x</span>
                <div>
                  <span className="font-bold text-slate-900">{item.product.name}</span>
                </div>
              </div>
              <span className="font-bold text-slate-900 tabular-nums">₹{item.totalPrice.toFixed(0)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>{SITE_CONTENT.orderSuccess.subtotalLabel}</span>
            <span className="font-bold text-slate-900 tabular-nums">₹{order.subtotal.toFixed(0)}</span>
          </div>

          <div className="flex justify-between">
            <span>{SITE_CONTENT.orderSuccess.taxDeliveryLabel}</span>
            <span className="tabular-nums">₹{(order.tax + order.deliveryFee).toFixed(0)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
            <span>{SITE_CONTENT.orderSuccess.totalPaidLabel}</span>
            <span className="text-lg text-emerald-700 tabular-nums">₹{order.totalPaid.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Return Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
        >
          {SITE_CONTENT.orderSuccess.homeBtn}
        </Link>

        <Link href="/orders" className="btn-accent-pill text-xs px-6 py-3">
          <span>{SITE_CONTENT.orderSuccess.ordersBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
