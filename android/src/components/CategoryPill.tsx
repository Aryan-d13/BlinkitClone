import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography, minTouchTarget } from '../theme/tokens';

interface CategoryPillProps {
  label: string;
  image: string;
  isActive: boolean;
  onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  image,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, isActive && styles.containerActive]}
    >
      <Image source={{ uri: image }} style={styles.thumbnail} />
      <Text
        style={[styles.label, isActive && styles.labelActive]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingLeft: spacing.sm,
    paddingRight: spacing.base,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    minHeight: minTouchTarget,
  },
  containerActive: {
    backgroundColor: colors.obsidian,
    borderColor: colors.obsidian,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    ...typography.smallBold,
    color: colors.textSecondary,
    maxWidth: 110,
  },
  labelActive: {
    color: colors.goldSoft,
    fontWeight: '800',
  },
});
