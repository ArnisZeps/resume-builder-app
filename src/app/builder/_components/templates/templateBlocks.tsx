import type { CSSProperties, ReactNode } from 'react';

import type { ResumeData, SectionKey } from '../ResumeContext';
import { normalizeSectionOrder } from '../ResumeContext';
import {
  formatDateRange,
  formatMonthYear,
  getInitials,
  joinParts,
  type TemplateTheme,
} from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function getOrderedSectionKeys(resumeData: ResumeData): SectionKey[] {
  return normalizeSectionOrder(resumeData.sectionOrder);
}

export function splitSectionKeys(order: SectionKey[], sidebarSections: readonly SectionKey[]) {
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  return {
    main: order.filter((k) => !sidebarSet.has(k)),
    sidebar: order.filter((k) => sidebarSet.has(k)),
  };
}

export function hasSectionContent(resumeData: ResumeData, key: SectionKey) {
  switch (key) {
    case 'summary':
      return !!resumeData.personalInfo.professionalSummary?.trim();
    case 'experience':
      return resumeData.experience?.some((e) => (e.jobTitle || e.company) && (e.jobTitle || e.company).trim().length > 0);
    case 'projects':
      return resumeData.projects?.some((p) => (p.title || p.description) && (p.title || p.description).trim().length > 0);
    case 'education':
      return resumeData.education?.some((e) => (e.degree || e.institution) && (e.degree || e.institution).trim().length > 0);
    case 'skills':
      return resumeData.skills?.some((g) => (g.category || '') || g.items?.some((i) => i.trim()));
    case 'certifications':
      return resumeData.certifications?.some((c) => (c.name || c.issuer) && (c.name || c.issuer).trim().length > 0);
    default:
      return false;
  }
}

