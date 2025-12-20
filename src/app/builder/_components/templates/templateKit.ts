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

export const ACCENT_COLORS = {
  blue: COLORS.link,
  charcoal: COLORS.headerBgDark,
  black: COLORS.textPrimary,
} as const;

export type ResumeStyleSettings = {
  /** CSS color string, currently stored as hex (from <input type="color" />). */
  accentColor: string;
  /** Multiplier for font sizes (keep narrow range to avoid pagination surprises). */
  textScale: number;
  /** Multiplier for line-height (spacing between lines). */
  lineHeightScale: number;
  /** Multiplier for divider/border thickness. */
  lineScale: number;
};

export const DEFAULT_STYLE_SETTINGS: ResumeStyleSettings = {
  accentColor: COLORS.link,
  textScale: 1,
  lineHeightScale: 1,
  lineScale: 1,
};

export const RECOMMENDED_ACCENT_COLORS = [
  COLORS.link, // blue
  '#0EA5E9', // sky
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  COLORS.headerBgDark, // charcoal
  COLORS.textPrimary, // near-black
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeStyleSettings(input: unknown): ResumeStyleSettings {
  const fallback = DEFAULT_STYLE_SETTINGS;
  if (!input || typeof input !== 'object') return fallback;

  const maybe = input as Record<string, unknown>;

  const isHex = (value: string) => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value.trim());

  // New format: accentColor
  const accentColorRaw = maybe.accentColor;

  // Legacy format: accent preset key (blue/charcoal/black) or sometimes a hex string in `accent`.
  const legacyAccentRaw = maybe.accent;

  let accentColor = fallback.accentColor;
  if (typeof accentColorRaw === 'string' && isHex(accentColorRaw)) {
    accentColor = accentColorRaw.trim();
  } else if (typeof legacyAccentRaw === 'string') {
    const legacyTrimmed = legacyAccentRaw.trim();
    if (isHex(legacyTrimmed)) {
      accentColor = legacyTrimmed;
    } else if (legacyTrimmed in ACCENT_COLORS) {
      accentColor = ACCENT_COLORS[legacyTrimmed as keyof typeof ACCENT_COLORS];
    }
  }

  const textScaleRaw = maybe.textScale;
  const textScaleNum = typeof textScaleRaw === 'number' && Number.isFinite(textScaleRaw) ? textScaleRaw : fallback.textScale;
  const textScale = clamp(textScaleNum, 0.9, 1.1);

  // New format: lineHeightScale
  const lineHeightScaleRaw = maybe.lineHeightScale;
  const lineHeightScaleNum =
    typeof lineHeightScaleRaw === 'number' && Number.isFinite(lineHeightScaleRaw) ? lineHeightScaleRaw : fallback.lineHeightScale;

  // Back-compat: older "density" UI stored only lineScale. If lineHeightScale isn't present,
  // mirror lineScale into lineHeightScale so previously-saved "compact" resumes still behave compact.
  const legacyLineScaleRaw = maybe.lineScale;
  const legacyLineScaleNum =
    typeof legacyLineScaleRaw === 'number' && Number.isFinite(legacyLineScaleRaw) ? legacyLineScaleRaw : undefined;

  const lineHeightScale = clamp(
    typeof maybe.lineHeightScale === 'number' && Number.isFinite(maybe.lineHeightScale)
      ? lineHeightScaleNum
      : legacyLineScaleNum ?? lineHeightScaleNum,
    0.9,
    1.2,
  );

  const lineScaleRaw = maybe.lineScale;
  const lineScaleNum = typeof lineScaleRaw === 'number' && Number.isFinite(lineScaleRaw) ? lineScaleRaw : fallback.lineScale;
  const lineScale = clamp(lineScaleNum, 0.8, 1.6);

  return { accentColor, textScale, lineHeightScale, lineScale };
}

function scalePx(value: string, scale: number) {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  if (!match) return value;
  const num = Number.parseFloat(match[1]);
  if (Number.isNaN(num)) return value;
  return `${Math.round(num * scale * 10) / 10}px`;
}

function hexToRgba(hex: string, alpha: number) {
  const trimmed = hex.trim();
  const short = /^#([0-9a-fA-F]{3})$/.exec(trimmed);
  const long = /^#([0-9a-fA-F]{6})$/.exec(trimmed);
  if (!short && !long) return undefined;

  const to255 = (v: string) => Number.parseInt(v, 16);

  let r = 0;
  let g = 0;
  let b = 0;

  if (short) {
    const [rs, gs, bs] = short[1].split('');
    r = to255(rs + rs);
    g = to255(gs + gs);
    b = to255(bs + bs);
  } else if (long) {
    r = to255(long[1].slice(0, 2));
    g = to255(long[1].slice(2, 4));
    b = to255(long[1].slice(4, 6));
  }

  const a = Math.min(1, Math.max(0, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function scaleLineHeight(value: CSSProperties['lineHeight'], scale: number) {
  if (value == null) return value;
  if (typeof value === 'number') return Math.round(value * scale * 100) / 100;
  const asNum = Number.parseFloat(String(value));
  if (!Number.isFinite(asNum)) return value;
  return String(Math.round(asNum * scale * 100) / 100);
}

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

export function getTemplateTheme(settings?: Partial<ResumeStyleSettings>) {
  const merged = normalizeStyleSettings({
    ...DEFAULT_STYLE_SETTINGS,
    ...settings,
  });

  const textScale = clamp(merged.textScale ?? 1, 0.9, 1.1);
  const lineHeightScale = clamp(merged.lineHeightScale ?? 1, 0.9, 1.2);
  const lineScale = clamp(merged.lineScale ?? 1, 0.8, 1.6);
  const accent = merged.accentColor;

  const base = {
    headerName: {
      ...BASE.headerName,
      fontSize: scalePx(BASE.headerName.fontSize, textScale),
    } satisfies CSSProperties,
    sectionTitle: {
      ...BASE.sectionTitle,
      fontSize: scalePx(BASE.sectionTitle.fontSize, textScale),
      paddingBottom: scalePx(BASE.sectionTitle.paddingBottom, textScale),
    } satisfies CSSProperties,
    itemTitle: {
      ...BASE.itemTitle,
      fontSize: scalePx(BASE.itemTitle.fontSize, textScale),
    } satisfies CSSProperties,
    itemMeta: {
      ...BASE.itemMeta,
      fontSize: scalePx(BASE.itemMeta.fontSize, textScale),
    } satisfies CSSProperties,
    bodyText: {
      ...BASE.bodyText,
      fontSize: scalePx(BASE.bodyText.fontSize, textScale),
      lineHeight: scaleLineHeight(BASE.bodyText.lineHeight, lineHeightScale),
    } satisfies CSSProperties,
  } as const;

  const line = {
    hairline: Math.max(1, Math.round(1 * lineScale)),
    normal: Math.max(1, Math.round(2 * lineScale)),
    thick: Math.max(2, Math.round(3 * lineScale)),
    accentBar: Math.max(3, Math.round(5 * lineScale)),
  } as const;

  const colors = {
    ...COLORS,
    accent,
    accentSoftBg: hexToRgba(accent, 0.08) ?? COLORS.subtleBg,
  } as const;

  return { settings: merged, colors, base, line };
}
