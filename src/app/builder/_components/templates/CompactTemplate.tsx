import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function CompactTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  return (
    <>
      <div style={{ borderBottom: `1px solid ${COLORS.divider}`, paddingBottom: '10px', marginBottom: '12px' }}>
        <h1 style={{ ...BASE.headerName, fontSize: '26px', fontWeight: 800 }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div style={{ fontSize: '10px', color: COLORS.textMuted, lineHeight: '1.5', marginTop: '4px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          {personalInfo.location && <span> • {personalInfo.location}</span>}
          {personalInfo.website && <span> • {personalInfo.website}</span>}
          {personalInfo.linkedin && <span> • {personalInfo.linkedin}</span>}
          {personalInfo.github && <span> • {personalInfo.github}</span>}
        </div>
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Summary</h2>
          <p style={{ ...BASE.bodyText, fontSize: '10px' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                  <h3 style={{ ...BASE.itemTitle, fontSize: '11px' }}>
                    {exp.jobTitle}{exp.company && ` • ${exp.company}`}
                  </h3>
                  <span style={{ fontSize: '9px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.location && <div style={{ fontSize: '9px', color: COLORS.textMuted, marginTop: '2px' }}>{exp.location}</div>}
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

      {resumeData.education?.some((edu) => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Education</h2>
          {resumeData.education
            .filter((edu) => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
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

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Skills</h2>
          {resumeData.skills
            .filter((g) => g.category || g.items?.some((i) => i.trim()))
            .map((g, index) => (
              <div key={index} style={{ marginBottom: '6px' }}>
                {g.category && <div style={{ fontSize: '10px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '2px' }}>{g.category}</div>}
                <div style={{ ...BASE.bodyText, fontSize: '10px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
              </div>
            ))}
        </div>
      )}

      {resumeData.projects?.some((p) => p.title || p.description) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Projects</h2>
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

      {resumeData.certifications?.some((c) => c.name || c.issuer) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...BASE.sectionTitle, fontSize: '12px', marginBottom: '8px' }}>Certifications</h2>
          {resumeData.certifications
            .filter((c) => c.name || c.issuer)
            .map((c, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
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
    </>
  );
}
