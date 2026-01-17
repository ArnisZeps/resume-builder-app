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
import { getContrastTextColor, getTemplateTheme, type ResumeStyleSettings } from './templateKit';

export function SableTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  const order = getSectionOrder(resumeData);

  const headerBg = colors.headerBgDark;
  const headerText = getContrastTextColor(headerBg);

  const title: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.6px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
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
      <header style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: '18px' }}>
        <div style={{ background: headerBg, color: headerText, padding: '16px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', alignItems: 'center' }}>
            <Photo resumeData={resumeData} size={74} radius={20} borderWidth={0} background={'rgba(255,255,255,0.12)'} textColor={headerText} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '10px', fontWeight: 950, letterSpacing: '2.2px', textTransform: 'uppercase', opacity: 0.9 }}>Resume</div>
              <div style={{ marginTop: '6px', fontSize: '30px', fontWeight: 950, letterSpacing: '0.2px', lineHeight: 1.05 }}>{getFullName(resumeData)}</div>
              <div style={{ marginTop: '10px' }}>
                <ContactStack resumeData={resumeData} color={headerText} mutedColor={headerText} fontSize={'10.2px'} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '10px', background: colors.subtleBg, borderTop: `${line.hairline}px solid ${colors.divider}` }} />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{order.map((k) => <div key={k}>{renderMain(k)}</div>)}</div>
    </div>
  );
}
