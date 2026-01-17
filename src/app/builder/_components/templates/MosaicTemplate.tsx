import type { CSSProperties } from 'react';

import type { ResumeData, SectionKey } from '../ResumeContext';
import {
  ContactStack,
  Photo,
  getFullName,
  getSectionOrder,
  hasSectionContent,
  renderCertifications,
  renderEducation,
  renderExperience,
  renderProjects,
  renderSkillsInline,
} from './templateHelpers';
import { getTemplateTheme, joinParts, type ResumeStyleSettings } from './templateKit';

export function MosaicTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Mosaic: hero strip + staggered cards in a 2-column grid.
  const order = getSectionOrder(resumeData);

  const h1: CSSProperties = { fontSize: '30px', fontWeight: 950, margin: 0, color: colors.textPrimary, letterSpacing: '0.2px' };
  const meta: CSSProperties = { fontSize: '10.6px', color: colors.textMuted, lineHeight: 1.45 };

  const title: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.3px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
  const itemTitle: CSSProperties = { fontSize: '12px', fontWeight: 850, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.5px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.6, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const card: CSSProperties = {
    borderRadius: '16px',
    border: `${line.hairline}px solid ${colors.divider}`,
    padding: '12px 12px',
    background: colors.white,
    breakInside: 'avoid',
  };

  const cardHeader = (label: string) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      <div style={title}>{label}</div>
      <div style={{ height: `${line.hairline}px`, background: colors.divider }} />
    </div>
  );

  const renderCard = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    const label = key === 'summary' ? 'Profile' : key[0].toUpperCase() + key.slice(1);
    if (key === 'summary') {
      return (
        <div style={card}>
          {cardHeader(label)}
          <div style={{ marginTop: '10px', ...body }}>{resumeData.personalInfo.professionalSummary}</div>
        </div>
      );
    }
    if (key === 'experience') {
      return (
        <div style={card}>
          {cardHeader('Experience')}
          <div style={{ marginTop: '10px' }}>{renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}</div>
        </div>
      );
    }
    if (key === 'projects') {
      return (
        <div style={card}>
          {cardHeader('Projects')}
          <div style={{ marginTop: '10px' }}>{renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link, dividerColor: colors.divider })}</div>
        </div>
      );
    }
    if (key === 'education') {
      return (
        <div style={card}>
          {cardHeader('Education')}
          <div style={{ marginTop: '10px' }}>{renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}</div>
        </div>
      );
    }
    if (key === 'skills') {
      return (
        <div style={card}>
          {cardHeader('Skills')}
          <div style={{ marginTop: '10px' }}>{renderSkillsInline(resumeData, { fontSize: '10.8px', lineHeight: 1.55, color: colors.textSecondary }, { fontSize: '9.9px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' })}</div>
        </div>
      );
    }
    if (key === 'certifications') {
      return (
        <div style={card}>
          {cardHeader('Certifications')}
          <div style={{ marginTop: '10px' }}>{renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link })}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header style={{ borderRadius: '18px', border: `${line.hairline}px solid ${colors.divider}`, overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ height: '10px', background: colors.accent }} />
        <div style={{ padding: '14px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px', alignItems: 'center' }}>
            <Photo resumeData={resumeData} size={72} radius={18} borderWidth={line.hairline} borderColor={colors.divider} background={colors.subtleBg} textColor={colors.textPrimary} />
            <div style={{ minWidth: 0 }}>
              <h1 style={h1}>{getFullName(resumeData)}</h1>
              <div style={{ marginTop: '10px', ...meta }}>{joinParts([resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location], ' • ')}</div>
              {joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ') && (
                <div style={{ marginTop: '4px', fontSize: '10.6px', color: colors.accent }}>{joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ')}</div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={{ marginBottom: '12px' }}>
        <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.6px'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>{order.map((k) => <div key={k}>{renderCard(k)}</div>)}</div>
    </div>
  );
}
