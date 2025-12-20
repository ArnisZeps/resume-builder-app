import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function ExecutiveTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;
  const professionalTitle = resumeData.experience?.[0]?.jobTitle?.trim() || '';

  return (
    <>
      <div style={{ borderBottom: `2px solid ${COLORS.textPrimary}`, paddingBottom: '16px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '18px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...BASE.headerName, fontSize: '34px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {professionalTitle && (
              <div style={{ fontSize: '12px', fontWeight: 700, color: COLORS.textSecondary, marginTop: '2px' }}>{professionalTitle}</div>
            )}
          </div>

          <div style={{ textAlign: 'right', fontSize: '11px', color: COLORS.textMuted, lineHeight: '1.6', flexShrink: 0 }}>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ color: COLORS.link }}>{personalInfo.linkedin}</div>}
          </div>
        </div>

        {(personalInfo.website || personalInfo.github) && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', fontSize: '10px', color: COLORS.link, marginTop: '8px' }}>
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.github && (
              <>
                <span style={{ color: COLORS.dot }}>•</span>
                <span>{personalInfo.github}</span>
              </>
            )}
          </div>
        )}
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Executive Summary</h2>
          <p style={{ ...BASE.bodyText, fontSize: '12px' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Professional Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={{ ...BASE.itemTitle, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{exp.jobTitle}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap', fontWeight: 600 }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p style={{ ...BASE.itemMeta, fontWeight: 700, color: COLORS.textSecondary, marginTop: '2px' }}>
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

      {resumeData.education?.some((edu) => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Education</h2>
          {resumeData.education
            .filter((edu) => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={BASE.itemTitle}>{edu.degree}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                </div>
                <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>
                  {edu.institution}{edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
        </div>
      )}

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Core Skills</h2>
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

      {resumeData.projects?.some((p) => p.title || p.description) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Selected Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
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

      {resumeData.certifications?.some((c) => c.name || c.issuer) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={BASE.sectionTitle}>Certifications</h2>
          {resumeData.certifications
            .filter((c) => c.name || c.issuer)
            .map((c, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={BASE.itemTitle}>{c.name}</h3>
                  <span style={{ fontSize: '10px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                </div>
                <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary }}>
                  {c.issuer}
                  {c.url && ` • ${c.url}`}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
