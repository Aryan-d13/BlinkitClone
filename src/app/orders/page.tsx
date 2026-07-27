'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { History, CheckCircle2, RefreshCw, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const { orders, addToCart } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
          <History className="w-4 h-4" /> Activity History
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Corporate Lunch Receipts</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 space-y-3">
          <p className="text-slate-500 font-bold text-sm">No previous order records found.</p>
          <Link href="/products" className="btn-accent-pill text-xs">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm font-mono">Order #{ord.id}</span>
                  <span className="text-slate-400 font-mono ml-3">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] uppercase font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 text-xs">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-mono text-[11px]">Total Paid: </span>
                  <strong className="text-slate-900 text-sm tabular-nums">${ord.totalPaid.toFixed(2)}</strong>
                  {ord.creditApplied > 0 && (
                    <span className="text-emerald-700 font-bold ml-2">
                      (${ord.creditApplied.toFixed(2)} Credit Covered)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      ord.items.forEach((ci) => addToCart(ci.product, ci.selectedCustomizations));
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reorder
                  </button>

                  <Link
                    href={`/order-success/${ord.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Receipt</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
