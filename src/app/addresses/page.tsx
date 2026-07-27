'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Plus, Trash2, CheckCircle2, Building, Home } from 'lucide-react';

export default function AddressesPage() {
  const { addresses, selectedAddress, setSelectedAddress, addAddress, deleteAddress } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState<'Home' | 'Work' | 'HQ' | 'Other'>('Work');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('San Francisco');
  const [zipCode, setZipCode] = useState('94107');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street.trim()) return;
    addAddress({
      label,
      name: 'Arif Hossain',
      phone: '+1 (555) 382-9102',
      street,
      apartment,
      city,
      state: 'CA',
      zipCode,
      isDefault: false,
    });
    setIsModalOpen(false);
    setStreet('');
    setApartment('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-emerald-700 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Delivery Locations
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Saved Addresses</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-accent-pill text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => {
          const isSelected = selectedAddress.id === addr.id;
          return (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white border-slate-200/70 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-white/10 text-emerald-400 border-white/20'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {addr.label === 'Work' || addr.label === 'HQ' ? (
                      <Building className="w-3.5 h-3.5" />
                    ) : (
                      <Home className="w-3.5 h-3.5" />
                    )}
                    {addr.label}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Active Delivery Location
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base">{addr.name}</h3>
                <p className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {addr.street}
                </p>
                {addr.apartment && (
                  <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                    {addr.apartment}
                  </p>
                )}
                <p className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                  {addr.city}, {addr.state} {addr.zipCode}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/40 flex items-center justify-between text-xs font-bold">
                {!isSelected ? (
                  <button
                    onClick={() => setSelectedAddress(addr)}
                    className="text-emerald-700 hover:text-emerald-800"
                  >
                    Set Active
                  </button>
                ) : (
                  <span className="text-emerald-400 font-mono text-[10px] uppercase">Active Target</span>
                )}

                {addresses.length > 1 && (
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className={`p-1 ${isSelected ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-md w-full space-y-4 border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Add New Delivery Address</h3>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location Type</label>
                <div className="flex gap-2">
                  {(['Work', 'Home', 'HQ', 'Other'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLabel(l)}
                      className={`px-3 py-1.5 rounded-xl border font-bold ${
                        label === l
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 450 Innovation Parkway"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Suite / Floor (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Suite 402"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent-pill text-xs px-5 py-2">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
