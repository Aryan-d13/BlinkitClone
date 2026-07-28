import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { CategoryPill } from '../components/CategoryPill';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { colors, spacing, typography } from '../theme/tokens';

export const ProductsScreen: React.FC<any> = ({ route, navigation }) => {
  const initialCat = route?.params?.catId || 'all';
  const [selectedCat, setSelectedCat] = useState(initialCat);

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCat === 'all') return true;
    return p.categoryId === selectedCat;
  });

  const activeCatName = selectedCat === 'all'
    ? 'All Products'
    : CATEGORIES.find((c) => c.id === selectedCat)?.name || 'Products';

  return (
    <ScreenWrapper>
      <AppBar
        title={activeCatName}
        subtitle={`${filtered.length} items`}
        onBack={() => navigation.goBack()}
      />

      {/* Sticky Filter Bar */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryPill
            label="All"
            image={CATEGORIES[0].image}
            isActive={selectedCat === 'all'}
            onPress={() => setSelectedCat('all')}
          />
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.name}
              image={cat.image}
              isActive={selectedCat === cat.id}
              onPress={() => setSelectedCat(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListFooterComponent={<View style={{ height: spacing['2xl'] }} />}
        />
      ) : (
        <EmptyState
          emoji="📭"
          title="No Products Found"
          description="This category is empty right now. Check back soon for new arrivals!"
          actionLabel="View All Products"
          onAction={() => setSelectedCat('all')}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  filterBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
