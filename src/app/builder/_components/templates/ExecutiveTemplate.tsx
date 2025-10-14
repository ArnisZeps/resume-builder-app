import { ResumeData } from '../ResumeContext';

export function ExecutiveTemplate({ resumeData }: { resumeData: ResumeData }) {
  // Dynamically generate professional title based on experience
  const generateProfessionalTitle = () => {
    if (!resumeData.experience || resumeData.experience.length === 0) {
      return '';
    }

    // Get the most recent position
    const mostRecentJob = resumeData.experience[0];
    if (mostRecentJob?.jobTitle) {
      // Clean up job title for professional presentation
      return mostRecentJob.jobTitle;
    }

    return '';
  };

  const professionalTitle = generateProfessionalTitle();

  return (
    <>
      {/* Header Section */}
      <div style={{ 
        borderBottom: '3px solid #1F2937', 
        paddingBottom: '24px', 
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: '#1F2937', 
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          {professionalTitle && (
            <div style={{ 
              fontSize: '16px', 
              color: '#374151',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginTop: '4px'
            }}>
              {professionalTitle}
            </div>
          )}
        </div>
        
        <div style={{ 
          textAlign: 'right',
          fontSize: '13px',
          color: '#374151',
          lineHeight: '1.6'
        }}>
          {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
          {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
          {resumeData.personalInfo.location && <div>{resumeData.personalInfo.location}</div>}
          {resumeData.personalInfo.linkedin && (
            <div style={{ color: '#1F2937', fontWeight: '500' }}>
              LinkedIn: {resumeData.personalInfo.linkedin}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Professional Summary
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '14px', 
            lineHeight: '1.7', 
            margin: 0,
            textAlign: 'justify'
          }}>
            {resumeData.professionalSummary}
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Professional Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: '700', 
                      color: '#1F2937', 
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase'
                    }}>
                      {exp.jobTitle}
                    </h3>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#374151', 
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>
                      {exp.company}
                      {exp.location && (
                        <span style={{ color: '#6B7280', fontWeight: '400' }}>
                          {' '} • {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6B7280', 
                    fontWeight: '500',
                    textAlign: 'right',
                    minWidth: '120px'
                  }}>
                    {exp.startDate && (
                      <div>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </div>
                    )}
                  </div>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '8px 0 0 0', 
                    padding: '0 0 0 20px',
                    listStyle: 'none'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '13px', 
                        color: '#374151', 
                        lineHeight: '1.6', 
                        marginBottom: '6px',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: '-16px', 
                          color: '#1F2937',
                          fontWeight: '700'
                        }}>
                          ▪
                        </span>
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
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ 
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#1F2937', 
                    margin: '0 0 4px 0'
                  }}>
                    {edu.degree}
                  </h3>
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#374151',
                    marginBottom: '2px'
                  }}>
                    {edu.institution}
                    {edu.location && (
                      <span style={{ color: '#6B7280' }}>
                        {' '} • {edu.location}
                      </span>
                    )}
                  </div>
                  {edu.gpa && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6B7280',
                      fontWeight: '500'
                    }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6B7280',
                  fontWeight: '500'
                }}>
                  {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Core Competencies */}
      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Core Competencies
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index}>
                  {skillGroup.category && (
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#1F2937', 
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {skillGroup.category}
                    </h3>
                  )}
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#374151', 
                    lineHeight: '1.5'
                  }}>
                    {skillGroup.items.filter(item => item.trim()).join(' • ')}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Key Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Key Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '6px'
                }}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#1F2937', 
                    margin: 0
                  }}>
                    {project.title}
                  </h3>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6B7280',
                    fontWeight: '500'
                  }}>
                    {project.startDate && (
                      <span>
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </span>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#374151', 
                    lineHeight: '1.6', 
                    margin: '6px 0'
                  }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6B7280',
                    fontStyle: 'italic'
                  }}>
                    <strong>Technologies:</strong> {project.technologies.filter(tech => tech.trim()).join(', ')}
                  </div>
                )}
                {project.url && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#1F2937',
                    fontWeight: '500',
                    marginTop: '4px'
                  }}>
                    {project.url}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Professional Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '2px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            Professional Certifications
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '12px' 
          }}>
            {resumeData.certifications.map((cert, index) => (
              (cert.name || cert.issuer) && (
                <div key={index} style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#1F2937', 
                      margin: '0 0 2px 0'
                    }}>
                      {cert.name}
                    </h3>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#374151',
                      fontWeight: '500'
                    }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#6B7280',
                    textAlign: 'right'
                  }}>
                    {cert.date && new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            color: '#1F2937', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Executive Professional Template
          </h3>
          <p style={{ color: '#6B7280', margin: 0 }}>
            A sophisticated template designed for senior executives and leadership positions
          </p>
        </div>
      )}
    </>
  );
}