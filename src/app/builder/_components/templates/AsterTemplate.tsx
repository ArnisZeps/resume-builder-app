import type { CSSProperties } from 'react';

import type { ResumeData, SectionKey } from '../ResumeContext';
import { getSectionOrder, getFullName, Photo, ContactStack, hasSectionContent, renderCertifications, renderEducation, renderExperience, renderProjects, renderSkillsInline } from './templateHelpers';
import { getContrastTextColor, getTemplateTheme, joinParts, type ResumeStyleSettings } from './templateKit';

export function AsterTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const theme = getTemplateTheme(styleSettings);
  const { colors, line, vars } = theme;

  // Inspired by the attached example: full-width accent header + dark left sidebar.
  const sidebarSections: readonly SectionKey[] = ['skills', 'certifications'];
  const sidebarSet = new Set<SectionKey>(sidebarSections);
  const order = getSectionOrder(resumeData);
  const mainOrder = order.filter((k) => !sidebarSet.has(k));
  const sideOrder = order.filter((k) => sidebarSet.has(k));

  const accentText = getContrastTextColor(colors.accent);
  const sidebarBg = colors.headerBgDark;

  const sectionTitle: CSSProperties = {
    fontSize: '13px',
    fontWeight: 800,
    letterSpacing: '1.0px',
    textTransform: 'uppercase',
    margin: 0,
    color: colors.textPrimary,
  };

  const sectionTitleRow: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const sectionLine: CSSProperties = {
    height: `${line.hairline}px`,
    background: colors.divider,
    opacity: 0.95,
  };

  const itemTitle: CSSProperties = { fontSize: '12.2px', fontWeight: 800, color: colors.textPrimary };
  const itemMeta: CSSProperties = { fontSize: '10.6px', fontWeight: 650, color: colors.textMuted };
  const body: CSSProperties = { fontSize: '11px', lineHeight: 1.55, color: colors.textSecondary };
  const link: CSSProperties = { fontSize: '10.8px', color: colors.accent, wordBreak: 'break-word' };

  const renderMain = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    const title = key === 'summary' ? 'Objective' : key[0].toUpperCase() + key.slice(1);
    const titleNode = (
      <div style={sectionTitleRow}>
        <div style={sectionTitle}>{title}</div>
        <div style={sectionLine} />
      </div>
    );

    switch (key) {
      case 'summary':
        return (
          <section>
            {titleNode}
            <div style={body}>{resumeData.personalInfo.professionalSummary}</div>
          </section>
        );
      case 'experience':
        return (
          <section>
            {titleNode}
            {renderExperience(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}
          </section>
        );
      case 'education':
        return (
          <section>
            {titleNode}
            {renderEducation(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, dividerColor: colors.divider })}
          </section>
        );
      case 'projects':
        return (
          <section>
            {titleNode}
            {renderProjects(resumeData, { titleStyle: itemTitle, metaStyle: itemMeta, bodyStyle: body, linkStyle: link, dividerColor: colors.divider })}
          </section>
        );
      default:
        return null;
    }
  };

  const renderSidebar = (key: SectionKey) => {
    if (!hasSectionContent(resumeData, key)) return null;

    const titleStyle: CSSProperties = {
      fontSize: '12px',
      fontWeight: 900,
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.92)',
      margin: 0,
    };

    const divider: CSSProperties = {
      height: `${line.hairline}px`,
      background: 'rgba(255,255,255,0.18)',
      margin: '12px 0 0 0',
    };

    const labelStyle: CSSProperties = { fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.75)', marginBottom: '4px' };
    const textStyle: CSSProperties = { fontSize: '10.6px', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' };

    if (key === 'skills') {
      return (
        <section>
          <div style={titleStyle}>Skills</div>
          <div style={divider} />
          <div style={{ marginTop: '10px' }}>{renderSkillsInline(resumeData, textStyle, labelStyle)}</div>
        </section>
      );
    }

    if (key === 'certifications') {
      return (
        <section>
          <div style={titleStyle}>Certifications</div>
          <div style={divider} />
          <div style={{ marginTop: '10px' }}>
            {renderCertifications(resumeData, {
              titleStyle: { fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.92)' },
              metaStyle: { fontSize: '10px', color: 'rgba(255,255,255,0.72)' },
              linkStyle: { fontSize: '10px', color: 'rgba(255,255,255,0.86)' },
            })}
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ ...vars, fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
        <header
          style={{
            background: colors.accent,
            color: accentText,
            padding: '22px 26px',
            paddingRight: '150px',
            minHeight: '110px',
          }}
        >
          <div style={{ fontSize: '34px', fontWeight: 900, letterSpacing: '0.6px', lineHeight: 1.05 }}>
            {getFullName(resumeData).toUpperCase()}
          </div>
          <div style={{ marginTop: '10px', fontSize: '11px', opacity: 0.9 }}>
            {joinParts([resumeData.personalInfo.location], ' • ')}
          </div>
        </header>

        <div style={{ position: 'absolute', right: '26px', top: '18px' }}>
          <Photo
            resumeData={resumeData}
            size={112}
            radius={999}
            borderWidth={6}
            borderColor={'rgba(255,255,255,0.95)'}
            background={'rgba(255,255,255,0.22)'}
            textColor={accentText}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
          <aside style={{ background: sidebarBg, color: '#fff', padding: '22px 18px' }}>
            <div style={{ marginBottom: '18px' }}>
              <ContactStack resumeData={resumeData} color={'rgba(255,255,255,0.92)'} mutedColor={'rgba(255,255,255,0.55)'} fontSize={'10.6px'} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {sideOrder.map((k) => (
                <div key={k}>{renderSidebar(k)}</div>
              ))}
            </div>
          </aside>

          <main style={{ background: '#fff', padding: '22px 26px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {mainOrder.map((k) => (
                <div key={k}>{renderMain(k)}</div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
