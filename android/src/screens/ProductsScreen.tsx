import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { ProductCard } from '../components/ProductCard';

export const ProductsScreen: React.FC<any> = ({ route, navigation }) => {
  const { catId } = route.params || {};
  const [selectedCat, setSelectedCat] = useState(catId || 'all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat === 'all') return true;
    return p.categoryId === selectedCat;
  });

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Store Catalog" showBack={true} />

      {/* Department Filter Bar */}
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

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <DoppelCard variant="gold" style={styles.headerCard}>
          <Text style={styles.cardTag}>DC STORES • SHAJAPUR CATALOG</Text>
          <Text style={styles.cardTitle}>Browse Aesthetic Retail Collection</Text>
          <Text style={styles.cardSub}>Showing {filteredProducts.length} items available for 30-45 Mins Express Delivery.</Text>
        </DoppelCard>

        <View style={styles.productGrid}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
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
    paddingVertical: 7,
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
    fontWeight: '900',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
  },
  cardTag: {
    color: '#B8860B',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F1219',
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
