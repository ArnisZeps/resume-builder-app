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
import { getTemplateTheme, joinParts, type ResumeStyleSettings } from './templateKit';

const SIDEBAR_SECTIONS: readonly SectionKey[] = ['skills', 'certifications'];

export function ValeTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  const sidebarSet = new Set<SectionKey>(SIDEBAR_SECTIONS);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const h1: CSSProperties = { fontSize: '30px', fontWeight: 950, margin: 0, color: colors.textPrimary, letterSpacing: '0.2px' };
  const meta: CSSProperties = { fontSize: '10.6px', color: colors.textMuted, lineHeight: 1.45 };

  const title: CSSProperties = { fontSize: '11px', fontWeight: 950, letterSpacing: '1.4px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
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

    if (key === 'certifications') {
      return (
        <section>
          <div style={head}>Certifications</div>
          <div style={rule} />
          <div style={{ marginTop: '10px' }}>{renderCertifications(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, linkStyle: link })}</div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header style={{ position: 'relative', marginBottom: '18px' }}>
        <div style={{ height: '18px', background: colors.accent, borderRadius: '18px' }} />
        <div style={{ marginTop: '-10px', padding: '0 10px' }}>
          <div style={{ borderRadius: '18px', border: `${line.hairline}px solid ${colors.divider}`, background: colors.white, padding: '14px 14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px', alignItems: 'center' }}>
              <Photo resumeData={resumeData} size={72} radius={18} borderWidth={line.hairline} borderColor={colors.divider} background={colors.subtleBg} textColor={colors.textPrimary} />
              <div style={{ minWidth: 0 }}>
                <h1 style={h1}>{getFullName(resumeData)}</h1>
                <div style={{ marginTop: '8px', ...meta }}>{joinParts([resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location], ' • ')}</div>
                {joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ') && (
                  <div style={{ marginTop: '4px', fontSize: '10.6px', color: colors.accent }}>{joinParts([resumeData.personalInfo.website, resumeData.personalInfo.linkedin, resumeData.personalInfo.github], ' • ')}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '22px' }}>
        <main style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{mainOrder.map((k) => <div key={k}>{renderMain(k)}</div>)}</main>

        <aside style={{ borderRadius: '18px', border: `${line.hairline}px solid ${colors.divider}`, background: colors.subtleBg, padding: '12px 12px' }}>
          <div style={{ marginBottom: '14px' }}>
            <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.4px'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>{sideOrder.map((k) => <div key={k}>{renderSide(k)}</div>)}</div>
        </aside>
      </div>
    </div>
  );
}
