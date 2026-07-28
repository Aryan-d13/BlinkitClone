import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { GoldButton } from '../components/GoldButton';

export const CartScreen: React.FC<any> = ({ navigation }) => {
  const {
    cart,
    updateQuantity,
    cartSubtotal,
    deliveryFee,
    tax,
    totalAmountToPay,
    totalCartItemCount,
  } = useApp();

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderBar navigation={navigation} title="Shopping Bag" showBack={true} />
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 44, marginBottom: 12 }}>🛍️</Text>
          <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
          <Text style={styles.emptyDesc}>Explore DC Stores aesthetic tumblers, leather journals, books & custom gift hampers.</Text>
          <GoldButton
            title="Explore Store Catalog"
            onPress={() => navigation.navigate('Products')}
            variant="gold"
            size="lg"
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title={`Shopping Bag (${totalCartItemCount})`} showBack={true} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <DoppelCard key={item.cartItemId} variant="light" style={styles.itemCardMargin}>
            <View style={styles.cartItemRow}>
              <Image source={{ uri: item.product.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                <Text style={styles.itemCategory}>{item.product.categoryName}</Text>
                <Text style={styles.itemPrice}>₹{item.unitPrice.toFixed(0)}</Text>
              </View>

              <View style={styles.qtyPill}>
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
          </DoppelCard>
        ))}

        {/* Financial Summary Doppel Card */}
        <DoppelCard variant="gold" style={styles.summaryMargin}>
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
        </DoppelCard>

        <GoldButton
          title="Proceed to Express Checkout →"
          onPress={() => navigation.navigate('Checkout')}
          variant="dark"
          size="lg"
          style={{ marginBottom: 40 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  itemCardMargin: {
    marginBottom: 12,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
    marginTop: 4,
  },
  qtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F1219',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  qtyBtn: {
    paddingHorizontal: 6,
  },
  qtyBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F4E8C1',
  },
  qtyText: {
    fontWeight: '900',
    fontSize: 13,
    color: '#FFFFFF',
  },
  summaryMargin: {
    marginTop: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontWeight: '900',
    fontSize: 16,
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
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    marginVertical: 10,
  },
  totalLabel: {
    fontWeight: '900',
    color: '#0F1219',
    fontSize: 15,
  },
  totalValue: {
    fontWeight: '900',
    color: '#B8860B',
    fontSize: 18,
  },
});
