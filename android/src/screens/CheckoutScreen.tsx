import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC<any> = ({ navigation }) => {
  const { selectedAddress, placeOrder, totalAmountToPay } = useApp();
  const [selectedSlot, setSelectedSlot] = useState('30-45 Mins Express Delivery');
  const [paymentMethod, setPaymentMethod] = useState('Instant UPI (PhonePe / GPay / Paytm)');
  const [tip, setTip] = useState(20);

  const handlePlaceOrder = () => {
    const createdOrder = placeOrder(selectedSlot, paymentMethod, tip);
    navigation.replace('OrderSuccess', { orderId: createdOrder.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout & Payment</Text>
      </View>

      <ScrollView style={styles.scroll}>
        
        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Address (Shajapur)</Text>
          <Text style={styles.addressName}>{selectedAddress.name} ({selectedAddress.label})</Text>
          <Text style={styles.addressStreet}>{selectedAddress.street}, {selectedAddress.city}</Text>
          <Text style={styles.addressPhone}>Phone: {selectedAddress.phone}</Text>
        </View>

        {/* Slot Selector */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Delivery Slot</Text>
          {['30-45 Mins Express Delivery', 'Standard Evening Slot (6 PM - 8 PM)', 'Tomorrow Morning (9 AM - 11 AM)'].map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.slotOption, isSelected && styles.slotOptionActive]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotText, isSelected && styles.slotTextActive]}>{slot}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Delivery Partner Tip */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Driver Tip (Shajapur Partner)</Text>
          <View style={styles.tipRow}>
            {[0, 20, 30, 50].map((amount) => {
              const isSelected = tip === amount;
              return (
                <TouchableOpacity
                  key={amount}
                  style={[styles.tipChip, isSelected && styles.tipChipActive]}
                  onPress={() => setTip(amount)}
                >
                  <Text style={[styles.tipText, isSelected && styles.tipTextActive]}>
                    {amount === 0 ? 'No Tip' : `₹${amount}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          {[
            'Instant UPI (PhonePe / GPay / Paytm)',
            'Cash on Delivery (COD Shajapur)',
            'Credit / Debit Card',
          ].map((pm) => {
            const isSelected = paymentMethod === pm;
            return (
              <TouchableOpacity
                key={pm}
                style={[styles.slotOption, isSelected && styles.slotOptionActive]}
                onPress={() => setPaymentMethod(pm)}
              >
                <Text style={[styles.slotText, isSelected && styles.slotTextActive]}>{pm}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Place Order CTA */}
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderBtnText}>
            Confirm & Pay ₹{(totalAmountToPay + tip).toFixed(0)} →
          </Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
    marginBottom: 10,
  },
  addressName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0F1219',
  },
  addressStreet: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  addressPhone: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  slotOption: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  slotOptionActive: {
    backgroundColor: '#0F1219',
    borderColor: '#0F1219',
  },
  slotText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  slotTextActive: {
    color: '#F4E8C1',
    fontWeight: 'bold',
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipChip: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tipChipActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  tipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F1219',
  },
  tipTextActive: {
    color: '#0F1219',
  },
  placeOrderBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  placeOrderBtnText: {
    color: '#0F1219',
    fontWeight: '900',
    fontSize: 15,
  },
});
