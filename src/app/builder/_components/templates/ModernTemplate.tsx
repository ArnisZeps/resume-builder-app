import { ResumeData } from '../ResumeContext';

export function ModernTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header Section with Side Border Accent */}
      <div style={{ 
        borderLeft: '4px solid #667EEA',
        paddingLeft: '20px',
        marginBottom: '24px'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1F2937', 
          margin: '0 0 2px 0',
          letterSpacing: '0.5px'
        }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px', 
          fontSize: '12px', 
          color: '#4B5563',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span>{resumeData.personalInfo.phone}</span>
            </>
          )}
          {resumeData.personalInfo.location && (
            <>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span>{resumeData.personalInfo.location}</span>
            </>
          )}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px', 
            fontSize: '11px', 
            color: '#667EEA',
            marginTop: '6px'
          }}>
            {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && (
              <>
                <span style={{ color: '#D1D5DB' }}>•</span>
                <span>{resumeData.personalInfo.linkedin}</span>
              </>
            )}
            {resumeData.personalInfo.github && (
              <>
                <span style={{ color: '#D1D5DB' }}>•</span>
                <span>{resumeData.personalInfo.github}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Professional Summary
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
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Work Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: 0 
                  }}>
                    {exp.jobTitle}
                  </h3>
                  {exp.startDate && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic' }}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </span>
                  )}
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#667EEA', 
                  margin: '0 0 6px 0',
                  fontWeight: '600'
                }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '6px 0 0 16px', 
                    padding: 0,
                    listStyleType: 'disc',
                    listStylePosition: 'outside'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '11px', 
                        color: '#374151', 
                        lineHeight: '1.6', 
                        marginBottom: '3px'
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
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#667EEA', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0',
                        fontStyle: 'italic'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic' }}>
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
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  {skillGroup.category && (
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      color: '#667EEA',
                      minWidth: '110px',
                      flexShrink: 0
                    }}>
                      {skillGroup.category}:
                    </span>
                  )}
                  <span style={{ 
                    fontSize: '11px', 
                    color: '#374151', 
                    lineHeight: '1.5',
                    flex: 1
                  }}>
                    {skillGroup.items.filter(item => item.trim()).join(' • ')}
                  </span>
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
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: 0 
                  }}>
                    {project.title}
                  </h3>
                  {project.startDate && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic' }}>
                      {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    </span>
                  )}
                </div>
                {project.url && (
                  <p style={{ 
                    fontSize: '10px', 
                    color: '#667EEA', 
                    margin: '2px 0 4px 0'
                  }}>
                    {project.url}
                  </p>
                )}
                {project.description && (
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#374151', 
                    lineHeight: '1.6', 
                    margin: '4px 0'
                  }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ 
                    fontSize: '10px', 
                    color: '#6B7280', 
                    margin: '4px 0 0 0',
                    fontStyle: 'italic'
                  }}>
                    <strong style={{ color: '#667EEA' }}>Technologies:</strong> {project.technologies.filter(tech => tech.trim()).join(' • ')}
                  </p>
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
            fontSize: '15px', 
            fontWeight: '700', 
            color: '#667EEA', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #667EEA',
            paddingBottom: '4px'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {cert.name}
                    </h3>
                    <p style={{ 
                      fontSize: '11px', 
                      color: '#667EEA', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {cert.issuer}
                    </p>
                    {cert.url && (
                      <p style={{ 
                        fontSize: '10px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0' 
                      }}>
                        {cert.url}
                      </p>
                    )}
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic' }}>
                      {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Empty State */}
      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#667EEA', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Modern Resume Template
          </h3>
          <p style={{ 
            color: '#6B7280', 
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            Clean, contemporary design with accent color highlighting<br />
            and optimized spacing for professional presentation.
          </p>
        </div>
      )}
    </>
  );
}
