import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { checkPcBuild, fetchPcBuilderCatalog, PcCatalog } from '../../app/api/customer';
import { formatPeso } from '../../app/api/products';
import { colors, radii } from '../../theme';

export default function CustomerPcBuilderScreen({ navigation }: NavigationProps) {
  const [catalog, setCatalog] = useState<PcCatalog>({});
  const [slotOrder, setSlotOrder] = useState<string[]>([]);
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetchPcBuilderCatalog()
      .then((d) => {
        setCatalog(d.catalog || {});
        setSlotOrder(d.slotOrder || []);
      })
      .catch((e) => Alert.alert('Error', e?.message))
      .finally(() => setLoading(false));
  }, []);

  const onCheck = async () => {
    setChecking(true);
    try {
      setResult(await checkPcBuild(selection));
    } catch (e: any) {
      Alert.alert('Check failed', e?.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_PC_BUILDER}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero
          kicker="Smart build planning"
          title="PC Builder Checker"
          lead="Pick parts from live inventory and check compatibility."
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={customerStyles.glassCard}>
            {slotOrder.map((slot) => (
              <View key={slot} style={{ marginBottom: 12 }}>
                <Text style={styles.slotLabel}>{slot.replace(/_/g, ' ')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[styles.opt, !selection[slot] && styles.optOn]}
                    onPress={() => setSelection((s) => ({ ...s, [slot]: '' }))}
                  >
                    <Text style={styles.optText}>None</Text>
                  </TouchableOpacity>
                  {(catalog[slot] || []).map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      style={[styles.opt, selection[slot] === p.id && styles.optOn]}
                      onPress={() => setSelection((s) => ({ ...s, [slot]: p.id }))}
                    >
                      <Text style={styles.optText} numberOfLines={1}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ))}
            <TouchableOpacity style={styles.check} onPress={onCheck} disabled={checking}>
              {checking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.checkText}>Check compatibility</Text>
              )}
            </TouchableOpacity>
            {result && (
              <View style={{ marginTop: 16 }}>
                <Text style={styles.res}>Status: {String(result.status)}</Text>
                {typeof result.totalPrice === 'number' && (
                  <Text style={styles.res}>Total: {formatPeso(result.totalPrice as number)}</Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  slotLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 6 },
  opt: {
    padding: 10,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginRight: 8,
    maxWidth: 140,
  },
  optOn: { borderColor: colors.primary, backgroundColor: 'rgba(108,99,255,0.15)' },
  optText: { color: colors.textMain, fontSize: 12 },
  check: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  checkText: { color: '#fff', fontWeight: '700' },
  res: { color: colors.textMuted, marginTop: 6 },
});
