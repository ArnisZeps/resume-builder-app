import { ResumeData } from '../ResumeContext';

export function TechTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header with Tech Style */}
      <div style={{ 
        borderLeft: '4px solid #10B981',
        paddingLeft: '16px',
        marginBottom: '24px',
        backgroundColor: '#F0FDF4',
        padding: '16px',
        borderRadius: '4px'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#065F46', 
          margin: '0 0 6px 0',
          letterSpacing: '0.3px',
          fontFamily: 'monospace'
        }}>
          {'<'}{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}{'/>'}
        </h1>
        
        <div style={{ 
          fontSize: '11px', 
          color: '#047857',
          lineHeight: '1.6',
          fontFamily: 'monospace'
        }}>
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span> {'// '}{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span> {'// '}📍 {resumeData.personalInfo.location}</span>}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div style={{ fontSize: '10px', color: '#059669', marginTop: '4px', fontFamily: 'monospace' }}>
            {resumeData.personalInfo.website && <span>🌐 {resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && <span> {'// '}💼 {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span> {'// '}⚡ {resumeData.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '8px',
            fontFamily: 'monospace'
          }}>
            {'// PROFILE'}
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: '1.7', 
            margin: 0,
            paddingLeft: '12px',
            borderLeft: '2px solid #D1FAE5'
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {'// EXPERIENCE'}
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '16px', paddingLeft: '12px', borderLeft: '2px solid #D1FAE5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: 0,
                    fontFamily: 'monospace'
                  }}>
                    {exp.jobTitle}
                  </h3>
                  {exp.startDate && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'monospace' }}>
                      [{new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}]
                    </span>
                  )}
                </div>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#10B981', 
                  margin: '0 0 6px 0',
                  fontWeight: '600',
                  fontFamily: 'monospace'
                }}>
                  @ {exp.company}{exp.location && ` | ${exp.location}`}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '6px 0 0 14px', 
                    padding: 0,
                    listStyleType: 'none'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '10px', 
                        color: '#374151', 
                        lineHeight: '1.6', 
                        marginBottom: '3px',
                        paddingLeft: '14px',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: '0', 
                          color: '#10B981',
                          fontWeight: '700',
                          fontFamily: 'monospace'
                        }}>$</span>
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

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {'// TECH_STACK'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index} style={{ paddingLeft: '12px', borderLeft: '2px solid #D1FAE5' }}>
                  {skillGroup.category && (
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: '700', 
                      color: '#10B981',
                      fontFamily: 'monospace',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      const {skillGroup.category.toLowerCase().replace(/\s+/g, '_')} = [
                    </span>
                  )}
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    paddingLeft: skillGroup.category ? '16px' : '0'
                  }}>
                    {skillGroup.items.filter(item => item.trim()).map((item, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '10px', 
                        color: '#047857',
                        backgroundColor: '#D1FAE5',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontWeight: '600',
                        fontFamily: 'monospace',
                        border: '1px solid #A7F3D0'
                      }}>
                        &apos;{item}&apos;
                      </span>
                    ))}
                  </div>
                  {skillGroup.category && (
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: '700', 
                      color: '#10B981',
                      fontFamily: 'monospace',
                      display: 'block',
                      marginTop: '4px'
                    }}>
                      ];
                    </span>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {'// PROJECTS'}
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: '2px solid #D1FAE5' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', fontFamily: 'monospace' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: '4px 0' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                    {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '9px', 
                        color: '#047857',
                        backgroundColor: '#ECFDF5',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontWeight: '600',
                        fontFamily: 'monospace',
                        border: '1px solid #D1FAE5'
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

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {'// EDUCATION'}
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: '2px solid #D1FAE5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0',
                      fontFamily: 'monospace'
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      fontSize: '11px', 
                      color: '#10B981', 
                      margin: 0,
                      fontWeight: '600',
                      fontFamily: 'monospace'
                    }}>
                      @ {edu.institution}{edu.location && ` | ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        fontSize: '10px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0',
                        fontFamily: 'monospace'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'monospace' }}>
                      [{new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}]
                    </span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            color: '#065F46', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            {'// CERTIFICATIONS'}
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: '2px solid #D1FAE5' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0', fontFamily: 'monospace' }}>
                  {cert.name}
                </h3>
                <p style={{ fontSize: '10px', color: '#10B981', margin: 0, fontWeight: '600', fontFamily: 'monospace' }}>
                  @ {cert.issuer}
                </p>
                {cert.date && (
                  <p style={{ fontSize: '9px', color: '#6B7280', margin: '2px 0 0 0', fontFamily: 'monospace' }}>
                    [{new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}]
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
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#10B981', marginBottom: '8px', fontFamily: 'monospace' }}>
            {'<Tech Resume/>'}
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '12px', lineHeight: '1.6' }}>
            Developer-focused design with monospace fonts and code-style elements.<br />
            Perfect for software engineers and tech professionals.
          </p>
        </div>
      )}
    </>
  );
}
