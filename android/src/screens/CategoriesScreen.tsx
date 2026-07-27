import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { CATEGORIES } from '../data/mockData';

export const CategoriesScreen: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Departments Catalog</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.card}
              onPress={() => navigation.navigate('Products', { catId: cat.id })}
            >
              <Image source={{ uri: cat.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <Text style={styles.itemBadge}>{cat.itemCount} Items</Text>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catDesc} numberOfLines={1}>{cat.description}</Text>
              </View>
            </TouchableOpacity>
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
    paddingVertical: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  grid: {
    gap: 16,
  },
  card: {
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0F1219',
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
    color: '#0F1219',
    fontSize: 9,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6,
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
