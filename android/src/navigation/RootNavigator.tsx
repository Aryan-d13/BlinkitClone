import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from './TabNavigator';
import { ProductsScreen } from '../screens/ProductsScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderSuccessScreen } from '../screens/OrderSuccessScreen';
import { OrdersScreen } from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F1219',
        },
        headerTintColor: '#D4AF37',
        headerTitleStyle: {
          fontWeight: '900',
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Store Catalog' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Shopping Bag' }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Express Checkout' }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ title: 'Order Status', headerLeft: () => null }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: 'My Order History' }}
      />
    </Stack.Navigator>
  );
};
