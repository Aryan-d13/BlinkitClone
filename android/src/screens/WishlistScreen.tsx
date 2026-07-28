import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { spacing } from '../theme/tokens';

export const WishlistScreen: React.FC<any> = ({ navigation }) => {
  const { wishlist } = useApp();

  const favProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (favProducts.length === 0) {
    return (
      <ScreenWrapper>
        <AppBar title="Wishlist" onBack={() => navigation.goBack()} />
        <EmptyState
          emoji="♡"
          title="No Saved Favorites"
          description="Tap the heart icon on any product to save it to your wishlist for later."
          actionLabel="Browse Catalog"
          onAction={() => navigation.goBack()}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <AppBar
        title="Wishlist"
        subtitle={`${favProducts.length} saved`}
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={favProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListFooterComponent={<View style={{ height: spacing['2xl'] }} />}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
