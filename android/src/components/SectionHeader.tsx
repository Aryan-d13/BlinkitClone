import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, minTouchTarget } from '../theme/tokens';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  count?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  count,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Text style={styles.title}>{title}</Text>
        {count !== undefined && (
          <Text style={styles.count}>({count})</Text>
        )}
      </View>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>{actionLabel} ›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    minHeight: minTouchTarget,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  count: {
    ...typography.small,
    color: colors.textMuted,
  },
  actionBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  actionText: {
    ...typography.smallBold,
    color: colors.goldDeep,
  },
});
