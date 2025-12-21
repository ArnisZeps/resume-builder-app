import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function ClassicTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);
  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';

  return (
    <>
      <div style={{ borderBottom: `${line.normal}px solid ${colors.accent}`, paddingBottom: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt="Profile photo"
              style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover' }}
            />
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 800 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textMuted, marginTop: '6px' }}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
            </div>

            {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.accent, marginTop: '6px' }}>
                {personalInfo.website && <span>{personalInfo.website}</span>}
                {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                {personalInfo.github && <span>• {personalInfo.github}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Professional Summary</h2>
          <p style={base.bodyText}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Work Experience</h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={base.itemTitle}>{exp.jobTitle}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>

                <p style={{ ...base.itemMeta, fontWeight: 600, color: colors.textSecondary, marginTop: '2px' }}>
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>

                {exp.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                    {exp.responsibilities
                      .filter((r) => r.trim())
                      .map((r, idx) => (
                        <li key={idx} style={{ ...base.bodyText, marginBottom: '3px' }}>
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
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Projects</h2>
          {resumeData.projects
            .filter((p) => p.title || p.description)
            .map((p, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={base.itemTitle}>{p.title}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(p.startDate, p.endDate, false)}</span>
                </div>
                {p.url && <div style={{ fontSize: base.itemMeta.fontSize, color: colors.accent, marginTop: '2px' }}>{p.url}</div>}
                {p.description && <p style={{ ...base.bodyText, marginTop: '4px' }}>{p.description}</p>}
                {p.technologies?.some((t) => t.trim()) && (
                  <div style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, marginTop: '4px' }}>{p.technologies.filter((t) => t.trim()).join(', ')}</div>
                )}
              </div>
            ))}
        </div>
      )}

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Skills</h2>
          {resumeData.skills
            .filter((g) => g.category || g.items?.some((i) => i.trim()))
            .map((g, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 700, color: colors.textPrimary, minWidth: '120px' }}>{g.category}</div>}
                <div style={{ ...base.bodyText, flex: 1 }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
              </div>
            ))}
        </div>
      )}

      {resumeData.education?.some((edu) => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Education</h2>
          {resumeData.education
            .filter((edu) => edu.degree || edu.institution)
            .map((edu, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={base.itemTitle}>{edu.degree}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(edu.graduationDate)}</span>
                </div>
                <p style={{ ...base.itemMeta, fontWeight: 600, color: colors.textSecondary, marginTop: '2px' }}>
                  {edu.institution}
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
        </div>
      )}

      {resumeData.certifications?.some((c) => c.name || c.issuer) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>Certifications</h2>
          {resumeData.certifications
            .filter((c) => c.name || c.issuer)
            .map((c, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                  <h3 style={base.itemTitle}>{c.name}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                </div>
                <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{c.issuer}{c.url && ` • ${c.url}`}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
