import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';
import { PRODUCTS } from '../data/mockData';
import { colors, spacing, typography, radii, minTouchTarget } from '../theme/tokens';

const TRENDING_TAGS = ['Insulated Tumbler', 'Leather Journal', 'Atomic Habits', 'Soy Candle', 'Gift Hamper', 'Highlighters'];

export const SearchScreen: React.FC<any> = ({ route, navigation }) => {
  const initialQuery = route?.params?.q || '';
  const [query, setQuery] = useState(initialQuery);

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showResults = query.trim().length > 0;

  return (
    <ScreenWrapper>
      {/* Search header */}
      <View style={styles.headerBar}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          autoFocus={!initialQuery}
          placeholder="Search tumblers, journals, books..."
        />
      </View>

      {showResults ? (
        results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text style={styles.resultCount}>
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </Text>
            }
          renderItem={({ item }) => (
              <ProductCard product={item} />
            )}
          />
        ) : (
          <EmptyState
            emoji="🔍"
            title="No Results Found"
            description={`We couldn't find any products matching "${query}". Try a different search term.`}
          />
        )
      ) : (
        <View style={styles.tagSection}>
          <SectionHeader title="Trending Searches" />
          <View style={styles.tagGrid}>
            {TRENDING_TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => setQuery(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: colors.obsidian,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGold,
  },
  listContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  resultCount: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.base,
  },
  tagSection: {
    padding: spacing.base,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: minTouchTarget,
    justifyContent: 'center',
  },
  tagText: {
    ...typography.smallBold,
    color: colors.textPrimary,
  },
});
