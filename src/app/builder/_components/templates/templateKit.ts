import type { CSSProperties } from 'react';

export const COLORS = {
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  divider: '#E5E7EB',
  dot: '#D1D5DB',
  link: '#2563EB',
  headerBgDark: '#1F2937',
  white: '#FFFFFF',
  subtleBg: '#F9FAFB',
} as const;

export function formatMonthYear(isoDate?: string) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatDateRange(startDate?: string, endDate?: string, current?: boolean) {
  const start = formatMonthYear(startDate);
  const end = current ? 'Present' : formatMonthYear(endDate) || 'Present';
  if (!start && !end) return '';
  if (!start) return end;
  return `${start} – ${end}`;
}

export const BASE = {
  headerName: {
    fontSize: '32px',
    fontWeight: 700,
    color: COLORS.textPrimary,
    margin: '0 0 6px 0',
    letterSpacing: '0.3px',
  } satisfies CSSProperties,
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: COLORS.textPrimary,
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderBottom: `1px solid ${COLORS.divider}`,
    paddingBottom: '6px',
  } satisfies CSSProperties,
  itemTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: COLORS.textPrimary,
    margin: 0,
  } satisfies CSSProperties,
  itemMeta: {
    fontSize: '11px',
    color: COLORS.textMuted,
    margin: 0,
  } satisfies CSSProperties,
  bodyText: {
    fontSize: '11px',
    color: COLORS.textSecondary,
    lineHeight: '1.6',
    margin: 0,
  } satisfies CSSProperties,
} as const;
