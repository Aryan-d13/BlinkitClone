import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';

export const OrderSuccessScreen: React.FC<any> = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders } = useApp();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 50, marginTop: 24, marginBottom: 12 }}>🎉</Text>
        
        <Text style={styles.successBadge}>ORDER CONFIRMED • SHAJAPUR EXPRESS</Text>
        <Text style={styles.title}>Thank You for Shopping!</Text>
        <Text style={styles.subTitle}>Order ID: {currentOrder ? currentOrder.id : 'ORD-DC9824'}</Text>

        {/* Live Stepper Card */}
        <View style={styles.stepperCard}>
          <Text style={styles.stepperHeader}>30-45 Mins Live Delivery Stepper</Text>
          
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
              <Text style={styles.stepDesc}>Packing tumblers/stationery with gift ribbon</Text>
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
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Store')}
        >
          <Text style={styles.homeBtnText}>Return to Store Catalog</Text>
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
  scroll: {
    flex: 1,
    padding: 20,
  },
  successBadge: {
    backgroundColor: '#D4AF37',
    color: '#0F1219',
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F1219',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 24,
  },
  stepperCard: {
    width: '100%',
    backgroundColor: '#0F1219',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
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
  homeBtn: {
    backgroundColor: '#0F1219',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  homeBtnText: {
    color: '#F4E8C1',
    fontWeight: '900',
    fontSize: 13,
  },
});
