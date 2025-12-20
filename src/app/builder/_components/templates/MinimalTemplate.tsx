import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function MinimalTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  const hasSummary = !!personalInfo.professionalSummary?.trim();
  const hasExperience = resumeData.experience?.some((exp) => exp.jobTitle || exp.company);
  const hasProjects = resumeData.projects?.some((p) => p.title || p.description);
  const hasEducation = resumeData.education?.some((edu) => edu.degree || edu.institution);
  const hasSkills = resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim()));
  const hasCerts = resumeData.certifications?.some((c) => c.name || c.issuer);

  const sectionRow: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '96px 1fr',
    columnGap: '14px',
    alignItems: 'start',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 800,
    letterSpacing: '1.0px',
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    paddingTop: '2px',
  };

  const divider: React.CSSProperties = {
    height: '1px',
    backgroundColor: COLORS.divider,
    margin: '14px 0',
  };

  return (
    <>
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{ ...BASE.headerName, fontSize: '34px', fontWeight: 650, letterSpacing: '0.2px', margin: 0 }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>Resume</div>
        </div>

        <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px', lineHeight: '1.5' }}>
          <span>{[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' • ')}</span>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div style={{ marginTop: '4px', color: COLORS.link }}>
              {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' • ')}
            </div>
          )}
        </div>

        <div style={divider} />
      </div>

      {hasSummary && (
        <div style={{ ...sectionRow, marginBottom: '14px' }}>
          <div style={labelStyle}>Summary</div>
          <div>
            <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
          </div>
        </div>
      )}

      {hasExperience && (
        <div style={{ ...sectionRow, marginBottom: '14px' }}>
          <div style={labelStyle}>Experience</div>
          <div>
            {resumeData.experience
              .filter((exp) => exp.jobTitle || exp.company)
              .map((exp, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                    <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{exp.jobTitle}</h3>
                    <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary, marginTop: '2px' }}>
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
              ))}
          </div>
        </div>
      )}

      {hasProjects && (
        <div style={{ ...sectionRow, marginBottom: '14px' }}>
          <div style={labelStyle}>Projects</div>
          <div>
            {resumeData.projects
              .filter((p) => p.title || p.description)
              .map((p, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                    <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{p.title}</h3>
                    <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
                      {formatDateRange(p.startDate, p.endDate, false)}
                    </span>
                  </div>
                  {p.url && <div style={{ fontSize: '10px', color: COLORS.link, marginTop: '2px' }}>{p.url}</div>}
                  {p.description && <p style={{ ...BASE.bodyText, fontSize: '11px', marginTop: '4px' }}>{p.description}</p>}
                  {p.technologies?.some((t) => t.trim()) && (
                    <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '4px' }}>
                      {p.technologies.filter((t) => t.trim()).join(', ')}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {(hasSkills || hasEducation || hasCerts) && <div style={divider} />}

      {hasSkills && (
        <div style={{ ...sectionRow, marginBottom: '12px' }}>
          <div style={labelStyle}>Skills</div>
          <div>
            {resumeData.skills
              .filter((g) => g.category || g.items?.some((i) => i.trim()))
              .map((g, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  {g.category && <div style={{ fontSize: '11px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '2px' }}>{g.category}</div>}
                  <div style={{ ...BASE.bodyText, fontSize: '11px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {hasEducation && (
        <div style={{ ...sectionRow, marginBottom: '12px' }}>
          <div style={labelStyle}>Education</div>
          <div>
            {resumeData.education
              .filter((edu) => edu.degree || edu.institution)
              .map((edu, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                    <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{edu.degree}</h3>
                    <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                  </div>
                  <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>
                    {[edu.institution, edu.location, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' • ')}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {hasCerts && (
        <div style={{ ...sectionRow, marginBottom: '12px' }}>
          <div style={labelStyle}>Certs</div>
          <div>
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
        </div>
      )}
    </>
  );
}
