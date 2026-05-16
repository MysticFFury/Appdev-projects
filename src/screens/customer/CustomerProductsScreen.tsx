import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { fetchProducts, formatPeso, getCategoryName, getProductImageUrl } from '../../app/api/products';
import { addToCart, getCartCount } from '../../utils/cart';
import { Product } from '../../types/product.types';
import { colors, radii } from '../../theme';

export default function CustomerProductsScreen({ navigation }: NavigationProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxBudget, setMaxBudget] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const load = async () => {
    try {
      setProducts(await fetchProducts());
    } catch (e: any) {
      Alert.alert('Could not load products', e?.message || 'Is Symfony running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useFocusEffect(useCallback(() => {
    getCartCount().then(setCartCount);
  }, []));

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(getCategoryName(p).toLowerCase()));
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const max = maxBudget.trim() ? Number(maxBudget) : null;
    return products.filter((p) => {
      const cat = getCategoryName(p).toLowerCase();
      if (category !== 'all' && cat !== category) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (max !== null && !Number.isNaN(max) && p.price > max) return false;
      return true;
    });
  }, [products, search, category, maxBudget]);

  const onAdd = async (product: Product) => {
    if (product.quantity <= 0) {
      Alert.alert('Out of stock');
      return;
    }
    await addToCart(product.id, product.name, product.price);
    setCartCount(await getCartCount());
    Alert.alert('Added to cart', `${product.name} · ${formatPeso(product.price)}`);
  };

  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_PRODUCTS}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero
          kicker="Customer catalog"
          title="GearGrid catalog"
          lead="Search, filter by category, or set a max budget — same products as the website."
        />
        {cartCount > 0 && (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate(ROUTES.CUSTOMER_CART)}
          >
            <Text style={styles.cartBtnText}>View cart ({cartCount})</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="Search components…"
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>
                {cat === 'all' ? 'All' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Max budget (₱)"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={maxBudget}
          onChangeText={setMaxBudget}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 24 }} />
        ) : (
          <View style={styles.grid}>
            {filtered.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: getProductImageUrl(item.image) }} style={styles.img} />
                <Text style={styles.cat}>{getCategoryName(item)}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{formatPeso(item.price)}</Text>
                <TouchableOpacity
                  style={[styles.addBtn, item.quantity <= 0 && { opacity: 0.5 }]}
                  onPress={() => onAdd(item)}
                  disabled={item.quantity <= 0}
                >
                  <Text style={styles.addText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {!loading && filtered.length === 0 && (
          <Text style={styles.empty}>No products match your filters.</Text>
        )}
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  cartBtn: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
    marginBottom: 14,
  },
  cartBtnText: { color: '#fff', fontWeight: '700' },
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radii.sm,
    padding: 12,
    color: colors.textMain,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginRight: 8,
  },
  chipActive: { backgroundColor: 'rgba(108, 99, 255, 0.2)', borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 13 },
  chipTextActive: { color: '#e0e7ff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  card: {
    width: '47%',
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 10,
  },
  img: { width: '100%', height: 100, borderRadius: radii.sm, marginBottom: 8 },
  cat: { fontSize: 11, color: colors.primary, fontWeight: '700' },
  name: { fontSize: 14, fontWeight: '700', color: colors.textMain, marginVertical: 4 },
  price: { fontSize: 15, fontWeight: '800', color: colors.textMain, marginBottom: 8 },
  addBtn: { backgroundColor: colors.primary, borderRadius: radii.sm, paddingVertical: 10, alignItems: 'center' },
  addText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 20 },
});
