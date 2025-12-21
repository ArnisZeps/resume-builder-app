import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
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
    letterSpacing: '1.2px',
  };

  const timelineRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '12px',
    alignItems: 'start',
    marginBottom: '14px',
  };

  const dateCol: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    color: COLORS.textMuted,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    paddingTop: '2px',
  };

  const timelineCard: React.CSSProperties = {
    borderLeft: `2px solid ${COLORS.divider}`,
    paddingLeft: '12px',
    position: 'relative',
  };

  const dot: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    backgroundColor: COLORS.textPrimary,
    position: 'absolute',
    left: '-5px',
    top: '6px',
  };

  return (
    <>
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'baseline' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ ...BASE.headerName, fontSize: '30px', fontWeight: 850, margin: 0 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {professionalTitle && <div style={{ fontSize: '12px', fontWeight: 700, color: COLORS.textSecondary, marginTop: '4px' }}>{professionalTitle}</div>}
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', color: COLORS.textMuted, lineHeight: '1.6' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div style={{ marginTop: '8px', fontSize: '10px', color: COLORS.link }}>
            {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
          </div>
        )}

        <div style={{ height: '1px', backgroundColor: COLORS.divider, marginTop: '12px' }} />
      </div>

      {hasSummary && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Summary</h2>
          <div style={{ backgroundColor: COLORS.subtleBg, padding: '10px 10px' }}>
            <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
          </div>
        </div>
      )}

      {hasExperience && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={timelineRow}>
                <div style={dateCol}>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                <div style={timelineCard}>
                  <div style={dot} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                    <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{exp.jobTitle}</h3>
                  </div>
                  <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary, fontWeight: 650, marginTop: '2px' }}>
                    {[exp.company, exp.location].filter(Boolean).join(' • ')}
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
              </div>
            ))}
        </div>
      )}

      {hasProjects && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionTitle}>Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={timelineRow}>
                <div style={dateCol}>{formatDateRange(p.startDate, p.endDate, false)}</div>
                <div style={timelineCard}>
                  <div style={{ ...dot, backgroundColor: COLORS.dot }} />
                  <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{p.title}</h3>
                  {p.url && <div style={{ fontSize: '10px', color: COLORS.link, marginTop: '2px' }}>{p.url}</div>}
                  {p.description && <p style={{ ...BASE.bodyText, fontSize: '11px', marginTop: '4px' }}>{p.description}</p>}
                  {p.technologies?.some((t) => t.trim()) && (
                    <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '4px' }}>{p.technologies.filter((t) => t.trim()).join(', ')}</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {(hasSkills || hasEducation || hasCerts) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {hasSkills && (
            <div>
              <h2 style={sectionTitle}>Skills</h2>
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    {g.category && <div style={{ fontSize: '11px', fontWeight: 800, color: COLORS.textPrimary, marginBottom: '2px' }}>{g.category}</div>}
                    <div style={{ ...BASE.bodyText, fontSize: '11px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          <div>
            {hasEducation && (
              <div style={{ marginBottom: hasCerts ? '14px' : 0 }}>
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
        </div>
      )}
    </>
  );
}
