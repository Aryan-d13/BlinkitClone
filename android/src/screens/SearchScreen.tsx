import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';

export const SearchScreen: React.FC<any> = ({ route }) => {
  const { q } = route.params || {};
  const { addToCart } = useApp();
  const [query, setQuery] = useState(q || '');

  const searchResults = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search Tumblers, Journals, Books, Gifts..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          autoFocus={!q}
        />
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.resultsCount}>
          {query.trim() ? `Showing ${searchResults.length} results for "${query}"` : 'Trending Search Tags'}
        </Text>

        {!query.trim() && (
          <View style={styles.tagRow}>
            {['Insulated Tumbler', 'Leather Journal', 'Atomic Habits', 'Soy Candle', 'Pastel Highlighters'].map((tag) => (
              <TouchableOpacity
                key={tag}
                style={styles.tagChip}
                onPress={() => setQuery(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.grid}>
          {searchResults.map((p) => (
            <View key={p.id} style={styles.productCard}>
              <Image source={{ uri: p.image }} style={styles.productImage} />
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
  header: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F1219',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  resultsCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tagChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0F1219',
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
