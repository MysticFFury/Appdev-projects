import React from 'react';
import { View, Text } from 'react-native';
import { customerStyles } from './customerStyles';

type Props = { kicker: string; title: string; lead: string };

export default function CustomerPageHero({ kicker, title, lead }: Props) {
  return (
    <View style={customerStyles.pageHero}>
      <Text style={customerStyles.kicker}>{kicker}</Text>
      <Text style={customerStyles.pageTitle}>{title}</Text>
      <Text style={customerStyles.pageLead}>{lead}</Text>
    </View>
  );
}
