import type { CSSProperties, ReactNode } from 'react';

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
import { getTemplateTheme, type ResumeStyleSettings } from './templateKit';

export function IvoryTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Ivory: extremely minimal, thin rules, airy spacing.
  const order = getSectionOrder(resumeData);

  const h1: CSSProperties = { fontSize: '36px', fontWeight: 850, margin: 0, color: colors.textPrimary, letterSpacing: '0.1px' };
  const title: CSSProperties = { fontSize: '10.6px', fontWeight: 950, letterSpacing: '2.2px', textTransform: 'uppercase', color: colors.textMuted, margin: 0 };
  const itemTitle: CSSProperties = { fontSize: '12px', fontWeight: 800, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.5px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.7, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const section = (label: string, children: ReactNode) => (
    <section>
      <div style={title}>{label}</div>
      <div style={{ height: `${line.hairline}px`, background: colors.divider, marginTop: '10px' }} />
      <div style={{ marginTop: '12px' }}>{children}</div>
    </section>
  );

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    if (key === 'summary') return section('Profile', <div style={body}>{resumeData.personalInfo.professionalSummary}</div>);
    if (key === 'experience') return section('Experience', renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider }));
    if (key === 'projects') return section('Projects', renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link, dividerColor: colors.divider }));
    if (key === 'education') return section('Education', renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider }));
    if (key === 'skills') return section('Skills', renderSkillsInline(resumeData, { fontSize: '10.8px', lineHeight: 1.6, color: colors.textSecondary }, { fontSize: '9.9px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' }));
    if (key === 'certifications') return section('Certifications', renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link }));
    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'end', marginBottom: '18px' }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={h1}>{getFullName(resumeData)}</h1>
          <div style={{ marginTop: '12px' }}>
            <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.6px'} />
          </div>
        </div>

        <Photo resumeData={resumeData} size={64} radius={14} borderWidth={line.hairline} borderColor={colors.divider} background={colors.subtleBg} textColor={colors.textPrimary} />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{order.map((k) => <div key={k}>{renderMain(k)}</div>)}</div>
    </div>
  );
}
