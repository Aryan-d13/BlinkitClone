import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  size = 'md',
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.price, sizeStyles[size]]}>₹{price.toFixed(0)}</Text>
      {hasDiscount && (
        <View style={styles.discountRow}>
          <Text style={[styles.original, originalSizeStyles[size]]}>
            ₹{originalPrice.toFixed(0)}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{discountPct}% off</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  price: {
    color: colors.textPrimary,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  original: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    fontVariant: ['tabular-nums'],
  },
  badge: {
    backgroundColor: colors.goldTint,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: 4,
  },
  badgeText: {
    ...typography.caption,
    color: colors.goldDeep,
    fontWeight: '800',
    fontSize: 9,
  },
});

const sizeStyles: Record<string, { fontSize: number }> = {
  sm: { fontSize: 13 },
  md: { fontSize: 16 },
  lg: { fontSize: 22 },
};

const originalSizeStyles: Record<string, { fontSize: number }> = {
  sm: { fontSize: 10 },
  md: { fontSize: 12 },
  lg: { fontSize: 14 },
};
