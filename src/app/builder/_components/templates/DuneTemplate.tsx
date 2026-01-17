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
import { getContrastTextColor, getTemplateTheme, type ResumeStyleSettings } from './templateKit';

export function DuneTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, vars } = theme;

  // Inspired by the attached example: photo block on left + wide accent banner on right.
  const sidebarSections: readonly SectionKey[] = ['skills'];
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const accentText = getContrastTextColor(colors.accent);

  const h2: CSSProperties = {
    fontSize: '15px',
    fontWeight: 900,
    letterSpacing: '0.2px',
    color: colors.textPrimary,
    margin: 0,
  };
  const title: CSSProperties = { fontSize: '12px', fontWeight: 850, color: colors.textPrimary };
  const meta: CSSProperties = { fontSize: '10.6px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.6, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const underlineSkillList = () => {
    const flat = resumeData.skills.flatMap((g) => (g.items ?? []).filter((i) => i.trim()));
    const unique = Array.from(new Set(flat)).slice(0, 9);
    if (unique.length === 0) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {unique.map((s) => (
          <div key={s}>
            <div style={{ fontSize: '10.8px', fontWeight: 750, color: colors.textPrimary }}>{s}</div>
            <div style={{ height: '2px', background: colors.divider, marginTop: '6px' }} />
          </div>
        ))}
      </div>
    );
  };

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    const label = key === 'summary' ? 'Profile' : key === 'experience' ? 'Employment History' : key[0].toUpperCase() + key.slice(1);

    if (key === 'summary') {
      return (
        <section>
          <div style={h2}>{label}</div>
          <div style={{ marginTop: '8px', ...body }}>{resumeData.personalInfo.professionalSummary}</div>
        </section>
      );
    }
    if (key === 'experience') {
      return (
        <section>
          <div style={h2}>{label}</div>
          <div style={{ marginTop: '10px' }}>{renderExperience(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}</div>
        </section>
      );
    }
    if (key === 'education') {
      return (
        <section>
          <div style={h2}>Education</div>
          <div style={{ marginTop: '10px' }}>{renderEducation(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}</div>
        </section>
      );
    }
    if (key === 'projects') {
      return (
        <section>
          <div style={h2}>Projects</div>
          <div style={{ marginTop: '10px' }}>{renderProjects(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body, linkStyle: link })}</div>
        </section>
      );
    }
    if (key === 'certifications') {
      return (
        <section>
          <div style={h2}>Certifications</div>
          <div style={{ marginTop: '10px' }}>
            {renderCertifications(resumeData, { titleStyle: title, metaStyle: meta, linkStyle: link })}
          </div>
        </section>
      );
    }
    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ background: colors.white, padding: '0' }}>
          <div style={{ width: '100%', height: '120px', background: colors.subtleBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Photo resumeData={resumeData} size={110} radius={8} borderWidth={0} background={colors.subtleBg} textColor={colors.textPrimary} />
          </div>
        </div>

        <header style={{ background: colors.accent, color: accentText, padding: '18px 22px', minHeight: '120px' }}>
          <div style={{ fontSize: '28px', fontWeight: 950, letterSpacing: '0.2px', lineHeight: 1.05 }}>{getFullName(resumeData)}</div>
          <div style={{ marginTop: '10px' }}>
            <ContactStack resumeData={resumeData} color={accentText} mutedColor={accentText} fontSize={'10.2px'} />
          </div>
        </header>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '22px', marginTop: '16px' }}>
        <aside>
          <div style={{ fontSize: '13px', fontWeight: 900, color: colors.textPrimary, marginBottom: '12px' }}>Skills</div>
          {underlineSkillList() ?? <div style={{ fontSize: '10.8px', color: colors.textMuted }}>Add skills to see them here.</div>}
          <div style={{ marginTop: '18px' }}>
            {sideOrder.includes('skills') && hasSectionContent(resumeData, 'skills') &&
              renderSkillsInline(resumeData, { fontSize: '10.8px', lineHeight: 1.55, color: colors.textSecondary })}
          </div>
        </aside>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {mainOrder.map((k) => (
              <div key={k}>
                <div style={{ height: '1px', background: colors.divider, marginBottom: '14px' }} />
                {renderMain(k)}
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
