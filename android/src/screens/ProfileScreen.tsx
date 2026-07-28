import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { SITE_CONTENT } from '../config/siteContent';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { GoldButton } from '../components/GoldButton';

export const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { user, selectedAddress } = useApp();

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Account Portal" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <DoppelCard variant="light" style={styles.cardMargin}>
          <View style={styles.profileContent}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
            <Text style={styles.userPhone}>{user.phone} • {user.email}</Text>
          </View>
        </DoppelCard>

        {/* Shajapur Address Info */}
        <DoppelCard variant="light" style={styles.cardMargin}>
          <Text style={styles.cardTitle}>📍 Primary Delivery Location</Text>
          <Text style={styles.addressLabel}>{selectedAddress.label} - {selectedAddress.city}</Text>
          <Text style={styles.addressStreet}>{selectedAddress.street}</Text>
        </DoppelCard>

        {/* Brand Meta Card */}
        <DoppelCard variant="dark" style={styles.cardMargin}>
          <Text style={styles.brandTitle}>DC STORES</Text>
          <Text style={styles.brandSub}>{SITE_CONTENT.brand.subline}</Text>
          <Text style={styles.brandLocation}>Location: {SITE_CONTENT.brand.location}</Text>
        </DoppelCard>

        <GoldButton
          title="View Digital Order Receipts →"
          onPress={() => navigation.navigate('Orders')}
          variant="gold"
          size="lg"
          style={{ marginBottom: 40 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  cardMargin: {
    marginBottom: 14,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
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
  cardTitle: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
    marginBottom: 6,
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
});
