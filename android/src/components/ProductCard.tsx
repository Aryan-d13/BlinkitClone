import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { PriceTag } from './PriceTag';
import { QuantityStepper } from './QuantityStepper';
import { colors, spacing, radii, typography, shadows, minTouchTarget } from '../theme/tokens';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = spacing.md;
const CARD_WIDTH = (SCREEN_WIDTH - spacing.base * 2 - CARD_GAP) / 2;

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { cart, addToCart, updateQuantity, isInWishlist, toggleWishlist } = useApp();

  const isFav = isInWishlist(product.id);
  const cartItems = cart.filter((ci) => ci.product.id === product.id);
  const qtyInCart = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleAdd = () => addToCart(product);
  const handleIncrement = () => {
    if (cartItems.length > 0) {
      updateQuantity(cartItems[0].cartItemId, cartItems[0].quantity + 1);
    } else {
      handleAdd();
    }
  };
  const handleDecrement = () => {
    if (cartItems.length > 0) {
      updateQuantity(cartItems[0].cartItemId, cartItems[0].quantity - 1);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Wishlist */}
        <TouchableOpacity
          style={[styles.favBtn, isFav && styles.favBtnActive]}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.favIcon}>{isFav ? '♥' : '♡'}</Text>
        </TouchableOpacity>

        {/* Rating */}
        <View style={styles.ratingPill}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingValue}>{product.rating}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>
          {product.categoryName}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Footer: Price + Action */}
        <View style={styles.footer}>
          <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />

          {qtyInCart > 0 ? (
            <QuantityStepper
              quantity={qtyInCart}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              size="sm"
            />
          ) : (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAdd}
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
            >
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: CARD_GAP,
    ...shadows.low,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.low,
  },
  favBtnActive: {
    backgroundColor: colors.error,
  },
  favIcon: {
    fontSize: 15,
    color: colors.textMuted,
  },
  ratingPill: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(15, 18, 25, 0.8)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  ratingStar: {
    color: colors.warning,
    fontSize: 10,
  },
  ratingValue: {
    color: colors.textOnDark,
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  category: {
    ...typography.caption,
    color: colors.goldDeep,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.md,
    minHeight: 36,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  addBtn: {
    backgroundColor: colors.obsidian,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
  },
  addBtnText: {
    color: colors.goldSoft,
    fontWeight: '800',
    fontSize: 12,
  },
});
