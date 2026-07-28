import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { DoppelCard } from '../components/DoppelCard';
import { GoldButton } from '../components/GoldButton';

export const OrderSuccessScreen: React.FC<any> = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders } = useApp();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Order Confirmed" showBack={false} />

      <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 54, marginTop: 20, marginBottom: 10 }}>🎉</Text>
        
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>SHAJAPUR EXPRESS • ORDER CONFIRMED</Text>
        </View>

        <Text style={styles.title}>Thank You for Shopping!</Text>
        <Text style={styles.subTitle}>Order ID: {currentOrder ? currentOrder.id : 'ORD-DC9824'}</Text>

        {/* Live Stepper Doppel Card */}
        <DoppelCard variant="dark" style={styles.stepperMargin}>
          <Text style={styles.stepperHeader}>⚡ 30-45 Mins Live Delivery Stepper</Text>
          
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, styles.stepDotActive]} />
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Order Placed</Text>
              <Text style={styles.stepDesc}>DC Stores system acknowledged your request</Text>
            </View>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.stepRow}>
            <View style={[styles.stepDot, styles.stepDotActive]} />
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Packaging & Quality Check</Text>
              <Text style={styles.stepDesc}>Packing tumblers/stationery with luxury gift ribbon</Text>
            </View>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.stepRow}>
            <View style={styles.stepDot} />
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Out for Delivery</Text>
              <Text style={styles.stepDesc}>Vikram Singh is heading to your Shajapur location</Text>
            </View>
          </View>
        </DoppelCard>

        {/* Return Button */}
        <GoldButton
          title="Return to Store Catalog"
          onPress={() => navigation.navigate('Store')}
          variant="gold"
          size="lg"
          style={{ width: '100%', marginBottom: 40 }}
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
    padding: 20,
  },
  badgePill: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 8,
  },
  badgeText: {
    color: '#0F1219',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 20,
  },
  stepperMargin: {
    width: '100%',
    marginBottom: 24,
  },
  stepperHeader: {
    color: '#D4AF37',
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#334155',
  },
  stepDotActive: {
    backgroundColor: '#D4AF37',
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: '#334155',
    marginLeft: 7,
    marginVertical: 4,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stepDesc: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
});
