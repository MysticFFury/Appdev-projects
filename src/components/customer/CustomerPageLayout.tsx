import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenBackground from '../ScreenBackground';
import CustomerTopNav from './CustomerTopNav';
import { colors } from '../../theme';

type Props = {
  navigation: NavigationProp<ParamListBase>;
  activeRoute: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
};

export default function CustomerPageLayout({
  navigation,
  activeRoute,
  children,
  contentContainerStyle,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <CustomerTopNav navigation={navigation} activeRoute={activeRoute} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      </ScreenBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  content: { paddingTop: 8 },
});
