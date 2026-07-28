import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { colors, spacing, typography, radii, shadows } from '../theme/tokens';

interface AppBarProps {
  title?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  subtitle?: string;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 36) : 0;

export const AppBar: React.FC<AppBarProps> = ({
  title,
  onBack,
  rightAction,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Left */}
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandContainer}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>DC</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>
                DC <Text style={{ color: colors.gold }}>STORES</Text>
              </Text>
              <Text style={styles.brandSubline} numberOfLines={1}>
                Anuradha Mehta Enterprises
              </Text>
            </View>
          </View>
        )}

        {/* Center title (when back is shown) */}
        {onBack && title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          </View>
        )}

        {/* Right */}
        <View style={styles.rightContainer}>
          {rightAction || <View style={{ width: 44 }} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.obsidian,
    paddingTop: STATUS_BAR_HEIGHT + spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.goldSoft,
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    ...shadows.gold,
  },
  logoText: {
    fontWeight: '900',
    color: colors.obsidian,
    fontSize: 14,
    letterSpacing: -0.5,
  },
  brandTitle: {
    color: colors.textOnDark,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  brandSubline: {
    color: colors.goldDeep,
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: 1,
  },
  titleContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    color: colors.textOnDark,
    ...typography.subtitle,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
