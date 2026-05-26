import { StyleSheet } from 'react-native';
import { colors, radii, typography } from '../../theme';

export const adminStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flexGrow: 1, padding: 16, paddingBottom: 40 },
  pageTitle: { ...typography.screenTitle, fontSize: 26, marginBottom: 4 },
  pageLead: { color: colors.textMuted, fontSize: 14, marginBottom: 20, lineHeight: 20 },
  
  /* Premium Glassmorphism Panels */
  panel: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  panelTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginBottom: 12, letterSpacing: -0.5 },
  
  /* Metric Cards */
  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(31, 41, 55, 0.4)',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
  },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  metricValue: { fontSize: 32, fontWeight: '800', color: '#f8fafc', letterSpacing: -1 },
  metricLabel: { fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600', marginBottom: 2 },
  metricIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  /* Card Themes */
  cardPurple: { backgroundColor: 'rgba(139, 92, 246, 0.15)' },
  iconPurple: { color: '#8b5cf6', fontSize: 18 },
  cardPink: { backgroundColor: 'rgba(236, 72, 153, 0.15)' },
  iconPink: { color: '#ec4899', fontSize: 18 },
  cardGreen: { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
  iconGreen: { color: '#10b981', fontSize: 18 },
  cardBlue: { backgroundColor: 'rgba(14, 165, 233, 0.15)' },
  iconBlue: { color: '#0ea5e9', fontSize: 18 },
  
  /* Metric Chips */
  chip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radii.sm, flexDirection: 'row', alignItems: 'center' },
  chipPurple: { backgroundColor: 'rgba(139, 92, 246, 0.1)' },
  chipPurpleText: { color: '#a78bfa', fontSize: 11, fontWeight: '600' },
  chipPink: { backgroundColor: 'rgba(236, 72, 153, 0.1)' },
  chipPinkText: { color: '#f472b6', fontSize: 11, fontWeight: '600' },
  chipGreen: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
  chipGreenText: { color: '#34d399', fontSize: 11, fontWeight: '600' },
  chipBlue: { backgroundColor: 'rgba(14, 165, 233, 0.1)' },
  chipBlueText: { color: '#38bdf8', fontSize: 11, fontWeight: '600' },
  badgeText: { color: '#8b5cf6', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },

  /* Rows */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#f8fafc', flex: 1 },
  rowSub: { fontSize: 13, color: '#94a3b8', marginTop: 3 },
  rowMeta: { fontSize: 14, color: '#f8fafc', fontWeight: '700', marginLeft: 8 },
  
  /* Buttons */
  btnPrimary: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  
  /* Basic forms */
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    fontSize: 15,
    marginBottom: 12,
  },
  label: { ...typography.label, marginBottom: 6, color: '#cbd5e1' },
  primaryBtn: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dangerBtn: {
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.3)',
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    paddingVertical: 12,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 10,
  },
  dangerBtnText: { color: '#f87171', fontWeight: '700' },
  empty: { color: '#94a3b8', textAlign: 'center', padding: 24 },
  error: { color: '#f87171', textAlign: 'center', marginBottom: 12 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#8b5cf6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2 },
  
  /* Product Images & Tables */
  productImage: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  productImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
