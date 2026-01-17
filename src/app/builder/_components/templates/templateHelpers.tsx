import type { CSSProperties, ReactNode } from 'react';

import type { ResumeData, SectionKey } from '../ResumeContext';
import { normalizeSectionOrder } from '../ResumeContext';
import { COLORS, formatDateRange, formatMonthYear, getInitials, joinParts } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function getSectionOrder(resumeData: ResumeData) {
  return normalizeSectionOrder(resumeData.sectionOrder);
}

export function getFullName(resumeData: ResumeData) {
  return joinParts([resumeData.personalInfo.firstName, resumeData.personalInfo.lastName], ' ');
}

export function getPhotoUrl(resumeData: ResumeData, size: number) {
  const fileId = resumeData.personalInfo.photoFileId;
  if (!fileId) return '';
  return getProfilePicturePreviewUrl(fileId, Math.max(160, size * 2));
}

export function Photo({
  resumeData,
  size,
  radius,
  borderWidth = 0,
  borderColor,
  background,
  textColor,
}: {
  resumeData: ResumeData;
  size: number;
  radius: number;
  borderWidth?: number;
  borderColor?: string;
  background?: string;
  textColor?: string;
}) {
  const url = getPhotoUrl(resumeData, size);

  const containerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    overflow: 'hidden',
    flexShrink: 0,
    background: background ?? COLORS.subtleBg,
    border: `${Math.max(0, borderWidth)}px solid ${borderColor ?? 'transparent'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="Profile photo" style={{ ...containerStyle, objectFit: 'cover' }} />;
  }

  const initials = getInitials(resumeData.personalInfo.firstName, resumeData.personalInfo.lastName);
  return (
    <div style={containerStyle} aria-label="Profile photo placeholder">
      <div
        style={{
          fontSize: `${Math.round(size * 0.36)}px`,
          fontWeight: 800,
          letterSpacing: '0.6px',
          color: textColor ?? COLORS.textPrimary,
        }}
      >
        {initials}
      </div>
    </div>
  );
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

export function ContactStack({
  resumeData,
  color,
  mutedColor,
  fontSize,
}: {
  resumeData: ResumeData;
  color: string;
  mutedColor: string;
  fontSize: string;
}) {
  const p = resumeData.personalInfo;
  const items: Array<{ label: string; value: string }> = [
    { label: 'Email', value: p.email },
    { label: 'Phone', value: p.phone },
    { label: 'Location', value: p.location },
    { label: 'Website', value: p.website },
    { label: 'LinkedIn', value: p.linkedin },
    { label: 'GitHub', value: p.github },
  ].filter((x) => (x.value || '').trim().length > 0);

  if (items.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((it) => (
        <div key={it.label} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
          <div style={{ width: '72px', fontSize, color: mutedColor, fontWeight: 650 }}>{it.label}</div>
          <div style={{ fontSize, color, wordBreak: 'break-word' }}>{it.value}</div>
        </div>
      ))}
    </div>
  );
}

export function renderExperience(
  resumeData: ResumeData,
  opts: {
    titleStyle: CSSProperties;
    metaStyle: CSSProperties;
    bodyStyle: CSSProperties;
    dividerColor?: string;
  },
) {
  return resumeData.experience
    .filter((e) => (e.jobTitle || e.company) && (e.jobTitle || e.company).trim().length > 0)
    .map((e, idx) => (
      <div key={idx} style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: opts.dividerColor ? `1px solid ${opts.dividerColor}` : undefined }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' }}>
          <div style={{ minWidth: 0 }}>
            <div style={opts.titleStyle}>{joinParts([e.jobTitle, e.company], ' • ')}</div>
            <div style={opts.metaStyle}>{joinParts([e.location], ' • ')}</div>
          </div>
          <div style={{ ...opts.metaStyle, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</div>
        </div>
        {e.responsibilities?.some((r) => r.trim()) && (
          <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
            {e.responsibilities
              .filter((r) => r.trim())
              .map((r, rIdx) => (
                <li key={rIdx} style={{ ...opts.bodyStyle, marginBottom: '3px' }}>
                  {r}
                </li>
              ))}
          </ul>
        )}
      </div>
    ));
}

export function renderEducation(
  resumeData: ResumeData,
  opts: {
    titleStyle: CSSProperties;
    metaStyle: CSSProperties;
    bodyStyle: CSSProperties;
    dividerColor?: string;
  },
) {
  return resumeData.education
    .filter((e) => (e.degree || e.institution) && (e.degree || e.institution).trim().length > 0)
    .map((e, idx) => (
      <div key={idx} style={{ paddingBottom: '10px', marginBottom: '10px', borderBottom: opts.dividerColor ? `1px solid ${opts.dividerColor}` : undefined }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' }}>
          <div style={opts.titleStyle}>{e.degree}</div>
          <div style={{ ...opts.metaStyle, whiteSpace: 'nowrap' }}>{formatMonthYear(e.graduationDate)}</div>
        </div>
        <div style={opts.metaStyle}>{joinParts([e.institution, e.location, e.gpa ? `GPA: ${e.gpa}` : ''], ' • ')}</div>
      </div>
    ));
}

export function renderProjects(
  resumeData: ResumeData,
  opts: {
    titleStyle: CSSProperties;
    metaStyle: CSSProperties;
    bodyStyle: CSSProperties;
    linkStyle: CSSProperties;
    dividerColor?: string;
  },
) {
  return resumeData.projects
    .filter((p) => (p.title || p.description) && (p.title || p.description).trim().length > 0)
    .map((p, idx) => (
      <div key={idx} style={{ paddingBottom: '10px', marginBottom: '10px', borderBottom: opts.dividerColor ? `1px solid ${opts.dividerColor}` : undefined }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' }}>
          <div style={opts.titleStyle}>{p.title}</div>
          <div style={{ ...opts.metaStyle, whiteSpace: 'nowrap' }}>{formatDateRange(p.startDate, p.endDate, false)}</div>
        </div>
        {p.url && <div style={{ ...opts.linkStyle, marginTop: '2px' }}>{p.url}</div>}
        {p.description && <div style={{ ...opts.bodyStyle, marginTop: '4px' }}>{p.description}</div>}
        {p.technologies?.some((t) => t.trim()) && <div style={{ ...opts.metaStyle, marginTop: '4px' }}>{p.technologies.filter((t) => t.trim()).join(', ')}</div>}
      </div>
    ));
}

export function renderSkillsInline(resumeData: ResumeData, style: CSSProperties, labelStyle?: CSSProperties) {
  const groups = resumeData.skills
    .filter((g) => (g.category || '') || g.items?.some((i) => i.trim()))
    .map((g) => ({
      category: g.category?.trim() || '',
      items: (g.items ?? []).filter((i) => i.trim()),
    }))
    .filter((g) => g.category || g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {groups.map((g, idx) => (
        <div key={idx}>
          {g.category && <div style={labelStyle}>{g.category}</div>}
          <div style={style}>{g.items.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}

export function renderCertifications(
  resumeData: ResumeData,
  opts: {
    titleStyle: CSSProperties;
    metaStyle: CSSProperties;
    linkStyle: CSSProperties;
  },
) {
  return resumeData.certifications
    .filter((c) => (c.name || c.issuer) && (c.name || c.issuer).trim().length > 0)
    .map((c, idx) => (
      <div key={idx} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline' }}>
          <div style={opts.titleStyle}>{c.name}</div>
          <div style={{ ...opts.metaStyle, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</div>
        </div>
        <div style={opts.metaStyle}>{joinParts([c.issuer], ' • ')}</div>
        {c.url && <div style={{ ...opts.linkStyle, marginTop: '2px' }}>{c.url}</div>}
      </div>
    ));
}

export function renderSectionContainer(
  title: string,
  titleStyle: CSSProperties,
  children: ReactNode,
) {
  return (
    <section>
      <div style={titleStyle}>{title}</div>
      <div style={{ marginTop: '8px' }}>{children}</div>
    </section>
  );
}
