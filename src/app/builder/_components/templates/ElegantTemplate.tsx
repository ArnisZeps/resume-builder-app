import { ResumeData } from '../ResumeContext';
import { BASE, COLORS, formatDateRange, formatMonthYear } from './templateKit';

export function ElegantTemplate({ resumeData }: { resumeData: ResumeData }) {
  const { personalInfo } = resumeData;

  return (
    <>
      <div style={{ textAlign: 'center', borderBottom: `1px solid ${COLORS.divider}`, paddingBottom: '14px', marginBottom: '18px' }}>
        <h1
          style={{
            ...BASE.headerName,
            fontSize: '34px',
            fontWeight: 600,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        <div style={{ fontSize: '11px', color: COLORS.textMuted, letterSpacing: '0.3px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          {personalInfo.location && <span> • {personalInfo.location}</span>}
        </div>

        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div style={{ fontSize: '10px', color: COLORS.link, marginTop: '6px' }}>
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span> • {personalInfo.linkedin}</span>}
            {personalInfo.github && <span> • {personalInfo.github}</span>}
          </div>
        )}
      </div>

      {personalInfo.professionalSummary && personalInfo.professionalSummary.trim() && (
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <p style={{ ...BASE.bodyText, fontSize: '12px', maxWidth: '92%', margin: '0 auto' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((exp) => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ ...BASE.sectionTitle, textAlign: 'center', letterSpacing: '1.6px', fontWeight: 600 }}>
            Experience
          </h2>
          {resumeData.experience
            .filter((exp) => exp.jobTitle || exp.company)
            .map((exp, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...BASE.itemTitle, fontSize: '12px' }}>{exp.jobTitle}</div>
                  <div style={{ ...BASE.itemMeta, color: COLORS.textSecondary, marginTop: '2px' }}>
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </div>
                  <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '2px' }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>

                {exp.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '8px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
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

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '26px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '300', 
            color: '#1F2937', 
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '8px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '14px', textAlign: 'center' }}>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  margin: '0 0 2px 0',
                  letterSpacing: '0.5px'
                }}>
                  {edu.degree}
                </h3>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#6B7280', 
                  margin: '2px 0',
                  fontStyle: 'italic'
                }}>
                  {edu.institution}{edu.location && ` • ${edu.location}`}
                </p>
                {edu.graduationDate && (
                  <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
                    {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
                {edu.gpa && (
                  <p style={{ 
                    fontSize: '10px', 
                    color: '#9CA3AF', 
                    margin: '2px 0 0 0'
                  }}>
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
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '300', 
            color: '#1F2937', 
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '8px'
          }}>
            Skills & Expertise
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index}>
                  {skillGroup.category && (
                    <h3 style={{ 
                      fontSize: '11px', 
                      fontWeight: '600', 
                      color: '#6B7280',
                      margin: '0 0 4px 0',
                      letterSpacing: '0.5px'
                    }}>
                      {skillGroup.category}
                    </h3>
                  )}
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#374151', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
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
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '300', 
            color: '#1F2937', 
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '8px'
          }}>
            Notable Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '16px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ fontSize: '11px', color: '#4B5563', lineHeight: '1.7', margin: '4px 0', fontStyle: 'italic' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '6px 0 0 0' }}>
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
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '300', 
            color: '#1F2937', 
            marginBottom: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '8px'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0', letterSpacing: '0.5px' }}>
                  {cert.name}
                </h3>
                <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0', fontStyle: 'italic' }}>
                  {cert.issuer}
                </p>
                {cert.date && (
                  <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '2px 0 0 0' }}>
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
          <h3 style={{ fontSize: '24px', fontWeight: '300', color: '#1F2937', marginBottom: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Elegant Resume
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '12px', lineHeight: '1.8', fontStyle: 'italic' }}>
            Refined and sophisticated design with centered layout.<br />
            Perfect for executive and senior-level positions.
          </p>
        </div>
      )}
    </>
  );
}
