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

export function GroveTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Editorial card stack: big header card + section cards.
  const order = getSectionOrder(resumeData);

  const h1: CSSProperties = { fontSize: '32px', fontWeight: 950, margin: 0, color: colors.textPrimary, letterSpacing: '0.2px' };
  const meta: CSSProperties = { fontSize: '10.6px', color: colors.textMuted, lineHeight: 1.45 };

  const sectionTitle: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.4px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
  const itemTitle: CSSProperties = { fontSize: '12px', fontWeight: 850, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.5px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.62, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const card: CSSProperties = {
    borderRadius: '16px',
    border: `${line.hairline}px solid ${colors.divider}`,
    background: colors.white,
    padding: '14px 14px',
  };

  const renderSectionCard = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    const headerRow = (
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', alignItems: 'center' }}>
        <div style={sectionTitle}>{key === 'summary' ? 'Profile' : key[0].toUpperCase() + key.slice(1)}</div>
        <div style={{ height: `${line.hairline}px`, background: colors.divider }} />
      </div>
    );

    if (key === 'summary') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px', ...body }}>{resumeData.personalInfo.professionalSummary}</div>
        </div>
      );
    }

    if (key === 'experience') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px' }}>{renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}</div>
        </div>
      );
    }

    if (key === 'projects') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px' }}>{renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link, dividerColor: colors.divider })}</div>
        </div>
      );
    }

    if (key === 'education') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px' }}>{renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}</div>
        </div>
      );
    }

    if (key === 'skills') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px' }}>{renderSkillsInline(resumeData, { fontSize: '10.8px', lineHeight: 1.55, color: colors.textSecondary }, { fontSize: '9.9px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' })}</div>
        </div>
      );
    }

    if (key === 'certifications') {
      return (
        <div style={card}>
          {headerRow}
          <div style={{ marginTop: '10px' }}>{renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link })}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header
        style={{
          borderRadius: '18px',
          border: `${line.hairline}px solid ${colors.divider}`,
          background: colors.subtleBg,
          padding: '16px 16px',
          marginBottom: '14px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={h1}>{getFullName(resumeData)}</h1>
            <div style={{ marginTop: '10px', ...meta }}>{joinParts([resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location], ' • ')}</div>
            {joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ') && (
              <div style={{ marginTop: '4px', fontSize: '10.6px', color: colors.accent }}>{joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ')}</div>
            )}
          </div>
          <Photo resumeData={resumeData} size={72} radius={18} borderWidth={line.hairline} borderColor={colors.divider} background={colors.white} textColor={colors.textPrimary} />
        </div>
      </header>

      <div style={{ marginBottom: '14px' }}>
        <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.6px'} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{order.map((k) => <div key={k}>{renderSectionCard(k)}</div>)}</div>
    </div>
  );
}
