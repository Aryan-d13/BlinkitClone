import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, radii, shadows, typography, minTouchTarget } from '../theme/tokens';

type ButtonVariant = 'gold' | 'dark' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'gold',
  size = 'md',
  icon,
  iconPosition = 'right',
  style,
  textStyle,
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'dark' ? colors.goldSoft : colors.obsidian}
        />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text
            style={[
              styles.textBase,
              textVariantStyles[variant],
              textSizeStyles[size],
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: minTouchTarget,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.45,
  },
  textBase: {
    letterSpacing: -0.2,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  gold: {
    backgroundColor: colors.gold,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    ...shadows.gold,
  },
  dark: {
    backgroundColor: colors.obsidian,
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
    ...shadows.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderGold,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: minTouchTarget,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    minHeight: 52,
  },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
  gold: { color: colors.textOnGold, fontWeight: '800' },
  dark: { color: colors.goldSoft, fontWeight: '800' },
  outline: { color: colors.goldDeep, fontWeight: '700' },
  ghost: { color: colors.goldDeep, fontWeight: '700' },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 15 },
};
