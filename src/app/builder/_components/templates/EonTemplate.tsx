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
} from './templateHelpers';
import { getTemplateTheme, type ResumeStyleSettings } from './templateKit';

export function EonTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Inspired by the attached example: tinted left sidebar + bold boxed name header.
  const sidebarSections: readonly SectionKey[] = ['summary', 'skills', 'certifications'];
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const title: CSSProperties = { fontSize: '12px', fontWeight: 900, color: colors.textPrimary };
  const meta: CSSProperties = { fontSize: '10.6px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.6, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const sectionHead = (label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <div style={{ width: '18px', height: '6px', background: colors.accent, borderRadius: '999px' }} />
      <div style={{ fontSize: '12px', fontWeight: 950, letterSpacing: '0.8px', textTransform: 'uppercase', color: colors.textPrimary }}>{label}</div>
    </div>
  );

  const renderSkillBars = () => {
    const flat = resumeData.skills.flatMap((g) => (g.items ?? []).filter((i) => i.trim()));
    const unique = Array.from(new Set(flat)).slice(0, 6);
    if (unique.length === 0) return null;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
        {unique.map((s, idx) => {
          const pct = Math.max(0.45, 0.92 - idx * 0.08);
          return (
            <div key={s}>
              <div style={{ fontSize: '10.8px', fontWeight: 750, color: colors.textPrimary }}>{s}</div>
              <div style={{ marginTop: '6px', height: '6px', background: colors.divider }}>
                <div style={{ height: '6px', width: `${Math.round(pct * 100)}%`, background: colors.textPrimary }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSidebar = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    if (key === 'summary') {
      return (
        <section>
          {sectionHead('About Me')}
          <div style={body}>{resumeData.personalInfo.professionalSummary}</div>
        </section>
      );
    }

    if (key === 'skills') {
      return (
        <section>
          {sectionHead('Skills')}
          {renderSkillBars()}
        </section>
      );
    }

    if (key === 'certifications') {
      return (
        <section>
          {sectionHead('Contact')}
          <ContactStack resumeData={resumeData} color={colors.textPrimary} mutedColor={colors.textMuted} fontSize={'10.6px'} />
        </section>
      );
    }

    return null;
  };

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    if (key === 'experience') {
      return (
        <section>
          {sectionHead('Employment')}
          {renderExperience(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}
        </section>
      );
    }

    if (key === 'education') {
      return (
        <section>
          {sectionHead('Education')}
          {renderEducation(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}
        </section>
      );
    }

    if (key === 'projects') {
      return (
        <section>
          {sectionHead('Projects')}
          {renderProjects(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body, linkStyle: link })}
        </section>
      );
    }

    if (key === 'certifications') {
      return (
        <section>
          {sectionHead('Certifications')}
          {renderCertifications(resumeData, { titleStyle: title, metaStyle: meta, linkStyle: link })}
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '18px' }}>
        <aside style={{ background: colors.accentSoftBg, padding: '18px 16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Photo resumeData={resumeData} size={86} radius={999} borderWidth={0} background={'rgba(255,255,255,0.55)'} textColor={colors.textPrimary} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {sideOrder.map((k) => (
              <div key={k}>{renderSidebar(k)}</div>
            ))}
          </div>
        </aside>

        <main>
          <header
            style={{
              border: `${Math.max(3, line.thick)}px solid ${colors.textPrimary}`,
              padding: '18px 18px',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontSize: '40px', fontWeight: 950, letterSpacing: '0.3px', lineHeight: 1.03 }}>{getFullName(resumeData).toUpperCase()}</div>
          </header>

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
