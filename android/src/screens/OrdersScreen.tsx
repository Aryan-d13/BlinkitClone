import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';

export const OrdersScreen: React.FC<any> = () => {
  const { orders } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Order History ({orders.length})</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {orders.map((o) => (
          <View key={o.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{o.id}</Text>
              <Text style={styles.statusBadge}>{o.status.toUpperCase()}</Text>
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
          </View>
        ))}

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
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    color: '#0F1219',
    fontWeight: '900',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
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
