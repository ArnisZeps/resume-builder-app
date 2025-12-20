import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function TwoColumnTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  const hasSummary = !!personalInfo.professionalSummary?.trim();
  const hasExperience = resumeData.experience?.some((exp) => exp.jobTitle || exp.company);
  const hasProjects = resumeData.projects?.some((p) => p.title || p.description);
  const hasEducation = resumeData.education?.some((edu) => edu.degree || edu.institution);
  const hasSkills = resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim()));
  const hasCerts = resumeData.certifications?.some((c) => c.name || c.issuer);

  return (
    <>
      <div style={{ borderBottom: `2px solid ${COLORS.textPrimary}`, paddingBottom: '14px', marginBottom: '16px' }}>
        <h1 style={{ ...BASE.headerName, fontSize: '30px', fontWeight: 800 }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '11px', color: COLORS.textMuted, marginTop: '6px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span style={{ color: COLORS.dot }}>•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span style={{ color: COLORS.dot }}>•</span>
              <span>{personalInfo.location}</span>
            </>
          )}
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '10px', color: COLORS.link, marginTop: '6px' }}>
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && (
              <>
                <span style={{ color: COLORS.dot }}>•</span>
                <span>{personalInfo.linkedin}</span>
              </>
            )}
            {personalInfo.github && (
              <>
                <span style={{ color: COLORS.dot }}>•</span>
                <span>{personalInfo.github}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '18px' }}>
        <div style={{ flex: '0 0 62%', minWidth: 0 }}>
          {hasSummary && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Summary</h2>
              <p style={{ ...BASE.bodyText, fontSize: '11px' }}>{personalInfo.professionalSummary}</p>
            </div>
          )}

          {hasExperience && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Experience</h2>
              {resumeData.experience
                ?.filter((exp) => exp.jobTitle || exp.company)
                .map((exp, index) => (
                  <div key={index} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={BASE.itemTitle}>{exp.jobTitle}</h3>
                      <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                    <p style={{ ...BASE.itemMeta, fontWeight: 600, color: COLORS.textSecondary, marginTop: '2px' }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
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

          {hasProjects && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Projects</h2>
              {resumeData.projects
                ?.filter((p) => p.title || p.description)
                .map((p, index) => (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={BASE.itemTitle}>{p.title}</h3>
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
          )}
        </div>

        <div style={{ flex: '0 0 38%', minWidth: 0 }}>
          {hasSkills && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Skills</h2>
              {resumeData.skills
                ?.filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    {g.category && <div style={{ fontSize: '11px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '2px' }}>{g.category}</div>}
                    <div style={{ ...BASE.bodyText, fontSize: '10px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          {hasEducation && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Education</h2>
              {resumeData.education
                ?.filter((edu) => edu.degree || edu.institution)
                .map((edu, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>{edu.degree}</h3>
                      <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                    </div>
                    <div style={{ ...BASE.itemMeta, fontSize: '10px', color: COLORS.textMuted }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}{edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {hasCerts && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={BASE.sectionTitle}>Certifications</h2>
              {resumeData.certifications
                ?.filter((c) => c.name || c.issuer)
                .map((c, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                      <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>{c.name}</h3>
                      <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                    </div>
                    <div style={{ ...BASE.itemMeta, fontSize: '10px', color: COLORS.textMuted }}>
                      {c.issuer}{c.url && ` • ${c.url}`}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
