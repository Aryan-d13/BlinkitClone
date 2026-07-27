import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F1219',
          borderTopColor: 'rgba(212, 175, 55, 0.3)',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Store"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>🏪</Text>,
        }}
      />
      <Tab.Screen
        name="Departments"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>📂</Text>,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>🤍</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