export function renderPhoto(
  resumeData: ResumeData,
  theme: TemplateTheme,
  opts: {
    size: number;
    radius: number;
    borderWidth?: number;
    borderColor?: string;
    background?: string;
    textColor?: string;
  },
) {
  const { personalInfo } = resumeData;
  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, Math.max(160, opts.size * 2)) : '';

  const containerStyle: CSSProperties = {
    width: `${opts.size}px`,
    height: `${opts.size}px`,
    borderRadius: `${opts.radius}px`,
    overflow: 'hidden',
    flexShrink: 0,
    background: opts.background ?? theme.colors.accentSoftBg,
    border: `${Math.max(0, opts.borderWidth ?? 0)}px solid ${opts.borderColor ?? theme.colors.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photoUrl} alt="Profile photo" style={{ ...containerStyle, objectFit: 'cover' }} />;
  }

  const initials = getInitials(personalInfo.firstName, personalInfo.lastName);
  return (
    <div style={containerStyle} aria-label="Profile photo placeholder">
      <div
        style={{
          fontSize: `${Math.round(opts.size * 0.36)}px`,
          fontWeight: 750,
          letterSpacing: '0.6px',
          color: opts.textColor ?? theme.colors.textPrimary,
        }}
      >
        {initials}
      </div>
    </div>
  );
}

export function renderContactLine(resumeData: ResumeData) {
  const p = resumeData.personalInfo;
  return joinParts([p.email, p.phone, p.location], ' • ');
}

export function renderLinkLine(resumeData: ResumeData) {
  const p = resumeData.personalInfo;
  return joinParts([p.website, p.linkedin, p.github], ' • ');
}

export type SectionRenderStyles = {
  sectionTitle: CSSProperties;
  itemTitle: CSSProperties;
  itemMeta: CSSProperties;
  bodyText: CSSProperties;
  linkText?: CSSProperties;
  pill?: CSSProperties;
  divider?: CSSProperties;
};

export function renderSection(
  key: SectionKey,
  resumeData: ResumeData,
  theme: TemplateTheme,
  styles: SectionRenderStyles,
  titleOverride?: string,
): ReactNode {
  if (!hasSectionContent(resumeData, key)) return null;

  const title = titleOverride ??
    (key === 'summary'
      ? 'Summary'
      : key === 'experience'
        ? 'Experience'
        : key === 'projects'
          ? 'Projects'
          : key === 'education'
            ? 'Education'
            : key === 'skills'
              ? 'Skills'
              : 'Certifications');

  const titleNode = <h2 style={styles.sectionTitle}>{title}</h2>;

  switch (key) {
    case 'summary':
      return (
        <div>
          {titleNode}
          <p style={styles.bodyText}>{resumeData.personalInfo.professionalSummary}</p>
        </div>
      );

    case 'experience':
      return (
        <div>
          {titleNode}
          {resumeData.experience
            .filter((e) => (e.jobTitle || e.company) && (e.jobTitle || e.company).trim().length > 0)
            .map((e, idx) => (
              <div key={idx} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={styles.itemTitle}>{e.jobTitle}</h3>
                    <div style={{ ...styles.itemMeta, fontWeight: 650, color: theme.colors.textSecondary, marginTop: '2px' }}>
                      {joinParts([e.company, e.location], ' • ')}
                    </div>
                  </div>
                  <div style={{ ...styles.itemMeta, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</div>
                </div>

                {e.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                    {e.responsibilities
                      .filter((r) => r.trim())
                      .map((r, rIdx) => (
                        <li key={rIdx} style={{ ...styles.bodyText, marginBottom: '3px' }}>
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      );

    case 'projects':
      return (
        <div>
          {titleNode}
          {resumeData.projects
            .filter((p) => (p.title || p.description) && (p.title || p.description).trim().length > 0)
            .map((p, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={styles.itemTitle}>{p.title}</h3>
                  <div style={{ ...styles.itemMeta, whiteSpace: 'nowrap' }}>{formatDateRange(p.startDate, p.endDate, false)}</div>
                </div>
                {p.url && <div style={{ ...(styles.linkText ?? { color: theme.colors.accent }), marginTop: '2px', fontSize: styles.itemMeta.fontSize }}>{p.url}</div>}
                {p.description && <p style={{ ...styles.bodyText, marginTop: '4px' }}>{p.description}</p>}
                {p.technologies?.some((t) => t.trim()) && (
                  <div style={{ ...styles.itemMeta, marginTop: '4px' }}>{p.technologies.filter((t) => t.trim()).join(', ')}</div>
                )}
              </div>
            ))}
        </div>
      );

    case 'education':
      return (
        <div>
          {titleNode}
          {resumeData.education
            .filter((e) => (e.degree || e.institution) && (e.degree || e.institution).trim().length > 0)
            .map((e, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={styles.itemTitle}>{e.degree}</h3>
                  <div style={{ ...styles.itemMeta, whiteSpace: 'nowrap' }}>{formatMonthYear(e.graduationDate)}</div>
                </div>
                <div style={{ ...styles.itemMeta, fontWeight: 650, color: theme.colors.textSecondary, marginTop: '2px' }}>
                  {joinParts([e.institution, e.location, e.gpa ? `GPA: ${e.gpa}` : ''], ' • ')}
                </div>
              </div>
            ))}
        </div>
      );

    case 'skills':
      return (
        <div>
          {titleNode}
          {resumeData.skills
            .filter((g) => (g.category || '') || g.items?.some((i) => i.trim()))
            .map((g, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                {g.category && <div style={{ ...styles.itemMeta, fontWeight: 800, color: theme.colors.textPrimary, marginBottom: '3px' }}>{g.category}</div>}
                {styles.pill ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(g.items ?? [])
                      .filter((i) => i.trim())
                      .map((i, iIdx) => (
                        <span key={iIdx} style={styles.pill}>
                          {i}
                        </span>
                      ))}
                  </div>
                ) : (
                  <div style={styles.bodyText}>{(g.items ?? []).filter((i) => i.trim()).join(', ')}</div>
                )}
              </div>
            ))}
        </div>
      );

    case 'certifications':
      return (
        <div>
          {titleNode}
          {resumeData.certifications
            .filter((c) => (c.name || c.issuer) && (c.name || c.issuer).trim().length > 0)
            .map((c, idx) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={styles.itemTitle}>{c.name}</h3>
                  <div style={{ ...styles.itemMeta, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</div>
                </div>
                <div style={{ ...styles.itemMeta, color: theme.colors.textSecondary }}>{joinParts([c.issuer, c.url], ' • ')}</div>
              </div>
            ))}
        </div>
      );

    default:
      return null;
  }
}
