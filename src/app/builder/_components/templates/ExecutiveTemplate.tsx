import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function ExecutiveTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;
  const professionalTitle = resumeData.experience?.[0]?.jobTitle?.trim() || '';

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
      <div
        style={{
          backgroundColor: COLORS.headerBgDark,
          color: COLORS.white,
          padding: '16px 16px',
          borderRadius: '0px',
          marginBottom: '14px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '14px', alignItems: 'end' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ ...BASE.headerName, fontSize: '30px', fontWeight: 800, margin: 0, color: COLORS.white, letterSpacing: '0.6px' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {professionalTitle && (
              <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: 700, color: COLORS.white, opacity: 0.92 }}>{professionalTitle}</div>
            )}
          </div>

          <div style={{ textAlign: 'right', fontSize: '10px', lineHeight: '1.6', color: COLORS.white, opacity: 0.92 }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div style={{ marginTop: '10px', fontSize: '10px', color: COLORS.white, opacity: 0.92 }}>
            {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
          </div>
        )}
      </div>

      {hasSummary && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Executive Summary</h2>
          <div style={{ borderLeft: `3px solid ${COLORS.textPrimary}`, paddingLeft: '10px' }}>
            <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
          </div>
        </div>
      )}

      {hasSkills && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Core Competencies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {resumeData.skills
              .filter((g) => g.category || g.items?.some((i) => i.trim()))
              .map((g, index) => (
                <div key={index} style={{ padding: '10px 10px', backgroundColor: COLORS.subtleBg }}>
                  {g.category && <div style={{ fontSize: '11px', fontWeight: 800, color: COLORS.textPrimary, marginBottom: '4px' }}>{g.category}</div>}
                  <div style={{ ...BASE.bodyText, fontSize: '11px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {hasExperience && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Leadership Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ ...BASE.itemTitle, fontSize: '12px', fontWeight: 800 }}>{exp.jobTitle}</h3>
                    <div style={{ ...BASE.itemMeta, fontWeight: 700, color: COLORS.textSecondary, marginTop: '2px' }}>
                      {[exp.company, exp.location].filter(Boolean).join(' • ')}
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap', fontWeight: 700 }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
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

      {(hasProjects || hasEducation || hasCerts) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            {hasProjects && (
              <div style={{ marginBottom: '14px' }}>
                <h2 style={sectionTitle}>Selected Work</h2>
                {resumeData.projects
                  .filter((p) => p.title || p.description)
                  .map((p, index) => (
                    <div key={index} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                        <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{p.title}</h3>
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
          </div>

          <div>
            {hasEducation && (
              <div style={{ marginBottom: '14px' }}>
                <h2 style={sectionTitle}>Education</h2>
                {resumeData.education
                  .filter((edu) => edu.degree || edu.institution)
                  .map((edu, index) => (
                    <div key={index} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                        <h3 style={BASE.itemTitle}>{edu.degree}</h3>
                        <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                      </div>
                      <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>
                        {[edu.institution, edu.location, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' • ')}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {hasCerts && (
              <div style={{ marginBottom: '14px' }}>
                <h2 style={sectionTitle}>Certifications</h2>
                {resumeData.certifications
                  .filter((c) => c.name || c.issuer)
                  .map((c, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                        <h3 style={BASE.itemTitle}>{c.name}</h3>
                        <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                      </div>
                      <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>{[c.issuer, c.url].filter(Boolean).join(' • ')}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
