import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Product,
  CartItem,
  SelectedCustomization,
  UserProfile,
  Address,
  Order,
  PromoCode,
} from '../types';
import { INITIAL_USER, SAVED_ADDRESSES, INITIAL_ORDERS, PROMO_CODES } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  user: UserProfile;
  cart: CartItem[];
  wishlist: string[];
  addresses: Address[];
  selectedAddress: Address;
  orders: Order[];
  appliedPromo: PromoCode | null;
  toasts: Toast[];
  
  addToCart: (product: Product, customizations?: SelectedCustomization[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  placeOrder: (deliverySlot: string, paymentMethodName: string, tipAmount: number) => Order;
  
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  cartSubtotal: number;
  promoDiscount: number;
  deliveryFee: number;
  tax: number;
  totalAmountToPay: number;
  totalCartItemCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<UserProfile>(INITIAL_USER);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['p_t1', 'p_st1']);
  const [addresses, setAddresses] = useState<Address[]>(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('@dc_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
        const savedWishlist = await AsyncStorage.getItem('@dc_wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to load AsyncStorage state', e);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('@dc_cart', JSON.stringify(cart));
        await AsyncStorage.setItem('@dc_wishlist', JSON.stringify(wishlist));
      } catch (e) {
        console.error('Failed to save to AsyncStorage', e);
      }
    };
    saveState();
  }, [cart, wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product, customizations: SelectedCustomization[] = []) => {
    const customPriceAddon = customizations.reduce((acc, c) => acc + c.price, 0);
    const unitPrice = product.price + customPriceAddon;

    setCart((prevCart) => {
      const customKey = customizations.map((c) => c.optionId).sort().join(',');
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedCustomizations.map((c) => c.optionId).sort().join(',') === customKey
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + 1;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: `ci_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity: 1,
          selectedCustomizations: customizations,
          unitPrice,
          totalPrice: unitPrice,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${product.name} to bag!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity,
            totalPrice: quantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const created: Address = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    setAddresses((prev) => [...prev, created]);
    setSelectedAddress(created);
    showToast('Delivery address added!', 'success');
  };

  const applyPromoCode = (code: string) => {
    const found = PROMO_CODES.find((p) => p.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid promo code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minOrderValue} required.`,
      };
    }
    setAppliedPromo(found);
    showToast(`Promo code ${found.code} applied!`, 'success');
    return { success: true, message: `Promo code ${found.code} applied!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalCartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      promoDiscount = (cartSubtotal * appliedPromo.discountValue) / 100;
    } else {
      promoDiscount = appliedPromo.discountValue;
    }
  }

  const deliveryFee = cartSubtotal > 0 && cartSubtotal >= 499 ? 0 : cartSubtotal > 0 ? 30 : 0;
  const taxableAmount = Math.max(0, cartSubtotal - promoDiscount);
  const tax = cartSubtotal > 0 ? Number((taxableAmount * 0.05).toFixed(2)) : 0;

  const totalAmountToPay = Math.max(
    0,
    Number((cartSubtotal - promoDiscount + deliveryFee + tax).toFixed(2))
  );

  const placeOrder = (deliverySlot: string, paymentMethodName: string, tipAmount: number): Order => {
    const newOrder: Order = {
      id: `ORD-DC${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      tip: tipAmount,
      deliveryFee,
      tax,
      discount: promoDiscount,
      totalPaid: Number((totalAmountToPay + tipAmount).toFixed(2)),
      status: 'placed',
      address: selectedAddress,
      paymentMethod: paymentMethodName,
      deliverySlot,
      driverName: 'Vikram Singh',
      driverPhone: '+91 94250 99887',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        wishlist,
        addresses,
        selectedAddress,
        orders,
        appliedPromo,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setSelectedAddress,
        addAddress,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        showToast,
        cartSubtotal,
        promoDiscount,
        deliveryFee,
        tax,
        totalAmountToPay,
        totalCartItemCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
