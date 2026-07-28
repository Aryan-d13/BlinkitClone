import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors, spacing, radii, typography, shadows, minTouchTarget } from '../theme/tokens';

const SLOTS = [
  { id: 'express', label: '30-45 Mins', sub: 'Express Delivery', icon: '⚡' },
  { id: 'evening', label: '6 PM - 8 PM', sub: 'Evening Slot', icon: '🌆' },
  { id: 'tomorrow', label: '9 AM - 11 AM', sub: 'Tomorrow Morning', icon: '🌅' },
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI (PhonePe / GPay)', icon: '📱' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
];

const TIP_OPTIONS = [0, 20, 30, 50];

export const CheckoutScreen: React.FC<any> = ({ navigation }) => {
  const { selectedAddress, placeOrder, totalAmountToPay, totalCartItemCount } = useApp();
  const [selectedSlot, setSelectedSlot] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [tip, setTip] = useState(20);

  const handlePlaceOrder = () => {
    const slotLabel = SLOTS.find((s) => s.id === selectedSlot)?.label || '';
    const pmLabel = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label || '';
    const order = placeOrder(slotLabel, pmLabel, tip);
    navigation.replace('OrderSuccess', { orderId: order.id });
  };

  const finalAmount = totalAmountToPay + tip;

  return (
    <ScreenWrapper>
      <AppBar
        title="Checkout"
        subtitle={`${totalCartItemCount} items`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <Text style={styles.sectionLabel}>DELIVERY ADDRESS</Text>
        <Card variant="surface" style={styles.cardMargin}>
          <View style={styles.addressRow}>
            <View style={styles.addressIcon}>
              <Text style={{ fontSize: 16 }}>📍</Text>
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>{selectedAddress.name}</Text>
              <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
              <Text style={styles.addressStreet}>
                {selectedAddress.street}, {selectedAddress.city}
              </Text>
              <Text style={styles.addressPhone}>{selectedAddress.phone}</Text>
            </View>
          </View>
        </Card>

        {/* Delivery Slot */}
        <Text style={styles.sectionLabel}>DELIVERY SLOT</Text>
        <View style={styles.cardMargin}>
          {SLOTS.map((slot) => {
            const isActive = selectedSlot === slot.id;
            return (
              <TouchableOpacity
                key={slot.id}
                style={[styles.optionRow, isActive && styles.optionRowActive]}
                activeOpacity={0.8}
                onPress={() => setSelectedSlot(slot.id)}
              >
                <Text style={styles.optionIcon}>{slot.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isActive && styles.optionLabelActive]}>
                    {slot.label}
                  </Text>
                  <Text style={[styles.optionSub, isActive && styles.optionSubActive]}>
                    {slot.sub}
                  </Text>
                </View>
                <View style={[styles.radio, isActive && styles.radioActive]}>
                  {isActive && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Driver Tip */}
        <Text style={styles.sectionLabel}>DELIVERY PARTNER TIP</Text>
        <View style={styles.tipRow}>
          {TIP_OPTIONS.map((amount) => {
            const isActive = tip === amount;
            return (
              <TouchableOpacity
                key={amount}
                style={[styles.tipChip, isActive && styles.tipChipActive]}
                onPress={() => setTip(amount)}
              >
                <Text style={[styles.tipText, isActive && styles.tipTextActive]}>
                  {amount === 0 ? 'Skip' : `₹${amount}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionLabel}>PAYMENT</Text>
        <View style={styles.cardMargin}>
          {PAYMENT_METHODS.map((pm) => {
            const isActive = paymentMethod === pm.id;
            return (
              <TouchableOpacity
                key={pm.id}
                style={[styles.optionRow, isActive && styles.optionRowActive]}
                activeOpacity={0.8}
                onPress={() => setPaymentMethod(pm.id)}
              >
                <Text style={styles.optionIcon}>{pm.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, isActive && styles.optionLabelActive]}>
                    {pm.label}
                  </Text>
                </View>
                <View style={[styles.radio, isActive && styles.radioActive]}>
                  {isActive && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.stickyCta}>
        <View>
          <Text style={styles.stickyTotal}>₹{finalAmount.toFixed(0)}</Text>
          <Text style={styles.stickyLabel}>Total payable</Text>
        </View>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          variant="gold"
          size="lg"
          style={{ flex: 1, marginLeft: spacing.base }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: spacing.base,
  },
  sectionLabel: {
    ...typography.captionBold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  cardMargin: {
    marginBottom: spacing.sm,
  },
  addressRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.goldTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  addressLabel: {
    ...typography.captionBold,
    color: colors.goldDeep,
    marginTop: 1,
  },
  addressStreet: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addressPhone: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  // Option rows (slots + payments)
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    minHeight: minTouchTarget + 8,
  },
  optionRowActive: {
    backgroundColor: colors.obsidian,
    borderColor: colors.borderGoldStrong,
  },
  optionIcon: {
    fontSize: 18,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  optionLabelActive: {
    color: colors.goldSoft,
  },
  optionSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  optionSubActive: {
    color: 'rgba(255,255,255,0.5)',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.gold,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
  },
  // Tip
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tipChip: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: minTouchTarget,
    justifyContent: 'center',
  },
  tipChipActive: {
    backgroundColor: colors.obsidian,
    borderColor: colors.borderGoldStrong,
  },
  tipText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  tipTextActive: {
    color: colors.goldSoft,
  },
  // Sticky CTA
  stickyCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.high,
  },
  stickyTotal: {
    ...typography.title,
    color: colors.textPrimary,
    fontWeight: '900',
  },
  stickyLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
