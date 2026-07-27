import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';

export const WishlistScreen: React.FC<any> = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const favProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (favProducts.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>🤍</Text>
        <Text style={styles.emptyTitle}>No Favorites Saved Yet</Text>
        <Text style={styles.emptyDesc}>Tap the heart icon on any tumbler, journal, or book to save for later.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Favorites ({favProducts.length})</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.grid}>
          {favProducts.map((p) => (
            <View key={p.id} style={styles.productCard}>
              <Image source={{ uri: p.image }} style={styles.productImage} />
              <TouchableOpacity
                style={styles.favIcon}
                onPress={() => toggleWishlist(p.id)}
              >
                <Text style={{ fontSize: 12 }}>❤️</Text>
              </TouchableOpacity>

              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                <Text style={styles.productCategory}>{p.categoryName}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{p.price.toFixed(0)}</Text>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(p)}
                  >
                    <Text style={styles.addBtnText}>+ Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

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
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  favIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0F1219',
  },
  productCategory: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
  },
  addBtn: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#F4E8C1',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
