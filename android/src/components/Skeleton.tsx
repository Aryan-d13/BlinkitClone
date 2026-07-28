import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, radii, spacing } from '../theme/tokens';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = radii.sm,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

/** Pre-composed product card skeleton */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={skeletonStyles.card}>
      <Skeleton width="100%" height={140} borderRadius={radii.md} />
      <View style={skeletonStyles.info}>
        <Skeleton width={60} height={10} />
        <Skeleton width="85%" height={14} style={{ marginTop: spacing.sm }} />
        <View style={skeletonStyles.footer}>
          <Skeleton width={50} height={16} />
          <Skeleton width={56} height={32} borderRadius={radii.full} />
        </View>
      </View>
    </View>
  );
};

const skeletonStyles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  info: {
    padding: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
