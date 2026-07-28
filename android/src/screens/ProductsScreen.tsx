import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { CategoryPill } from '../components/CategoryPill';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { colors, spacing, typography, radii } from '../theme/tokens';

export const ProductsScreen: React.FC<any> = ({ route, navigation }) => {
  const { totalCartItemCount, cartSubtotal } = useApp();
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
          ListFooterComponent={<View style={{ height: totalCartItemCount > 0 ? 100 : 40 }} />}
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

      {/* Floating Cart Bar */}
      {totalCartItemCount > 0 && (
        <TouchableOpacity
          style={styles.floatingCart}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.floatingCartLeft}>
            <Text style={styles.floatingCartCount}>{totalCartItemCount} item{totalCartItemCount > 1 ? 's' : ''}</Text>
            <Text style={styles.floatingCartTotal}>₹{cartSubtotal.toFixed(0)}</Text>
          </View>
          <Text style={styles.floatingCartCta}>View Bag ›</Text>
        </TouchableOpacity>
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
  floatingCart: {
    position: 'absolute',
    bottom: spacing.base,
    left: spacing.base,
    right: spacing.base,
    backgroundColor: colors.obsidian,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  floatingCartCount: {
    ...typography.smallBold,
    color: colors.textMuted,
  },
  floatingCartTotal: {
    ...typography.subtitle,
    color: colors.goldSoft,
    fontWeight: '900',
  },
  floatingCartCta: {
    ...typography.bodyBold,
    color: colors.gold,
  },
});
