import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { CATEGORIES } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';

export const CategoriesScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Departments Catalog" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <DoppelCard variant="dark" style={{ marginBottom: 16 }}>
          <Text style={styles.headerTag}>DC STORES • SHAJAPUR DEPARTMENTS</Text>
          <Text style={styles.headerTitle}>Browse Lifestyle Categories</Text>
          <Text style={styles.headerSub}>Curated Tumblers, Leather Journals, Books, & Gift Hampers.</Text>
        </DoppelCard>

        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.9}
              style={styles.cardContainer}
              onPress={() => navigation.navigate('Products', { catId: cat.id })}
            >
              <Image source={{ uri: cat.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={styles.itemBadge}>
                  <Text style={styles.itemBadgeText}>{cat.itemCount} Items</Text>
                </View>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catDesc} numberOfLines={1}>{cat.description}</Text>
              </View>
            </TouchableOpacity>
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
    padding: 16,
  },
  headerTag: {
    color: '#D4AF37',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  grid: {
    gap: 14,
  },
  cardContainer: {
    height: 150,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0F1219',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  itemBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  itemBadgeText: {
    color: '#0F1219',
    fontSize: 9,
    fontWeight: '900',
  },
  catName: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },
  catDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    marginTop: 2,
  },
});
