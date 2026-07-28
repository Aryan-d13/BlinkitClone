import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { AppBar } from '../components/AppBar';
import { Card } from '../components/Card';
import { useApp } from '../context/AppContext';
import { SITE_CONTENT } from '../config/siteContent';
import { colors, spacing, radii, typography, shadows, minTouchTarget } from '../theme/tokens';

interface ActionRowProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  badge?: string;
}

const ActionRow: React.FC<ActionRowProps> = ({ icon, label, subtitle, onPress, badge }) => (
  <TouchableOpacity
    style={styles.actionRow}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.actionIcon}>
      <Text style={{ fontSize: 16 }}>{icon}</Text>
    </View>
    <View style={styles.actionContent}>
      <Text style={styles.actionLabel}>{label}</Text>
      {subtitle && <Text style={styles.actionSubtitle}>{subtitle}</Text>}
    </View>
    {badge && (
      <View style={styles.actionBadge}>
        <Text style={styles.actionBadgeText}>{badge}</Text>
      </View>
    )}
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

export const AccountScreen: React.FC<any> = ({ navigation }) => {
  const { user, selectedAddress, orders, wishlist } = useApp();

  return (
    <ScreenWrapper>
      <AppBar />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Card variant="surface" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>✦ {user.role}</Text>
              </View>
              <Text style={styles.profileContact}>{user.phone}</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <Card variant="surface" padded={false}>
            <ActionRow
              icon="📦"
              label="My Orders"
              subtitle={`${orders.length} past order${orders.length !== 1 ? 's' : ''}`}
              onPress={() => navigation.navigate('Orders')}
              badge={orders.length > 0 ? String(orders.length) : undefined}
            />
            <View style={styles.divider} />
            <ActionRow
              icon="♥"
              label="Wishlist"
              subtitle="Saved favorites"
              onPress={() => navigation.navigate('Wishlist')}
              badge={wishlist.length > 0 ? String(wishlist.length) : undefined}
            />
            <View style={styles.divider} />
            <ActionRow
              icon="📍"
              label="Delivery Addresses"
              subtitle={`${selectedAddress.label} — ${selectedAddress.city}`}
              onPress={() => {}}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GENERAL</Text>
          <Card variant="surface" padded={false}>
            <ActionRow
              icon="🎟"
              label="Promo Codes"
              subtitle="SHAJAPUR10, DCGIFTS"
              onPress={() => {}}
            />
            <View style={styles.divider} />
            <ActionRow
              icon="💬"
              label="Support & Help"
              subtitle="Chat with DC Stores team"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Brand Footer */}
        <View style={styles.brandFooter}>
          <Text style={styles.brandName}>DC STORES</Text>
          <Text style={styles.brandSub}>{SITE_CONTENT.brand.subline}</Text>
          <Text style={styles.brandLoc}>{SITE_CONTENT.brand.location}</Text>
          <Text style={styles.version}>v1.0.0</Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: spacing.base,
  },
  profileCard: {
    marginBottom: spacing.xl,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.title,
    color: colors.textPrimary,
  },
  memberBadge: {
    backgroundColor: colors.goldTint,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  memberBadgeText: {
    ...typography.caption,
    color: colors.goldDeep,
    fontWeight: '800',
  },
  profileContact: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    ...typography.captionBold,
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    minHeight: minTouchTarget + 8,
    gap: spacing.md,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionBadge: {
    backgroundColor: colors.goldTint,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  actionBadgeText: {
    ...typography.captionBold,
    color: colors.goldDeep,
    fontSize: 10,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 20,
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: spacing.base + 36 + spacing.md,
  },
  brandFooter: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  brandName: {
    ...typography.subtitle,
    color: colors.textMuted,
    letterSpacing: 2,
  },
  brandSub: {
    ...typography.caption,
    color: colors.goldDeep,
    marginTop: spacing.xs,
  },
  brandLoc: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  version: {
    ...typography.caption,
    color: colors.border,
    marginTop: spacing.base,
  },
});
