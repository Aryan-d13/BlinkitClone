import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { colors, spacing, radii, shadows, typography } from '../theme/tokens';

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => {
  const icons: Record<string, [string, string]> = {
    Home:       ['○', '●'],
    Categories: ['▦', '▣'],
    Search:     ['◎', '◉'],
    Account:    ['◇', '◆'],
  };
  const [inactive, active] = icons[label] || ['·', '·'];
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
      {focused ? active : inactive}
    </Text>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.obsidian,
    borderTopWidth: 1,
    borderTopColor: colors.borderGoldStrong,
    height: Platform.OS === 'android' ? 64 : 80,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'android' ? spacing.sm : spacing.xl,
    ...shadows.high,
  },
  tabItem: {
    paddingVertical: spacing.xs,
  },
  tabLabel: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 10,
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  tabIconActive: {
    color: colors.gold,
  },
});
