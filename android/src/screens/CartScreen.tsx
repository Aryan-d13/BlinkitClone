import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC<any> = ({ navigation }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    tax,
    totalAmountToPay,
    totalCartItemCount,
  } = useApp();

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>🛍️</Text>
        <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
        <Text style={styles.emptyDesc}>Explore DC Stores aesthetic tumblers, journals, books & gifts.</Text>
        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => navigation.navigate('Store')}
        >
          <Text style={styles.browseBtnText}>Explore Store Catalog</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag ({totalCartItemCount})</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {cart.map((item) => (
          <View key={item.cartItemId} style={styles.cartItemCard}>
            <Image source={{ uri: item.product.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemCategory}>{item.product.categoryName}</Text>
              <Text style={styles.itemPrice}>₹{item.unitPrice.toFixed(0)}</Text>
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Bill Breakdown</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Subtotal</Text>
            <Text style={styles.summaryValue}>₹{cartSubtotal.toFixed(0)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Express Delivery (Shajapur)</Text>
            <Text style={styles.summaryValue}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST & Service Tax</Text>
            <Text style={styles.summaryValue}>₹{tax.toFixed(0)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalAmountToPay.toFixed(0)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout →</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseBtnText: {
    color: '#0F1219',
    fontWeight: '800',
    fontSize: 13,
  },
  header: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  cartItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0F1219',
  },
  itemCategory: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  itemPrice: {
    fontWeight: '800',
    fontSize: 13,
    color: '#0F1219',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    paddingHorizontal: 6,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F1219',
  },
  qtyText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0F1219',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryTitle: {
    fontWeight: '900',
    fontSize: 15,
    color: '#0F1219',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  summaryValue: {
    fontWeight: 'bold',
    color: '#0F1219',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  totalLabel: {
    fontWeight: '900',
    color: '#0F1219',
    fontSize: 14,
  },
  totalValue: {
    fontWeight: '900',
    color: '#B8860B',
    fontSize: 16,
  },
  checkoutBtn: {
    backgroundColor: '#0F1219',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  checkoutBtnText: {
    color: '#F4E8C1',
    fontWeight: '900',
    fontSize: 14,
  },
});
