import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { ProductCard } from '../components/ProductCard';
import { GoldButton } from '../components/GoldButton';

export const WishlistScreen: React.FC<any> = ({ navigation }) => {
  const { wishlist } = useApp();

  const favProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (favProducts.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderBar navigation={navigation} title="Saved Favorites" />
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 44, marginBottom: 12 }}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Saved Yet</Text>
          <Text style={styles.emptyDesc}>Tap the heart icon on any tumbler, journal, book, or gift hamper to save for later.</Text>
          <GoldButton
            title="Explore Store Catalog"
            onPress={() => navigation.navigate('Products')}
            variant="gold"
            size="md"
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title={`Saved Favorites (${favProducts.length})`} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {favProducts.map((p) => (
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
