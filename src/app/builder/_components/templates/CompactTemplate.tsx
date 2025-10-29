import { ResumeData } from '../ResumeContext';

export function CompactTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header - Ultra Compact */}
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#111827', 
          margin: '0 0 6px 0',
          letterSpacing: '0.3px'
        }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          fontSize: '10px', 
          color: '#4B5563',
          lineHeight: '1.5'
        }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span> • {resumeData.personalInfo.location}</span>}
          {resumeData.personalInfo.website && <span> • {resumeData.personalInfo.website}</span>}
          {resumeData.personalInfo.linkedin && <span> • {resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span> • {resumeData.personalInfo.github}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Summary
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '10px', 
            lineHeight: '1.6', 
            margin: 0
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    color: '#111827', 
                    margin: 0 
                  }}>
                    {exp.jobTitle} • {exp.company}
                  </h3>
                  {exp.startDate && (
                    <span style={{ fontSize: '9px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </span>
                  )}
                </div>
                {exp.location && (
                  <p style={{ fontSize: '9px', color: '#6B7280', margin: '0 0 4px 0', fontStyle: 'italic' }}>
                    {exp.location}
                  </p>
                )}
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '4px 0 0 14px', 
                    padding: 0,
                    listStyleType: 'disc'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '10px', 
                        color: '#374151', 
                        lineHeight: '1.5', 
                        marginBottom: '2px'
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
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: 0 
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ 
                      fontSize: '10px', 
                      color: '#4B5563', 
                      margin: '2px 0'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: '9px', color: '#6B7280', margin: '2px 0 0 0' }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ fontSize: '9px', color: '#6B7280', whiteSpace: 'nowrap' }}>
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
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index} style={{ fontSize: '10px', color: '#374151' }}>
                  {skillGroup.category && <strong>{skillGroup.category}: </strong>}
                  {skillGroup.items.filter(item => item.trim()).join(', ')}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {project.title}
                  </h3>
                  {project.startDate && (
                    <span style={{ fontSize: '9px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                      {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5', margin: '2px 0' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ fontSize: '9px', color: '#6B7280', margin: '2px 0 0 0', fontStyle: 'italic' }}>
                    {project.technologies.filter(tech => tech.trim()).join(', ')}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#111827', 
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '10px', color: '#4B5563', margin: '2px 0' }}>
                      {cert.issuer}
                    </p>
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: '9px', color: '#6B7280', whiteSpace: 'nowrap' }}>
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
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
            Compact Resume Template
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '12px', lineHeight: '1.6' }}>
            Space-efficient design that fits more content on each page.<br />
            Perfect for experienced professionals with extensive backgrounds.
          </p>
        </div>
      )}
    </>
  );
}
