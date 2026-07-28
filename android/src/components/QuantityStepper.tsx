import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, minTouchTarget } from '../theme/tokens';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
}) => {
  const isMd = size === 'md';
  return (
    <View style={[styles.container, isMd ? styles.containerMd : styles.containerSm]}>
      <TouchableOpacity
        onPress={onDecrement}
        style={[styles.btn, isMd ? styles.btnMd : styles.btnSm]}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      >
        <Text style={[styles.btnText, isMd ? styles.btnTextMd : styles.btnTextSm]}>−</Text>
      </TouchableOpacity>

      <Text style={[styles.count, isMd ? styles.countMd : styles.countSm]}>{quantity}</Text>

      <TouchableOpacity
        onPress={onIncrement}
        style={[styles.btn, isMd ? styles.btnMd : styles.btnSm]}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      >
        <Text style={[styles.btnText, isMd ? styles.btnTextMd : styles.btnTextSm]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.obsidian,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
  },
  containerMd: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  containerSm: {
    paddingHorizontal: 3,
    paddingVertical: 2,
    gap: spacing.xs,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  btnMd: {
    width: 36,
    height: 36,
    minWidth: minTouchTarget - 12,
    minHeight: minTouchTarget - 12,
  },
  btnSm: {
    width: 28,
    height: 28,
  },
  btnText: {
    color: colors.goldSoft,
    fontWeight: '700',
  },
  btnTextMd: {
    fontSize: 18,
  },
  btnTextSm: {
    fontSize: 15,
  },
  count: {
    color: colors.textOnDark,
    fontWeight: '900',
    textAlign: 'center',
    minWidth: 20,
  },
  countMd: {
    ...typography.bodyBold,
  },
  countSm: {
    ...typography.smallBold,
  },
});
