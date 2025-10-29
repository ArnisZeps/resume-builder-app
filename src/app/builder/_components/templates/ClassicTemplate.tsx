import { ResumeData } from '../ResumeContext';

export function ClassicTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header Section */}
      <div style={{ borderBottom: '3px solid #1F2937', paddingBottom: '20px', marginBottom: '28px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#1F2937', 
          margin: '0 0 8px 0',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px', 
          fontSize: '13px', 
          color: '#4B5563',
          alignItems: 'center'
        }}>
          {resumeData.personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {resumeData.personalInfo.email}
            </span>
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
            fontSize: '12px', 
            color: '#2563EB',
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Professional Summary
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '13px', 
            lineHeight: '1.7', 
            margin: 0,
            textAlign: 'justify'
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '6px'
          }}>
            Work Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '18px' }}>
                <div style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ 
                      fontSize: '14px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: 0 
                    }}>
                      {exp.jobTitle}
                    </h3>
                    {exp.startDate && (
                      <span style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#4B5563', 
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '6px 0 0 18px', 
                    padding: 0,
                    listStyleType: 'disc'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '12px', 
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '6px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '14px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#4B5563', 
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        fontSize: '12px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0',
                        fontStyle: 'italic'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '6px'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  {skillGroup.category && (
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#111827',
                      minWidth: '120px',
                      flexShrink: 0
                    }}>
                      {skillGroup.category}:
                    </span>
                  )}
                  <span style={{ 
                    fontSize: '12px', 
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '6px'
          }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: 0 
                  }}>
                    {project.title}
                  </h3>
                  {project.startDate && (
                    <span style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>
                      {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    </span>
                  )}
                </div>
                {project.url && (
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#2563EB', 
                    margin: '2px 0 4px 0'
                  }}>
                    {project.url}
                  </p>
                )}
                {project.description && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#374151', 
                    lineHeight: '1.6', 
                    margin: '4px 0'
                  }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ 
                    fontSize: '11px', 
                    color: '#6B7280', 
                    margin: '4px 0 0 0',
                    fontStyle: 'italic'
                  }}>
                    <strong>Technologies:</strong> {project.technologies.filter(tech => tech.trim()).join(' • ')}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '6px'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {cert.name}
                    </h3>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#4B5563', 
                      margin: 0 
                    }}>
                      {cert.issuer}
                    </p>
                    {cert.url && (
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#2563EB', 
                        margin: '2px 0 0 0' 
                      }}>
                        {cert.url}
                      </p>
                    )}
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>
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
            color: '#1F2937', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Classic Resume Template
          </h3>
          <p style={{ 
            color: '#6B7280', 
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            A timeless, professional design with clear sections and<br />traditional formatting perfect for any industry.
          </p>
        </div>
      )}
    </>
  );
}
