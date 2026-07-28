import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { GoldButton } from '../components/GoldButton';

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
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Express Checkout" showBack={true} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Address Card */}
        <DoppelCard variant="light" style={styles.cardMargin}>
          <Text style={styles.cardTitle}>📍 Delivery Address (Shajapur)</Text>
          <Text style={styles.addressName}>{selectedAddress.name} ({selectedAddress.label})</Text>
          <Text style={styles.addressStreet}>{selectedAddress.street}, {selectedAddress.city}</Text>
          <Text style={styles.addressPhone}>Phone: {selectedAddress.phone}</Text>
        </DoppelCard>

        {/* Slot Selector */}
        <DoppelCard variant="light" style={styles.cardMargin}>
          <Text style={styles.cardTitle}>⏱️ Select Delivery Slot</Text>
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
        </DoppelCard>

        {/* Delivery Partner Tip */}
        <DoppelCard variant="light" style={styles.cardMargin}>
          <Text style={styles.cardTitle}>🤝 Delivery Driver Tip (Shajapur Partner)</Text>
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
        </DoppelCard>

        {/* Payment Method */}
        <DoppelCard variant="dark" style={styles.cardMargin}>
          <Text style={styles.darkCardTitle}>💳 Select Payment Method</Text>
          {[
            'Instant UPI (PhonePe / GPay / Paytm)',
            'Cash on Delivery (COD Shajapur)',
            'Credit / Debit Card',
          ].map((pm) => {
            const isSelected = paymentMethod === pm;
            return (
              <TouchableOpacity
                key={pm}
                style={[styles.darkSlotOption, isSelected && styles.darkSlotOptionActive]}
                onPress={() => setPaymentMethod(pm)}
              >
                <Text style={[styles.darkSlotText, isSelected && styles.darkSlotTextActive]}>{pm}</Text>
              </TouchableOpacity>
            );
          })}
        </DoppelCard>

        {/* Place Order CTA */}
        <GoldButton
          title={`Confirm & Pay ₹${(totalAmountToPay + tip).toFixed(0)} →`}
          onPress={handlePlaceOrder}
          variant="gold"
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
  scroll: {
    flex: 1,
    padding: 16,
  },
  cardMargin: {
    marginBottom: 14,
  },
  cardTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
    marginBottom: 10,
  },
  darkCardTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: '#F4E8C1',
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
    borderRadius: 14,
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
    fontWeight: '900',
  },
  darkSlotOption: {
    backgroundColor: '#1E2330',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  darkSlotOptionActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  darkSlotText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  darkSlotTextActive: {
    color: '#0F1219',
    fontWeight: '900',
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipChip: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tipChipActive: {
    backgroundColor: '#0F1219',
    borderColor: '#0F1219',
  },
  tipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F1219',
  },
  tipTextActive: {
    color: '#F4E8C1',
    fontWeight: '900',
  },
});
