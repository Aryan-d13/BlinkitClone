import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors, spacing, radii, typography } from '../theme/tokens';
import { CommonActions } from '@react-navigation/native';

const STEPS = [
  { label: 'Order Placed', desc: 'Your order has been confirmed', done: true },
  { label: 'Packing', desc: 'Wrapping with care & quality check', done: true },
  { label: 'Out for Delivery', desc: 'Vikram Singh is on the way', done: false },
  { label: 'Delivered', desc: 'Enjoy your purchase!', done: false },
];

export const OrderSuccessScreen: React.FC<any> = ({ route, navigation }) => {
  const { orderId } = route?.params || {};
  const { orders } = useApp();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handleContinue = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration */}
        <View style={styles.celebration}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <View style={styles.confirmBadge}>
          <Text style={styles.confirmBadgeText}>ORDER CONFIRMED</Text>
        </View>

        <Text style={styles.thankYou}>Thank You!</Text>
        {order && (
          <Text style={styles.orderId}>
            {order.id} · ₹{order.totalPaid.toFixed(0)}
          </Text>
        )}

        {/* Delivery Stepper */}
        <Card variant="dark" style={styles.stepperCard}>
          <Text style={styles.stepperTitle}>⚡ Live Delivery Tracker</Text>

          {STEPS.map((step, idx) => (
            <View key={step.label}>
              <View style={styles.stepRow}>
                <View style={[styles.stepDot, step.done && styles.stepDotDone]} />
                <View style={styles.stepContent}>
                  <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>
                    {step.label}
                  </Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
              {idx < STEPS.length - 1 && (
                <View style={[styles.stepLine, step.done && styles.stepLineDone]} />
              )}
            </View>
          ))}
        </Card>

        {/* Driver Info */}
        {order?.driverName && (
          <Card variant="surface" style={styles.driverCard}>
            <View style={styles.driverRow}>
              <View style={styles.driverAvatar}>
                <Text style={{ fontSize: 20 }}>🏍️</Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{order.driverName}</Text>
                <Text style={styles.driverPhone}>{order.driverPhone}</Text>
              </View>
              <View style={styles.callBtn}>
                <Text style={{ fontSize: 16 }}>📞</Text>
              </View>
            </View>
          </Card>
        )}

        <Button
          title="Continue Shopping"
          onPress={handleContinue}
          variant="gold"
          size="lg"
          fullWidth
          style={styles.continueBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.base,
    alignItems: 'center',
  },
  celebration: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing['2xl'],
    marginBottom: spacing.base,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  checkmark: {
    fontSize: 32,
    color: colors.obsidian,
    fontWeight: '900',
  },
  confirmBadge: {
    backgroundColor: colors.goldTint,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  confirmBadgeText: {
    ...typography.captionBold,
    color: colors.goldDeep,
    letterSpacing: 1.5,
  },
  thankYou: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  orderId: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  stepperCard: {
    width: '100%',
    marginBottom: spacing.base,
  },
  stepperTitle: {
    ...typography.subtitle,
    color: colors.gold,
    marginBottom: spacing.lg,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#334155',
    marginTop: 2,
  },
  stepDotDone: {
    backgroundColor: colors.gold,
  },
  stepContent: {
    flex: 1,
  },
  stepLabel: {
    ...typography.bodyBold,
    color: 'rgba(255,255,255,0.5)',
  },
  stepLabelDone: {
    color: colors.textOnDark,
  },
  stepDesc: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  stepLine: {
    width: 2,
    height: 24,
    backgroundColor: '#334155',
    marginLeft: 9,
    marginVertical: spacing.xs,
  },
  stepLineDone: {
    backgroundColor: colors.gold,
  },
  driverCard: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  driverPhone: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.goldTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  continueBtn: {
    marginBottom: spacing['2xl'],
  },
});
