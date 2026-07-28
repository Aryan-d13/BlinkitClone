import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, radii, shadows } from '../theme/tokens';

interface CardProps {
  children: ReactNode;
  variant?: 'surface' | 'dark' | 'goldTint';
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  style,
  padded = true,
}) => {
  return (
    <View
      style={[
        styles.base,
        padded && styles.padded,
        variant === 'surface' && styles.surface,
        variant === 'dark' && styles.dark,
        variant === 'goldTint' && styles.goldTint,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.base,
  },
  surface: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.low,
  },
  dark: {
    backgroundColor: colors.obsidian,
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
    ...shadows.high,
  },
  goldTint: {
    backgroundColor: colors.goldTint,
    borderWidth: 1,
    borderColor: colors.borderGold,
    ...shadows.low,
  },
});
