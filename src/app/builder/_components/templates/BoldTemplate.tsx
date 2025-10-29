import { ResumeData } from '../ResumeContext';

export function BoldTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Bold Header */}
      <div style={{ 
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '28px 24px',
        marginBottom: '24px'
      }}>
        <h1 style={{ 
          fontSize: '34px', 
          fontWeight: '900', 
          margin: '0 0 6px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          {resumeData.personalInfo.firstName}<br/>{resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          fontSize: '12px', 
          color: '#D1D5DB',
          lineHeight: '1.6',
          marginTop: '12px'
        }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span> • {resumeData.personalInfo.location}</span>}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
            {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && <span> • {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span> • {resumeData.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '24px', backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '4px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Profile
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '12px', 
            lineHeight: '1.7', 
            margin: 0
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paddingBottom: '6px',
            borderBottom: '3px solid #111827'
          }}>
            Work Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ 
                    fontSize: '13px', 
                    fontWeight: '800', 
                    color: '#111827', 
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {exp.jobTitle}
                  </h3>
                  {exp.startDate && (
                    <div style={{ 
                      fontSize: '10px', 
                      color: '#FFFFFF',
                      backgroundColor: '#111827',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontWeight: '700'
                    }}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'NOW' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'NOW'}
                    </div>
                  )}
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#4B5563', 
                  margin: '0 0 8px 0',
                  fontWeight: '700'
                }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '6px 0 0 16px', 
                    padding: 0,
                    listStyleType: 'square'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '11px', 
                        color: '#374151', 
                        lineHeight: '1.6', 
                        marginBottom: '4px',
                        fontWeight: '500'
                      }}>
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
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paddingBottom: '6px',
            borderBottom: '3px solid #111827'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '800', 
                      color: '#111827', 
                      margin: '0 0 2px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#4B5563', 
                      margin: 0,
                      fontWeight: '700'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0',
                        fontWeight: '600'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ 
                      fontSize: '10px', 
                      color: '#FFFFFF',
                      backgroundColor: '#111827',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontWeight: '700'
                    }}>
                      {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paddingBottom: '6px',
            borderBottom: '3px solid #111827'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index}>
                  {skillGroup.category && (
                    <h3 style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      color: '#111827',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {skillGroup.category}
                    </h3>
                  )}
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {skillGroup.items.filter(item => item.trim()).map((item, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '10px', 
                        color: '#FFFFFF',
                        backgroundColor: '#374151',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        fontWeight: '700'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paddingBottom: '6px',
            borderBottom: '3px solid #111827'
          }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: '#111827', 
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6', margin: '4px 0', fontWeight: '500' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                    {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '9px', 
                        color: '#6B7280',
                        backgroundColor: '#F3F4F6',
                        padding: '3px 8px',
                        borderRadius: '2px',
                        fontWeight: '700',
                        textTransform: 'uppercase'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '900', 
            color: '#111827', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paddingBottom: '6px',
            borderBottom: '3px solid #111827'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <h3 style={{ 
                  fontSize: '12px', 
                  fontWeight: '800', 
                  color: '#111827', 
                  margin: '0 0 2px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {cert.name}
                </h3>
                <p style={{ fontSize: '11px', color: '#4B5563', margin: 0, fontWeight: '700' }}>
                  {cert.issuer}
                </p>
                {cert.date && (
                  <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0 0 0', fontWeight: '600' }}>
                    {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Empty State */}
      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Bold Resume
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '12px', lineHeight: '1.6', fontWeight: '500' }}>
            Strong, impactful design with bold typography.<br />
            Perfect for making a powerful first impression.
          </p>
        </div>
      )}
    </>
  );
}
