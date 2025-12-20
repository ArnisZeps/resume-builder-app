import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  const sectionWrap: React.CSSProperties = {
    marginBottom: '16px',
    paddingLeft: '10px',
    borderLeft: `2px solid ${COLORS.divider}`,
  };

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px' }}>
          <h1 style={{ ...BASE.headerName, fontSize: '30px', fontWeight: 800 }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div style={{ fontSize: '10px', color: COLORS.textMuted, textAlign: 'right', lineHeight: '1.5' }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '11px', color: COLORS.textMuted, marginTop: '6px' }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span style={{ color: COLORS.link }}>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span style={{ color: COLORS.link }}>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span style={{ color: COLORS.link }}>{personalInfo.github}</span>}
        </div>

        <div style={{ height: '1px', backgroundColor: COLORS.divider, marginTop: '10px' }} />
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ ...sectionWrap, borderLeftColor: COLORS.textPrimary }}>
          <h2 style={BASE.sectionTitle}>Summary</h2>
          <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={sectionWrap}>
          <h2 style={BASE.sectionTitle}>Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={BASE.itemTitle}>{exp.jobTitle}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p style={{ ...BASE.itemMeta, color: COLORS.textSecondary, fontWeight: 600, marginTop: '2px' }}>
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

      {resumeData.projects?.some((p) => p.title || p.description) && (
        <div style={sectionWrap}>
          <h2 style={BASE.sectionTitle}>Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
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

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={sectionWrap}>
          <h2 style={BASE.sectionTitle}>Skills</h2>
          {resumeData.skills
            .filter((g) => g.category || g.items?.some((i) => i.trim()))
            .map((g, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {g.category && <div style={{ fontSize: '11px', fontWeight: 700, color: COLORS.textPrimary, marginBottom: '2px' }}>{g.category}</div>}
                <div style={{ ...BASE.bodyText, fontSize: '11px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
              </div>
            ))}
        </div>
      )}

      {resumeData.education?.some((edu) => edu.degree || edu.institution) && (
        <div style={sectionWrap}>
          <h2 style={BASE.sectionTitle}>Education</h2>
          {resumeData.education
            .filter((edu) => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{edu.degree}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                </div>
                <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>{edu.institution}{edu.location && ` • ${edu.location}`}{edu.gpa && ` • GPA: ${edu.gpa}`}</div>
              </div>
            ))}
        </div>
      )}

      {resumeData.certifications?.some((c) => c.name || c.issuer) && (
        <div style={sectionWrap}>
          <h2 style={BASE.sectionTitle}>Certifications</h2>
          {resumeData.certifications
            .filter((c) => c.name || c.issuer)
            .map((c, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={{ ...BASE.itemTitle, fontSize: '12px' }}>{c.name}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                </div>
                <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>{c.issuer}{c.url && ` • ${c.url}`}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
