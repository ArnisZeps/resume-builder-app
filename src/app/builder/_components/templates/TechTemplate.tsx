import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function TechTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  const hasSummary = !!personalInfo.professionalSummary?.trim();
  const hasExperience = resumeData.experience?.some((exp) => exp.jobTitle || exp.company);
  const hasProjects = resumeData.projects?.some((p) => p.title || p.description);
  const hasEducation = resumeData.education?.some((edu) => edu.degree || edu.institution);
  const hasSkills = resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim()));
  const hasCerts = resumeData.certifications?.some((c) => c.name || c.issuer);

  const sectionTitle: React.CSSProperties = {
    ...BASE.sectionTitle,
    borderBottom: 'none',
    paddingBottom: 0,
    marginBottom: '10px',
    letterSpacing: '1.1px',
  };

  return (
    <>
      <div style={{ padding: '14px 14px', marginBottom: '14px', backgroundColor: COLORS.subtleBg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'baseline' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ ...BASE.headerName, fontSize: '30px', fontWeight: 850, margin: 0 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '6px' }}>
              {[personalInfo.email, personalInfo.location].filter(Boolean).join(' • ')}
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '10px', color: COLORS.textMuted, lineHeight: '1.6' }}>
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
              <div style={{ color: COLORS.link }}>
                {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasSummary && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Summary</h2>
          <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {hasSkills && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Tech Stack</h2>
          <div style={{ backgroundColor: COLORS.subtleBg, padding: '10px 10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, index) => (
                  <div key={index}>
                    {g.category && <div style={{ fontSize: '11px', fontWeight: 850, color: COLORS.textPrimary, marginBottom: '3px' }}>{g.category}</div>}
                    <div style={{ ...BASE.bodyText, fontSize: '11px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {hasProjects && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={{ marginBottom: '12px', padding: '10px 10px', backgroundColor: COLORS.subtleBg }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'baseline' }}>
                  <h3 style={BASE.itemTitle}>{p.title}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(p.startDate, p.endDate, false)}</span>
                </div>
                {p.url && <div style={{ fontSize: '10px', color: COLORS.link, marginTop: '2px' }}>{p.url}</div>}
                {p.description && <p style={{ ...BASE.bodyText, fontSize: '11px', marginTop: '4px' }}>{p.description}</p>}
                {p.technologies?.some((t) => t.trim()) && (
                  <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '4px' }}>{p.technologies.filter((t) => t.trim()).join(', ')}</div>
                )}
              </div>
            ))}
        </div>
      )}

      {hasExperience && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={BASE.itemTitle}>{exp.jobTitle}</h3>
                    <p style={{ ...BASE.itemMeta, color: COLORS.textSecondary, fontWeight: 650, marginTop: '2px' }}>
                      {[exp.company, exp.location].filter(Boolean).join(' • ')}
                    </p>
                  </div>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                {exp.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                    {exp.responsibilities
                      .filter((r) => r.trim())
                      .map((r, idx) => (
                        <li key={idx} style={{ ...BASE.bodyText, fontSize: '11px', marginBottom: '3px' }}>
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {(hasEducation || hasCerts) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {hasEducation && (
            <div>
              <h2 style={sectionTitle}>Education</h2>
              {resumeData.education
                .filter((edu) => edu.degree || edu.institution)
                .map((edu, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{edu.degree}</h3>
                      <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                    </div>
                    <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>{[edu.institution, edu.location, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' • ')}</div>
                  </div>
                ))}
            </div>
          )}

          {hasCerts && (
            <div>
              <h2 style={sectionTitle}>Certifications</h2>
              {resumeData.certifications
                .filter((c) => c.name || c.issuer)
                .map((c, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{c.name}</h3>
                      <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                    </div>
                    <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>{[c.issuer, c.url].filter(Boolean).join(' • ')}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
