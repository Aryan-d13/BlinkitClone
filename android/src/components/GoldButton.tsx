import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';

interface GoldButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'gold' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  title,
  onPress,
  variant = 'gold',
  size = 'md',
  icon,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        <Text
          style={[
            styles.textBase,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            textStyle,
          ]}
        >
          {title}
        </Text>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconWrapper: {
    marginLeft: 2,
  },

  // Variants
  gold: {
    backgroundColor: '#D4AF37',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  dark: {
    backgroundColor: '#0F1219',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },

  // Sizes
  size_sm: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    minHeight: 34,
  },
  size_md: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    minHeight: 44,
  },
  size_lg: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    minHeight: 52,
  },

  // Text colors
  textBase: {
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  text_gold: {
    color: '#0F1219',
  },
  text_dark: {
    color: '#F4E8C1',
  },
  text_outline: {
    color: '#B8860B',
  },

  // Text sizes
  textSize_sm: {
    fontSize: 11,
  },
  textSize_md: {
    fontSize: 13,
  },
  textSize_lg: {
    fontSize: 15,
  },

  disabled: {
    opacity: 0.5,
  },
});
