import React, { useState } from 'react';
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
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const ProductsScreen: React.FC<any> = ({ route }) => {
  const { catId } = route.params || {};
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const [selectedCat, setSelectedCat] = useState(catId || 'all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat === 'all') return true;
    return p.categoryId === selectedCat;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Store Catalog</Text>
      </View>

      <View style={styles.catBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.catChip, selectedCat === 'all' && styles.catChipActive]}
            onPress={() => setSelectedCat('all')}
          >
            <Text style={[styles.catChipText, selectedCat === 'all' && styles.catChipTextActive]}>
              All ({PRODUCTS.length})
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((c) => {
            const isActive = selectedCat === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.catChip, isActive && styles.catChipActive]}
                onPress={() => setSelectedCat(c.id)}
              >
                <Text style={[styles.catChipText, isActive && styles.catChipTextActive]}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.productGrid}>
          {filteredProducts.map((p) => {
            const isFav = wishlist.includes(p.id);
            return (
              <View key={p.id} style={styles.productCard}>
                <Image source={{ uri: p.image }} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.favIcon}
                  onPress={() => toggleWishlist(p.id)}
                >
                  <Text style={{ fontSize: 12 }}>{isFav ? '❤️' : '🤍'}</Text>
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
            );
          })}
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
  catBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  catChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  catChipActive: {
    backgroundColor: '#0F1219',
  },
  catChipText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },
  catChipTextActive: {
    color: '#F4E8C1',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  productGrid: {
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
