import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { CartItemRow } from '../components/CartItemRow';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, radii, shadows } from '../theme/tokens';

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
      <ScreenWrapper>
        <AppBar title="Shopping Bag" onBack={() => navigation.goBack()} />
        <EmptyState
          emoji="🛍️"
          title="Your Bag is Empty"
          description="Add aesthetic tumblers, journals, books & custom gift hampers to your bag."
          actionLabel="Explore Catalog"
          onAction={() => {
            navigation.goBack();
            navigation.navigate('Products');
          }}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <AppBar
        title="Shopping Bag"
        subtitle={`${totalCartItemCount} item${totalCartItemCount > 1 ? 's' : ''}`}
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartItemId}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItemRow item={item} onUpdateQty={updateQuantity} />
        )}
        ListFooterComponent={
          <View>
            {/* Bill Breakdown */}
            <Card variant="goldTint" style={styles.billCard}>
              <Text style={styles.billTitle}>Bill Summary</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Subtotal</Text>
                <Text style={styles.billValue}>₹{cartSubtotal.toFixed(0)}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Express Delivery</Text>
                <Text style={[styles.billValue, deliveryFee === 0 && styles.freeText]}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>GST & Tax</Text>
                <Text style={styles.billValue}>₹{tax.toFixed(0)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{totalAmountToPay.toFixed(0)}</Text>
              </View>
            </Card>

            <View style={{ height: 100 }} />
          </View>
        }
      />

      {/* Sticky CTA */}
      <View style={styles.stickyCta}>
        <View>
          <Text style={styles.stickyTotal}>₹{totalAmountToPay.toFixed(0)}</Text>
          <Text style={styles.stickyLabel}>incl. taxes</Text>
        </View>
        <Button
          title="Checkout"
          onPress={() => navigation.navigate('Checkout')}
          variant="gold"
          size="lg"
          style={{ flex: 1, marginLeft: spacing.base }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.base,
  },
  billCard: {
    marginTop: spacing.sm,
  },
  billTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  billLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  billValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  freeText: {
    color: colors.success,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGold,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: '900',
  },
  totalValue: {
    ...typography.headline,
    color: colors.goldDeep,
    fontSize: 22,
  },
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
