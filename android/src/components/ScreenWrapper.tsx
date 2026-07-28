import React, { ReactNode } from 'react';
import { View, StatusBar, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../theme/tokens';

interface ScreenWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarBg?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  statusBarStyle = 'light-content',
  statusBarBg = colors.obsidian,
}) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
