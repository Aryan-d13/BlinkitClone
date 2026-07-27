import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { SITE_CONTENT } from '../config/siteContent';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { cart, addToCart, wishlist, toggleWishlist, totalCartItemCount, cartSubtotal } = useApp();
  const [selectedCat, setSelectedCat] = useState('cat_all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat === 'cat_all') return true;
    return p.categoryId === selectedCat;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1219" />
      
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>DC</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>DC <Text style={{ color: '#D4AF37' }}>STORES</Text></Text>
            <Text style={styles.subtext}>Anuradha Mehta Enterprises</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>
            Bag {totalCartItemCount > 0 ? `(${totalCartItemCount})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Shajapur Delivery Pill */}
      <View style={styles.deliveryBar}>
        <Text style={styles.deliveryText}>
          ⚡ <Text style={{ color: '#F4E8C1', fontWeight: 'bold' }}>Shajapur Express</Text> • 30-45 Mins Delivery
        </Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Tumblers, Journals, Books, Gifts..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => navigation.navigate('Search', { q: searchQuery })}
          />
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>DC STORES • SHAJAPUR, MP</Text>
          <Text style={styles.heroTitle}>Aesthetic Tumblers, Books & Custom Gifts</Text>
          <Text style={styles.heroDesc}>
            Shop high-grade insulated tumblers, bullet journals, viral books, and luxury gift hampers with express local delivery.
          </Text>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.heroBtnText}>Browse Store Catalog →</Text>
          </TouchableOpacity>
        </View>

        {/* Departments Scroll */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Departments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          <TouchableOpacity
            style={[styles.catChip, selectedCat === 'cat_all' && styles.catChipActive]}
            onPress={() => setSelectedCat('cat_all')}
          >
            <Text style={[styles.catChipText, selectedCat === 'cat_all' && styles.catChipTextActive]}>
              All Items
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catChip, isActive && styles.catChipActive]}
                onPress={() => setSelectedCat(cat.id)}
              >
                <Text style={[styles.catChipText, isActive && styles.catChipTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <Text style={styles.itemCount}>{filteredProducts.length} items</Text>
        </View>

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
  topHeader: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.3)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '900',
    color: '#0F1219',
    fontSize: 16,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  subtext: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cartButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cartButtonText: {
    color: '#0F1219',
    fontWeight: '800',
    fontSize: 12,
  },
  deliveryBar: {
    backgroundColor: '#1E2330',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  deliveryText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F1219',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroCard: {
    backgroundColor: '#0F1219',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  heroEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#0F1219',
    fontWeight: '800',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F1219',
  },
  seeAll: {
    color: '#B8860B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  itemCount: {
    color: '#94A3B8',
    fontSize: 12,
  },
  catScroll: {
    marginBottom: 16,
  },
  catChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipActive: {
    backgroundColor: '#0F1219',
    borderColor: '#0F1219',
  },
  catChipText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },
  catChipTextActive: {
    color: '#FFFFFF',
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
