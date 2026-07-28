import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

interface DoppelCardProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'gold';
  style?: StyleProp<ViewStyle>;
  coreStyle?: StyleProp<ViewStyle>;
}

export const DoppelCard: React.FC<DoppelCardProps> = ({
  children,
  variant = 'light',
  style,
  coreStyle,
}) => {
  return (
    <View style={[styles.shell, style]}>
      <View
        style={[
          styles.coreBase,
          variant === 'light' && styles.coreLight,
          variant === 'dark' && styles.coreDark,
          variant === 'gold' && styles.coreGold,
          coreStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'rgba(15, 18, 25, 0.03)',
    borderRadius: 24,
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  coreBase: {
    borderRadius: 19,
    padding: 14,
    overflow: 'hidden',
  },
  coreLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F1219',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  coreDark: {
    backgroundColor: '#0B0F17',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  coreGold: {
    backgroundColor: '#FAF6ED',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
