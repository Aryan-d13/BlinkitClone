import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import { colors, spacing, radii, typography } from '../theme/tokens';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  placed:    { bg: colors.infoBg,    text: colors.info },
  packing:   { bg: colors.goldTint,  text: colors.goldDeep },
  delivering:{ bg: colors.goldTint,  text: colors.goldDeep },
  delivered: { bg: colors.successBg, text: colors.success },
  cancelled: { bg: colors.errorBg,   text: colors.error },
};

export const OrdersScreen: React.FC<any> = ({ navigation }) => {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <ScreenWrapper>
        <AppBar title="My Orders" onBack={() => navigation.goBack()} />
        <EmptyState
          emoji="📦"
          title="No Orders Yet"
          description="Your order history will appear here once you place your first order."
          actionLabel="Start Shopping"
          onAction={() => navigation.goBack()}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <AppBar title="My Orders" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order) => {
          const statusColors = STATUS_COLORS[order.status] || STATUS_COLORS.placed;
          return (
            <Card key={order.id} variant="surface" style={styles.orderCard}>
              {/* Header */}
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                  <Text style={[styles.statusText, { color: statusColors.text }]}>
                    {order.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Item Thumbnails */}
              <View style={styles.thumbRow}>
                {order.items.slice(0, 3).map((item, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: item.product.image }}
                    style={styles.thumb}
                  />
                ))}
                {order.items.length > 3 && (
                  <View style={styles.thumbMore}>
                    <Text style={styles.thumbMoreText}>+{order.items.length - 3}</Text>
                  </View>
                )}
              </View>

              {/* Footer */}
              <View style={styles.orderFooter}>
                <Text style={styles.orderSlot}>{order.deliverySlot}</Text>
                <Text style={styles.orderTotal}>₹{order.totalPaid.toFixed(0)}</Text>
              </View>
            </Card>
          );
        })}

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
  orderCard: {
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  orderId: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontWeight: '900',
  },
  orderDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  statusText: {
    ...typography.captionBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  thumbRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
  },
  thumbMore: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbMoreText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  orderSlot: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  orderTotal: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: '900',
  },
});
