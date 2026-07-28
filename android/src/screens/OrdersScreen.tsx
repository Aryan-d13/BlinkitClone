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

export const OrdersScreen: React.FC<any> = ({ navigation }) => {
  const { orders } = useApp();

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Order Receipts" showBack={true} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {orders.map((o) => (
          <DoppelCard key={o.id} variant="light" style={styles.orderMargin}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{o.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{o.status.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.date}>{new Date(o.createdAt).toLocaleDateString()}</Text>

            <View style={styles.itemsList}>
              {o.items.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>
                  • {item.quantity}x {item.product.name} (₹{item.totalPrice.toFixed(0)})
                </Text>
              ))}
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.slot}>{o.deliverySlot}</Text>
              <Text style={styles.total}>Paid ₹{o.totalPaid.toFixed(0)}</Text>
            </View>
          </DoppelCard>
        ))}

        <View style={{ height: 40 }} />
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
  orderMargin: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
  },
  statusBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusBadgeText: {
    color: '#0F1219',
    fontWeight: '900',
    fontSize: 9,
  },
  date: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: 10,
  },
  itemsList: {
    marginVertical: 6,
  },
  itemText: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  slot: {
    fontSize: 11,
    color: '#64748B',
  },
  total: {
    fontWeight: '900',
    fontSize: 14,
    color: '#0F1219',
  },
});
