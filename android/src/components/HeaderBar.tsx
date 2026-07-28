import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { SITE_CONTENT } from '../config/siteContent';

interface HeaderBarProps {
  navigation: any;
  title?: string;
  showBack?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  navigation,
  title,
  showBack = false,
}) => {
  const { totalCartItemCount, cartSubtotal, selectedAddress } = useApp();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Announcement Bar */}
      <View style={styles.tickerBar}>
        <Text style={styles.tickerText} numberOfLines={1}>
          ⚡ <Text style={styles.goldText}>SHAJAPUR EXPRESS</Text> • 30-45 Mins Express Delivery
        </Text>
      </View>

      {/* Main Header Row */}
      <View style={styles.headerContent}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>DC</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.brandTitle}>
                DC <Text style={{ color: '#D4AF37' }}>STORES</Text>
              </Text>
              <Text style={styles.brandSubline} numberOfLines={1}>
                {SITE_CONTENT.brand.subline}
              </Text>
            </View>
          </View>
        )}

        {title && <Text style={styles.pageTitle}>{title}</Text>}

        {/* Location & Cart Action */}
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.locationPill}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {selectedAddress.city}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bagBtn}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.bagBtnIcon}>🛍️</Text>
            <Text style={styles.bagBtnText}>
              {totalCartItemCount === 0 ? 'Bag' : `₹${cartSubtotal.toFixed(0)}`}
            </Text>
            {totalCartItemCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>{totalCartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0F1219',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.25)',
  },
  tickerBar: {
    backgroundColor: '#07090D',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.12)',
  },
  tickerText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  goldText: {
    color: '#F4E8C1',
    fontWeight: '900',
  },
  headerContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  logoText: {
    fontWeight: '900',
    color: '#0F1219',
    fontSize: 15,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: -0.3,
  },
  brandSubline: {
    color: '#B8860B',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  backBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  backIcon: {
    color: '#F4E8C1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  locationIcon: {
    fontSize: 10,
  },
  locationText: {
    color: '#F4E8C1',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bagBtnIcon: {
    fontSize: 11,
  },
  bagBtnText: {
    color: '#0F1219',
    fontWeight: '900',
    fontSize: 11,
  },
  badgeCount: {
    backgroundColor: '#0F1219',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
});
