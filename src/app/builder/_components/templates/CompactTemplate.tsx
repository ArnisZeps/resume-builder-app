import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function CompactTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  const hasSummary = !!personalInfo.professionalSummary?.trim();
  const hasExperience = resumeData.experience?.some((exp) => exp.jobTitle || exp.company);
  const hasProjects = resumeData.projects?.some((p) => p.title || p.description);
  const hasEducation = resumeData.education?.some((edu) => edu.degree || edu.institution);
  const hasSkills = resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim()));
  const hasCerts = resumeData.certifications?.some((c) => c.name || c.issuer);

  const compactTitle: React.CSSProperties = {
    ...BASE.sectionTitle,
    fontSize: '11px',
    letterSpacing: '0.9px',
    marginBottom: '6px',
    paddingBottom: '4px',
  };

  const twoUp: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  };

  return (
    <>
      <div style={{ backgroundColor: COLORS.subtleBg, padding: '12px 14px', marginBottom: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'baseline' }}>
          <h1 style={{ ...BASE.headerName, fontSize: '26px', fontWeight: 850, margin: 0 }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
            {[personalInfo.location, personalInfo.phone].filter(Boolean).join(' • ')}
          </div>
        </div>

        <div style={{ fontSize: '10px', color: COLORS.textMuted, lineHeight: '1.5', marginTop: '6px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <span style={{ color: COLORS.link }}>
              {' '}
              • {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
            </span>
          )}
        </div>
      </div>

      {hasSummary && (
        <div style={{ marginBottom: '10px' }}>
          <h2 style={compactTitle}>Summary</h2>
          <p style={{ ...BASE.bodyText, fontSize: '10px' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {(hasSkills || hasEducation || hasCerts) && (
        <div style={{ ...twoUp, marginBottom: '10px' }}>
          {hasSkills && (
            <div>
              <h2 style={compactTitle}>Skills</h2>
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, index) => (
                  <div key={index} style={{ marginBottom: '6px' }}>
                    {g.category && <div style={{ fontSize: '10px', fontWeight: 800, color: COLORS.textPrimary }}>{g.category}</div>}
                    <div style={{ ...BASE.bodyText, fontSize: '10px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          {(hasEducation || hasCerts) && (
            <div>
              {hasEducation && (
                <div style={{ marginBottom: hasCerts ? '10px' : 0 }}>
                  <h2 style={compactTitle}>Education</h2>
                  {resumeData.education
                    .filter((edu) => edu.degree || edu.institution)
                    .map((edu, index) => (
                      <div key={index} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' }}>
                          <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>{edu.degree}</h3>
                          <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                        </div>
                        <div style={{ ...BASE.itemMeta, fontSize: '10px', color: COLORS.textMuted }}>
                          {[edu.institution, edu.location, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' • ')}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {hasCerts && (
                <div>
                  <h2 style={compactTitle}>Certifications</h2>
                  {resumeData.certifications
                    .filter((c) => c.name || c.issuer)
                    .map((c, index) => (
                      <div key={index} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                          <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>{c.name}</h3>
                          <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                        </div>
                        <div style={{ ...BASE.itemMeta, fontSize: '10px', color: COLORS.textMuted }}>{[c.issuer, c.url].filter(Boolean).join(' • ')}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {hasExperience && (
        <div style={{ marginBottom: '10px' }}>
          <h2 style={compactTitle}>Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                  <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>
                    {exp.jobTitle}{exp.company && ` — ${exp.company}`}
                  </h3>
                  <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                {(exp.location || exp.company) && (
                  <div style={{ fontSize: '9px', color: COLORS.textMuted, marginTop: '2px' }}>{[exp.location].filter(Boolean).join('')}</div>
                )}
                {exp.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyleType: 'disc' }}>
                    {exp.responsibilities
                      .filter((r) => r.trim())
                      .map((r, idx) => (
                        <li key={idx} style={{ ...BASE.bodyText, fontSize: '10px', marginBottom: '2px' }}>
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {hasProjects && (
        <div style={{ marginBottom: '10px' }}>
          <h2 style={compactTitle}>Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                  <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>{p.title}</h3>
                  <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(p.startDate, p.endDate, false)}</span>
                </div>
                {p.url && <div style={{ fontSize: '9px', color: COLORS.link, marginTop: '2px' }}>{p.url}</div>}
                {p.description && <p style={{ ...BASE.bodyText, fontSize: '10px', marginTop: '3px' }}>{p.description}</p>}
              </div>
            ))}
        </div>
      )}
    </>
  );
}
