import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { SearchBar } from '../components/SearchBar';
import { Card } from '../components/Card';
import { CategoryPill } from '../components/CategoryPill';
import { SectionHeader } from '../components/SectionHeader';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/mockData';
import { SITE_CONTENT } from '../config/siteContent';
import { colors, spacing, typography, radii } from '../theme/tokens';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { totalCartItemCount, cartSubtotal } = useApp();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCat === 'all') return true;
    return p.categoryId === selectedCat;
  });

  const CartBadge = () => (
    <TouchableOpacity
      style={styles.cartBadge}
      onPress={() => navigation.navigate('Cart')}
    >
      <Text style={styles.cartIcon}>🛍</Text>
      {totalCartItemCount > 0 && (
        <View style={styles.cartCount}>
          <Text style={styles.cartCountText}>{totalCartItemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <AppBar rightAction={<CartBadge />} />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Products', { catId: item.categoryId })}
          />
        )}
        ListHeaderComponent={
          <View>
            {/* Search */}
            <View style={styles.searchContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmit={() => navigation.navigate('Search', { q: searchQuery })}
                placeholder={SITE_CONTENT.navigation.searchPlaceholder}
              />
            </View>

            {/* Hero Banner */}
            <Card variant="dark" style={styles.heroBanner}>
              <View style={styles.heroRow}>
                <View style={styles.heroContent}>
                  <View style={styles.expressPill}>
                    <Text style={styles.expressPillText}>⚡ SHAJAPUR EXPRESS</Text>
                  </View>
                  <Text style={styles.heroTitle}>{SITE_CONTENT.homePage.heroTitle}</Text>
                  <Text style={styles.heroSub}>30-45 mins delivery across Shajapur</Text>
                </View>
              </View>
              <Button
                title="Browse Full Catalog"
                onPress={() => navigation.navigate('Products')}
                variant="gold"
                size="sm"
                style={{ marginTop: spacing.md, alignSelf: 'flex-start' }}
              />
            </Card>

            {/* Category Pills */}
            <SectionHeader
              title="Departments"
              actionLabel="See all"
              onAction={() => navigation.navigate('Categories')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.catScroll}
              contentContainerStyle={{ paddingRight: spacing.base }}
            >
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

            {/* Grid Header */}
            <SectionHeader title="Popular" count={filteredProducts.length} />
          </View>
        }
        ListFooterComponent={<View style={{ height: spacing['2xl'] }} />}
      />

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
  listContent: {
    paddingHorizontal: spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  searchContainer: {
    paddingVertical: spacing.md,
  },
  heroBanner: {
    marginBottom: spacing.lg,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
  },
  expressPill: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  expressPillText: {
    ...typography.captionBold,
    color: colors.goldSoft,
    letterSpacing: 0.5,
    fontSize: 10,
  },
  heroTitle: {
    ...typography.headline,
    color: colors.textOnDark,
    fontSize: 22,
    lineHeight: 28,
  },
  heroSub: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  catScroll: {
    marginBottom: spacing.base,
  },
  // Cart badge in header
  cartBadge: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 18,
  },
  cartCount: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.gold,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  cartCountText: {
    color: colors.obsidian,
    fontSize: 9,
    fontWeight: '900',
  },
  // Floating cart bar
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
