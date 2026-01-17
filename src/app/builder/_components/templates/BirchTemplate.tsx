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

export function BirchTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, vars } = theme;

  // Inspired by the attached example: deep green sidebar with compact header block.
  const sidebarSections: readonly SectionKey[] = ['skills', 'certifications', 'education'];
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const sidebarBg = colors.accent;
  const sidebarText = getContrastTextColor(sidebarBg) === '#FFFFFF' ? 'rgba(255,255,255,0.92)' : 'rgba(17,24,39,0.92)';
  const sidebarMuted = getContrastTextColor(sidebarBg) === '#FFFFFF' ? 'rgba(255,255,255,0.62)' : 'rgba(17,24,39,0.62)';

  const title: CSSProperties = { fontSize: '13px', fontWeight: 900, letterSpacing: '0.8px', color: colors.textPrimary, margin: 0 };
  const h2: CSSProperties = { fontSize: '12px', fontWeight: 900, letterSpacing: '1.0px', textTransform: 'uppercase', color: colors.textPrimary, margin: 0 };
  const meta: CSSProperties = { fontSize: '10.6px', color: colors.textMuted, fontWeight: 650 };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.58, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.6px', color: colors.accent, wordBreak: 'break-word' };

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    const label = key === 'summary' ? 'Profile' : key[0].toUpperCase() + key.slice(1);

    if (key === 'summary') {
      return (
        <section>
          <div style={h2}>{label}</div>
          <div style={{ height: '2px', width: '42px', background: colors.accent, marginTop: '8px' }} />
          <div style={{ marginTop: '10px', ...body }}>{resumeData.personalInfo.professionalSummary}</div>
        </section>
      );
    }

    if (key === 'experience') {
      return (
        <section>
          <div style={h2}>Employment History</div>
          <div style={{ height: '2px', width: '42px', background: colors.accent, marginTop: '8px' }} />
          <div style={{ marginTop: '12px' }}>{renderExperience(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}</div>
        </section>
      );
    }

    if (key === 'education') {
      return (
        <section>
          <div style={h2}>Education</div>
          <div style={{ height: '2px', width: '42px', background: colors.accent, marginTop: '8px' }} />
          <div style={{ marginTop: '12px' }}>{renderEducation(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body })}</div>
        </section>
      );
    }

    if (key === 'projects') {
      return (
        <section>
          <div style={h2}>Projects</div>
          <div style={{ height: '2px', width: '42px', background: colors.accent, marginTop: '8px' }} />
          <div style={{ marginTop: '12px' }}>{renderProjects(resumeData, { titleStyle: title, metaStyle: meta, bodyStyle: body, linkStyle: link })}</div>
        </section>
      );
    }

    return null;
  };

  const renderSidebar = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;
    const head: CSSProperties = { fontSize: '11px', fontWeight: 900, letterSpacing: '1.1px', textTransform: 'uppercase', color: sidebarText, margin: 0 };
    const labelStyle: CSSProperties = { fontSize: '9.8px', fontWeight: 850, color: sidebarMuted, marginBottom: '4px' };
    const textStyle: CSSProperties = { fontSize: '10.4px', lineHeight: 1.55, color: sidebarText };
    const smallLink: CSSProperties = { fontSize: '10.4px', color: sidebarText };

    if (key === 'skills') {
      return (
        <section>
          <div style={head}>Skills</div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)', marginTop: '10px' }} />
          <div style={{ marginTop: '10px' }}>{renderSkillsInline(resumeData, textStyle, labelStyle)}</div>
        </section>
      );
    }

    if (key === 'certifications') {
      return (
        <section>
          <div style={head}>Certifications</div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)', marginTop: '10px' }} />
          <div style={{ marginTop: '10px' }}>
            {renderCertifications(resumeData, {
              titleStyle: { fontSize: '10.8px', fontWeight: 850, color: sidebarText },
              metaStyle: { fontSize: '10px', color: sidebarMuted },
              linkStyle: smallLink,
            })}
          </div>
        </section>
      );
    }

    if (key === 'education') {
      return (
        <section>
          <div style={head}>Education</div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.18)', marginTop: '10px' }} />
          <div style={{ marginTop: '10px' }}>
            {renderEducation(resumeData, {
              titleStyle: { fontSize: '10.8px', fontWeight: 850, color: sidebarText },
              metaStyle: { fontSize: '10px', color: sidebarMuted },
              bodyStyle: { fontSize: '10.2px', lineHeight: 1.45, color: sidebarText },
            })}
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '18px' }}>
        <aside style={{ background: sidebarBg, borderRadius: '12px', padding: '18px 16px', color: sidebarText }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ marginBottom: '12px' }}>
              <Photo resumeData={resumeData} size={56} radius={999} borderWidth={0} background={'rgba(255,255,255,0.16)'} textColor={sidebarText} />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.2px' }}>{getFullName(resumeData)}</div>
            <div style={{ fontSize: '9.8px', color: sidebarMuted, marginTop: '4px' }}>{resumeData.personalInfo.location}</div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <ContactStack resumeData={resumeData} color={sidebarText} mutedColor={sidebarMuted} fontSize={'10.2px'} />
          </div>

          <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {sideOrder.map((k) => (
              <div key={k}>{renderSidebar(k)}</div>
            ))}
          </div>
        </aside>

        <main style={{ paddingTop: '4px' }}>
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
