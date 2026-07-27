'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, SelectedCustomization } from '@/types';
import { useApp } from '@/context/AppContext';
import { X, Plus, Minus, Check, Star, Flame, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useApp();
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const toggleOption = (groupId: string, groupTitle: string, optionId: string, optionName: string, price: number) => {
    setSelectedCustomizations((prev) => {
      const exists = prev.some((c) => c.optionId === optionId);
      if (exists) {
        return prev.filter((c) => c.optionId !== optionId);
      } else {
        return [...prev, { groupId, groupTitle, optionId, optionName, price }];
      }
    });
  };

  const addonTotal = selectedCustomizations.reduce((acc, c) => acc + c.price, 0);
  const unitPrice = product.price + addonTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedCustomizations, specialInstructions);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
          />

          {/* Raycast / Linear Style Command Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden my-auto border border-slate-200/80"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 shadow-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Dish Image */}
            <div className="relative w-full h-52 sm:h-56 bg-slate-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-emerald-700 text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold">
                    {product.categoryName}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" /> {product.rating} ({product.reviewCount}+ reviews)
                  </span>
                </div>
                <h3 className="text-2xl font-black">{product.name}</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[55vh] overflow-y-auto space-y-6 custom-scrollbar">
              
              {/* Macros & Info Chips */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Calories</span>
                  <span className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> {product.calories} kcal
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Prep Time</span>
                  <span className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" /> {product.prepTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Diet</span>
                  <span className="font-bold text-slate-800 capitalize mt-0.5 block">
                    {product.dietType}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block mb-1">
                  About Dish
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Customization Options */}
              {product.customizationGroups && product.customizationGroups.length > 0 && (
                <div className="space-y-4">
                  {product.customizationGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-slate-400">
                          {group.title}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {group.required ? 'Required' : 'Optional'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {group.options.map((opt) => {
                          const isSelected = selectedCustomizations.some((c) => c.optionId === opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleOption(group.id, group.title, opt.id, opt.name, opt.price)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all ${
                                isSelected
                                  ? 'bg-slate-900 border-slate-900 font-bold text-white shadow-xs'
                                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>{opt.name}</span>
                              </div>
                              <span className="font-semibold tabular-nums">
                                {opt.price === 0 ? 'Free' : `+$${opt.price.toFixed(2)}`}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 block">
                  Kitchen Notes (Optional)
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dressing on the side..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
                />
              </div>

            </div>

            {/* Modal Action Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-slate-200">
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
                className="btn-accent-pill text-xs px-6 py-3 flex-1 justify-between shadow-md"
              >
                <span>Add to Lunch</span>
                <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
