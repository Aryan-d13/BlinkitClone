import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem } from '../types';
import { QuantityStepper } from './QuantityStepper';
import { colors, spacing, radii, typography, shadows } from '../theme/tokens';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQty: (cartItemId: string, newQty: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQty }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
        <Text style={styles.category}>{item.product.categoryName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.unitPrice.toFixed(0)}</Text>
          {item.quantity > 1 && (
            <Text style={styles.lineTotal}>
              × {item.quantity} = ₹{item.totalPrice.toFixed(0)}
            </Text>
          )}
        </View>
      </View>

      <QuantityStepper
        quantity={item.quantity}
        onIncrement={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
        onDecrement={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
        size="sm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.low,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.md,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  category: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  lineTotal: {
    ...typography.small,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
});
