import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { cart, addToCart, updateQuantity, isInWishlist, toggleWishlist } = useApp();

  const isFav = isInWishlist(product.id);
  const cartItemsForProduct = cart.filter((ci) => ci.product.id === product.id);
  const totalQtyInCart = cartItemsForProduct.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleIncrement = () => {
    if (cartItemsForProduct.length > 0) {
      updateQuantity(cartItemsForProduct[0].cartItemId, cartItemsForProduct[0].quantity + 1);
    } else {
      addToCart(product);
    }
  };

  const handleDecrement = () => {
    if (cartItemsForProduct.length > 0) {
      updateQuantity(cartItemsForProduct[0].cartItemId, cartItemsForProduct[0].quantity - 1);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* Image Container */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        {/* Favorite Heart */}
        <TouchableOpacity
          style={styles.favBadge}
          onPress={() => toggleWishlist(product.id)}
        >
          <Text style={{ fontSize: 11 }}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.starText}>★</Text>
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>

      {/* Product Content */}
      <View style={styles.info}>
        <Text style={styles.categoryTag} numberOfLines={1}>
          {product.categoryName}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toFixed(0)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(0)}</Text>
            )}
          </View>

          {totalQtyInCart > 0 ? (
            <View style={styles.qtyPill}>
              <TouchableOpacity style={styles.qtyBtn} onPress={handleDecrement}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyCount}>{totalQtyInCart}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={handleIncrement}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(product)}
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
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  imageWrapper: {
    width: '100%',
    height: 130,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 5,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15, 18, 25, 0.85)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  starText: {
    color: '#F59E0B',
    fontSize: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  categoryTag: {
    color: '#B8860B',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F1219',
    lineHeight: 16,
    marginBottom: 8,
    minHeight: 32,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  price: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
  },
  originalPrice: {
    fontSize: 10,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  addBtnText: {
    color: '#F4E8C1',
    fontWeight: '800',
    fontSize: 11,
  },
  qtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1219',
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 6,
  },
  qtyBtn: {
    paddingHorizontal: 4,
  },
  qtyBtnText: {
    color: '#F4E8C1',
    fontWeight: 'bold',
    fontSize: 13,
  },
  qtyCount: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
  },
});
