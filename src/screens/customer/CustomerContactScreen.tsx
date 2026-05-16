import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { submitContact } from '../../app/api/customer';
import { colors, radii } from '../../theme';

export default function CustomerContactScreen({ navigation }: NavigationProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await submitContact({ name, email, subject, message });
      Alert.alert('Sent', res.message || 'We will get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (e: any) {
      Alert.alert('Error', e?.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_CONTACT}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero
          kicker="We reply fast"
          title="Get in touch"
          lead="Questions about products, orders, or enterprise options?"
        />
        <View style={customerStyles.glassCard}>
          <Text style={styles.label}>Full name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={colors.placeholder} />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.placeholder}
          />
          <Text style={styles.label}>Subject</Text>
          <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholderTextColor={colors.placeholder} />
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, { minHeight: 100 }]}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor={colors.placeholder}
          />
          <TouchableOpacity style={styles.send} onPress={handleSend} disabled={sending}>
            {sending ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendText}>Send message</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radii.sm,
    padding: 12,
    color: colors.textMain,
  },
  send: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700' },
});
