import type { CSSProperties, ReactNode } from 'react';

import type { ResumeData, SectionKey } from '../ResumeContext';
import {
  ContactStack,
  Photo,
  getFullName,
  getSectionOrder,
  hasSectionContent,
  renderEducation,
  renderExperience,
  renderProjects,
  renderSkillsInline,
  renderCertifications,
} from './templateHelpers';
import { getTemplateTheme, type ResumeStyleSettings } from './templateKit';

const SIDEBAR_SECTIONS: readonly SectionKey[] = ['skills', 'education'];

export function JuniperTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  const sidebarSet = new Set<SectionKey>(SIDEBAR_SECTIONS);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const h1: CSSProperties = { fontSize: '28px', fontWeight: 950, margin: 0, color: colors.textPrimary, letterSpacing: '0.2px' };
  const small: CSSProperties = { fontSize: '10.6px', color: colors.textMuted, lineHeight: 1.45 };

  const title: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.2px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
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
    if (key === 'certifications') return section('Certifications', renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link }));
    return null;
  };

  const renderSide = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    const head: CSSProperties = { fontSize: '10.4px', fontWeight: 950, letterSpacing: '1.4px', textTransform: 'uppercase', color: colors.textMuted, margin: 0 };
    const rule: CSSProperties = { height: `${line.hairline}px`, background: colors.divider, marginTop: '10px' };

    if (key === 'skills') {
      return (
        <section>
          <div style={head}>Skills</div>
          <div style={rule} />
          <div style={{ marginTop: '10px' }}>{renderSkillsInline(resumeData, { fontSize: '10.6px', lineHeight: 1.55, color: colors.textSecondary }, { fontSize: '9.8px', fontWeight: 900, color: colors.textPrimary, marginBottom: '4px' })}</div>
        </section>
      );
    }

    if (key === 'education') {
      return (
        <section>
          <div style={head}>Education</div>
          <div style={rule} />
          <div style={{ marginTop: '10px' }}>{renderEducation(resumeData, { titleStyle: { fontSize: '11px', fontWeight: 850, color: colors.textPrimary }, metaStyle: { fontSize: '10px', color: colors.textMuted }, bodyStyle: { fontSize: '10.6px', lineHeight: 1.5, color: colors.textSecondary } })}</div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '22px' }}>
        <main>
          <header style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'center' }}>
              <div style={{ minWidth: 0 }}>
                <h1 style={h1}>{getFullName(resumeData)}</h1>
                <div style={{ marginTop: '8px', ...small }}>{resumeData.personalInfo.location}</div>
              </div>
              <Photo resumeData={resumeData} size={64} radius={18} borderWidth={line.hairline} borderColor={colors.divider} background={colors.subtleBg} textColor={colors.textPrimary} />
            </div>
            <div style={{ height: `${Math.max(3, line.accentBar)}px`, background: colors.accent, borderRadius: '999px' }} />
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{mainOrder.map((k) => <div key={k}>{renderMain(k)}</div>)}</div>
        </main>

        <aside style={{ borderRadius: '16px', border: `${line.hairline}px solid ${colors.divider}`, overflow: 'hidden' }}>
          <div style={{ height: '10px', background: colors.accent }} />
          <div style={{ padding: '14px 12px' }}>
            <div style={{ marginBottom: '14px' }}>
              <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.4px'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{sideOrder.map((k) => <div key={k}>{renderSide(k)}</div>)}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
