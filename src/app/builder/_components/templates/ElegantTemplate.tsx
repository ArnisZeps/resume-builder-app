import { ResumeData } from '../ResumeContext';
import { formatDateRange, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function ElegantTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);
  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 180) : '';

  const headerDivider = {
    textAlign: 'center',
    borderBottom: `${line.hairline}px solid ${colors.accent}`,
    paddingBottom: '14px',
    marginBottom: '18px',
  } as const;

  const sectionTitle = {
    ...base.sectionTitle,
    textAlign: 'center',
    letterSpacing: '2px',
    fontWeight: 400,
    borderBottom: `${line.hairline}px solid ${colors.divider}`,
    paddingBottom: '8px',
    marginBottom: '14px',
  } as const;

  const itemTitle = {
    ...base.itemTitle,
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.5px',
  } as const;

  return (
    <>
      <div style={headerDivider}>
        {photoUrl && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Profile photo"
              style={{ width: '76px', height: '76px', borderRadius: '8px', objectFit: 'cover', border: `${line.hairline}px solid ${colors.divider}` }}
            />
          </div>
        )}

        <h1
          style={{
            ...base.headerName,
            fontSize: '34px',
            fontWeight: 600,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
            color: colors.textPrimary,
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <div style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, letterSpacing: '0.3px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          {personalInfo.location && <span> • {personalInfo.location}</span>}
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div style={{ fontSize: base.itemMeta.fontSize, color: colors.accent, marginTop: '6px' }}>
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span> • {personalInfo.linkedin}</span>}
            {personalInfo.github && <span> • {personalInfo.github}</span>}
          </div>
        )}
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <p style={{ ...base.bodyText, maxWidth: '92%', margin: '0 auto' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ ...sectionTitle, letterSpacing: '1.6px', fontWeight: 600, borderBottom: `${line.hairline}px solid ${colors.accent}` }}>
            Experience
          </h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={base.itemTitle}>{exp.jobTitle}</div>
                  <div style={{ ...base.itemMeta, color: colors.textSecondary, marginTop: '2px' }}>
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </div>
                  <div style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, marginTop: '2px' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>

                {exp.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '8px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
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

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '26px' }}>
          <h2 style={sectionTitle}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '14px', textAlign: 'center' }}>
                <h3 style={itemTitle}>
                  {edu.degree}
                </h3>
                <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '2px 0', fontStyle: 'italic' }}>
                  {edu.institution}{edu.location && ` • ${edu.location}`}
                </p>
                {edu.graduationDate && (
                  <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '4px 0 0 0' }}>
                    {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                {edu.gpa && (
                  <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '2px 0 0 0' }}>
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '26px' }}>
          <h2 style={sectionTitle}>
            Skills & Expertise
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index}>
                  {skillGroup.category && (
                    <h3 style={{ ...base.itemMeta, fontWeight: 600, color: colors.textMuted, margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
                      {skillGroup.category}
                    </h3>
                  )}
                  <p style={{ ...base.bodyText, margin: 0, textAlign: 'center' }}>
                    {skillGroup.items.filter(item => item.trim()).join(' • ')}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '26px' }}>
          <h2 style={sectionTitle}>
            Notable Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '16px', textAlign: 'center' }}>
                <h3 style={{ ...base.itemTitle, fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ ...base.bodyText, margin: '4px 0', fontStyle: 'italic', textAlign: 'center' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '6px 0 0 0' }}>
                    {project.technologies.filter(tech => tech.trim()).join(' • ')}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '26px' }}>
          <h2 style={sectionTitle}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px', textAlign: 'center' }}>
                <h3 style={{ ...base.itemTitle, fontSize: '11px', fontWeight: 600, margin: '0 0 2px 0', letterSpacing: '0.5px' }}>
                  {cert.name}
                </h3>
                <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '2px 0', fontStyle: 'italic' }}>
                  {cert.issuer}
                </p>
                {cert.date && (
                  <p style={{ ...base.itemMeta, color: colors.textMuted, margin: '2px 0 0 0' }}>
                    {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Empty State */}
      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 300, color: colors.textPrimary, marginBottom: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Elegant Resume
          </h3>
          <p style={{ ...base.bodyText, color: colors.textMuted, margin: 0, fontStyle: 'italic' }}>
            Refined and sophisticated design with centered layout.<br />
            Perfect for executive and senior-level positions.
          </p>
        </div>
      )}
    </>
  );
}
