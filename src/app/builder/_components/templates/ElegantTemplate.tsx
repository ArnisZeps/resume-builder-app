import { ResumeData } from '../ResumeContext';

export function ElegantTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header with Elegant Styling */}
      <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #E5E7EB' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '300', 
          color: '#1F2937', 
          margin: '0 0 4px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          fontSize: '11px', 
          color: '#6B7280',
          letterSpacing: '0.5px',
          marginTop: '10px'
        }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span> | {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span> | {resumeData.personalInfo.location}</span>}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '6px', letterSpacing: '0.3px' }}>
            {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && <span> | {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span> | {resumeData.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '26px', textAlign: 'center' }}>
          <p style={{ 
            color: '#4B5563', 
            fontSize: '12px', 
            lineHeight: '1.8', 
            margin: '0 auto',
            maxWidth: '90%',
            fontStyle: 'italic'
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
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
            Professional Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '18px' }}>
                <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                  <h3 style={{ 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    color: '#111827', 
                    margin: '0 0 2px 0',
                    letterSpacing: '0.5px'
                  }}>
                    {exp.jobTitle}
                  </h3>
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#6B7280', 
                    margin: '0',
                    fontStyle: 'italic'
                  }}>
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </p>
                  {exp.startDate && (
                    <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present'}
                    </p>
                  )}
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '8px 0 0 0', 
                    padding: '0 20px',
                    listStyleType: 'none',
                    textAlign: 'left'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '11px', 
                        color: '#374151', 
                        lineHeight: '1.7', 
                        marginBottom: '4px',
                        paddingLeft: '16px',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: '0',
                          color: '#D1D5DB'
                        }}>•</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
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
