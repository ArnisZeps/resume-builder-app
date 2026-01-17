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
} from './templateHelpers';
import { getTemplateTheme, type ResumeStyleSettings } from './templateKit';

export function CipherTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, vars } = theme;

  // Inspired by the attached minimal example: centered header, left details, main timeline line.
  const sidebarSections: readonly SectionKey[] = ['skills', 'certifications'];
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const sectionTitle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 950,
    letterSpacing: '1.4px',
    textTransform: 'uppercase',
    color: colors.textPrimary,
    margin: 0,
  };

  const itemTitle: CSSProperties = { fontSize: '12px', fontWeight: 850, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.6px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.62, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const timelineSection = (label: string, children: ReactNode) => (
    <section style={{ position: 'relative', paddingLeft: '22px' }}>
      <div style={{ position: 'absolute', left: 0, top: '6px', width: '10px', height: '10px', borderRadius: '999px', background: colors.textPrimary }} />
      <div style={sectionTitle}>{label}</div>
      <div style={{ marginTop: '10px' }}>{children}</div>
    </section>
  );

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    if (key === 'summary') {
      return timelineSection('Profile', <div style={body}>{resumeData.personalInfo.professionalSummary}</div>);
    }

    if (key === 'experience') {
      return timelineSection('Employment History', renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body }));
    }

    if (key === 'education') {
      return timelineSection('Education', renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body }));
    }

    if (key === 'projects') {
      return timelineSection('Internships', renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link }));
    }

    return null;
  };

  const renderSide = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    const head: CSSProperties = { fontSize: '10.6px', fontWeight: 950, letterSpacing: '1.2px', textTransform: 'uppercase', color: colors.textPrimary };
    const lineStyle: CSSProperties = { height: '1px', background: colors.divider, marginTop: '10px' };

    if (key === 'skills') {
      return (
        <section>
          <div style={head}>Skills</div>
          <div style={lineStyle} />
          <div style={{ marginTop: '10px' }}>
            {renderSkillsInline(resumeData, { fontSize: '10.6px', lineHeight: 1.55, color: colors.textSecondary }, { fontSize: '9.8px', fontWeight: 850, color: colors.textPrimary, marginBottom: '4px' })}
          </div>
        </section>
      );
    }

    if (key === 'certifications') {
      return (
        <section>
          <div style={head}>Details</div>
          <div style={lineStyle} />
          <div style={{ marginTop: '10px' }}>
            <ContactStack resumeData={resumeData} color={colors.textSecondary} mutedColor={colors.textMuted} fontSize={'10.3px'} />
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <header style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Photo resumeData={resumeData} size={64} radius={8} borderWidth={0} background={colors.subtleBg} textColor={colors.textPrimary} />
        </div>
        <div style={{ fontSize: '34px', fontWeight: 950, letterSpacing: '1.6px', textTransform: 'uppercase', color: colors.textPrimary }}>{getFullName(resumeData)}</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px' }}>
        <aside style={{ paddingRight: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {sideOrder.map((k) => (
              <div key={k}>{renderSide(k)}</div>
            ))}
          </div>
        </aside>

        <main style={{ position: 'relative', paddingLeft: '18px' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: colors.divider }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {mainOrder.map((k) => (
              <div key={k}>{renderMain(k)}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
