import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { GoldButton } from '../components/GoldButton';
import { ProductCard } from '../components/ProductCard';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const [selectedCat, setSelectedCat] = useState('cat_all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat === 'cat_all') return true;
    return p.categoryId === selectedCat;
  });

  const spotlightProduct = PRODUCTS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1219" />
      
      {/* Native Header Bar */}
      <HeaderBar navigation={navigation} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Search Input Box */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search Tumblers, Journals, Books, Gifts..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => navigation.navigate('Search', { q: searchQuery })}
            />
          </View>
        </View>

        {/* Hero Doppel Card */}
        <DoppelCard variant="dark" style={styles.heroCardMargin}>
          <Text style={styles.heroEyebrow}>✨ DC STORES • SHAJAPUR, MP</Text>
          <Text style={styles.heroTitle}>
            Aesthetic Tumblers, Journals, Books & Gifts
          </Text>
          <Text style={styles.heroDesc}>
            Shop high-grade stainless tumblers, leather journals, viral books, and luxury gift hampers with 30-45 mins express local delivery in Shajapur.
          </Text>

          <GoldButton
            title="Browse Full Store Catalog →"
            onPress={() => navigation.navigate('Products')}
            variant="gold"
            size="md"
            style={{ marginTop: 12, alignSelf: 'flex-start' }}
          />
        </DoppelCard>

        {/* Horizontal Category Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Departments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={{ paddingRight: 16 }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
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
                activeOpacity={0.8}
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

        {/* Spotlight Card */}
        {selectedCat === 'cat_all' && (
          <View style={styles.spotlightSection}>
            <Text style={styles.spotlightLabel}>🌟 SPOTLIGHT RECOMMENDED</Text>
            <DoppelCard variant="light">
              <View style={styles.spotlightRow}>
                <Image source={{ uri: spotlightProduct.image }} style={styles.spotlightImage} />
                <View style={styles.spotlightInfo}>
                  <Text style={styles.spotlightCat}>{spotlightProduct.categoryName}</Text>
                  <Text style={styles.spotlightTitle}>{spotlightProduct.name}</Text>
                  <Text style={styles.spotlightPrice}>₹{spotlightProduct.price.toFixed(0)}</Text>
                  <GoldButton
                    title="+ Add to Bag"
                    onPress={() => navigation.navigate('Products')}
                    variant="dark"
                    size="sm"
                    style={{ marginTop: 8 }}
                  />
                </View>
              </View>
            </DoppelCard>
          </View>
        )}

        {/* Popular Product Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <Text style={styles.itemCount}>({filteredProducts.length} items)</Text>
        </View>

        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('Products', { catId: product.categoryId })}
            />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchSection: {
    marginTop: 14,
    marginBottom: 14,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F1219',
    fontWeight: '500',
  },
  heroCardMargin: {
    marginBottom: 20,
  },
  heroEyebrow: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 8,
  },
  heroDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F1219',
    letterSpacing: -0.3,
  },
  seeAllText: {
    color: '#B8860B',
    fontWeight: '800',
    fontSize: 12,
  },
  itemCount: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  catScroll: {
    marginBottom: 20,
  },
  catChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 9,
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
    color: '#F4E8C1',
    fontWeight: '900',
  },
  spotlightSection: {
    marginBottom: 20,
  },
  spotlightLabel: {
    color: '#B8860B',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  spotlightRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  spotlightImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  spotlightInfo: {
    flex: 1,
  },
  spotlightCat: {
    color: '#B8860B',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  spotlightTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F1219',
    marginTop: 2,
  },
  spotlightPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F1219',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
