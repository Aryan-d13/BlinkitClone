import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { SITE_CONTENT } from '../config/siteContent';

export const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { user, selectedAddress } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account & Settings</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
          <Text style={styles.userPhone}>{user.phone} • {user.email}</Text>
        </View>

        {/* Shajapur Address Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Primary Shajapur Address</Text>
          <Text style={styles.addressLabel}>{selectedAddress.label} - {selectedAddress.city}</Text>
          <Text style={styles.addressStreet}>{selectedAddress.street}</Text>
        </View>

        {/* Brand Meta Card */}
        <View style={styles.brandCard}>
          <Text style={styles.brandTitle}>DC STORES</Text>
          <Text style={styles.brandSub}>{SITE_CONTENT.brand.subline}</Text>
          <Text style={styles.brandLocation}>Location: {SITE_CONTENT.brand.location}</Text>
        </View>

        <TouchableOpacity
          style={styles.ordersBtn}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.ordersBtnText}>View My Receipts & Orders →</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  userName: {
    fontWeight: '900',
    fontSize: 18,
    color: '#0F1219',
  },
  userRole: {
    color: '#B8860B',
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 2,
  },
  userPhone: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
    marginBottom: 8,
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0F1219',
  },
  addressStreet: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  brandCard: {
    backgroundColor: '#0F1219',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  brandSub: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 2,
  },
  brandLocation: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 6,
  },
  ordersBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  ordersBtnText: {
    color: '#0F1219',
    fontWeight: '900',
    fontSize: 13,
  },
});
