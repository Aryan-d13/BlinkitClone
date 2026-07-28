import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { PRODUCTS } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { ProductCard } from '../components/ProductCard';

export const SearchScreen: React.FC<any> = ({ route, navigation }) => {
  const { q } = route.params || {};
  const [query, setQuery] = useState(q || '');

  const searchResults = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Store Search" />

      {/* Input Row */}
      <View style={styles.searchBarSection}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search Tumblers, Journals, Books, Gifts..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            autoFocus={!q}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsCount}>
          {query.trim() ? `Showing ${searchResults.length} results for "${query}"` : '🔥 Trending Search Tags'}
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
  searchBarSection: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
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
});
