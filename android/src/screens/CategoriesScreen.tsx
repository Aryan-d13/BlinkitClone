import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { CATEGORIES } from '../data/mockData';
import { colors, spacing, radii, typography, shadows } from '../theme/tokens';

const SCREEN_W = Dimensions.get('window').width;

export const CategoriesScreen: React.FC<any> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <AppBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Shop by Department</Text>
        <Text style={styles.pageSubtitle}>
          Curated categories for Shajapur's finest aesthetic products
        </Text>

        {CATEGORIES.map((cat, idx) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation.navigate('Products', { catId: cat.id })}
          >
            <Image source={{ uri: cat.image }} style={styles.cardImage} />
            <View style={styles.cardGradient} />
            <View style={styles.cardContent}>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{cat.itemCount} items</Text>
              </View>
              <Text style={styles.cardTitle}>{cat.name}</Text>
              {cat.description && (
                <Text style={styles.cardDesc} numberOfLines={1}>{cat.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: spacing['2xl'] }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.base,
  },
  pageTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    height: 160,
    borderRadius: radii.xl,
    overflow: 'hidden',
    marginBottom: spacing.base,
    backgroundColor: colors.obsidian,
    ...shadows.medium,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 18, 25, 0.55)',
  },
  cardContent: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
  countBadge: {
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  countBadgeText: {
    ...typography.captionBold,
    color: colors.obsidian,
    fontSize: 10,
  },
  cardTitle: {
    ...typography.title,
    color: colors.textOnDark,
    fontWeight: '900',
  },
  cardDesc: {
    ...typography.small,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
  },
});
