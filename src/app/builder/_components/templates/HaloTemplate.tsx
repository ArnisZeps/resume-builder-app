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

export function HaloTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Halo: centered header with accent ring around photo, clean dividers.
  const order = getSectionOrder(resumeData);

  const h1: CSSProperties = { fontSize: '34px', fontWeight: 950, margin: 0, color: colors.textPrimary, letterSpacing: '0.2px' };
  const title: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.3px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
  const itemTitle: CSSProperties = { fontSize: '12px', fontWeight: 850, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.5px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.62, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const section = (label: string, children: ReactNode) => (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', alignItems: 'center' }}>
        <div style={title}>{label}</div>
        <div style={{ height: `${line.hairline}px`, background: colors.divider }} />
      </div>
      <div style={{ marginTop: '10px' }}>{children}</div>
    </section>
  );

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    if (key === 'summary') return section('Profile', <div style={body}>{resumeData.personalInfo.professionalSummary}</div>);
    if (key === 'experience') return section('Experience', renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider }));
    if (key === 'projects') return section('Projects', renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link, dividerColor: colors.divider }));
    if (key === 'education') return section('Education', renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider }));
    if (key === 'skills') return section('Skills', renderSkillsInline(resumeData, { fontSize: '10.8px', lineHeight: 1.55, color: colors.textSecondary }, { fontSize: '9.9px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' }));
    if (key === 'certifications') return section('Certifications', renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link }));
    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header style={{ position: 'relative', textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <div style={{ padding: '6px', borderRadius: '999px', background: colors.accent }}>
            <div style={{ padding: '6px', borderRadius: '999px', background: colors.white }}>
              <Photo resumeData={resumeData} size={72} radius={999} borderWidth={0} background={colors.subtleBg} textColor={colors.textPrimary} />
            </div>
          </div>
        </div>
        <h1 style={h1}>{getFullName(resumeData)}</h1>
        <div style={{ marginTop: '10px' }}>
          <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.6px'} />
        </div>
        <div style={{ height: `${Math.max(3, line.accentBar)}px`, background: colors.accent, borderRadius: '999px', marginTop: '14px' }} />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{order.map((k) => <div key={k}>{renderMain(k)}</div>)}</div>
    </div>
  );
}
