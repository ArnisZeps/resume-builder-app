import { ResumeData } from '../ResumeContext';

export function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header with Creative Design */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          background: 'linear-gradient(180deg, #F59E0B 0%, #EF4444 100%)'
        }}></div>
        
        <div style={{ paddingLeft: '20px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            color: '#111827', 
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px'
          }}>
            {resumeData.personalInfo.firstName} <span style={{ color: '#F59E0B' }}>{resumeData.personalInfo.lastName}</span>
          </h1>
          
          <div style={{ 
            fontSize: '11px', 
            color: '#6B7280',
            lineHeight: '1.6',
            marginTop: '8px'
          }}>
            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span> | {resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span> | {resumeData.personalInfo.location}</span>}
          </div>
          
          {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
            <div style={{ fontSize: '11px', color: '#F59E0B', marginTop: '4px' }}>
              {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
              {resumeData.personalInfo.linkedin && <span> | {resumeData.personalInfo.linkedin}</span>}
              {resumeData.personalInfo.github && <span> | {resumeData.personalInfo.github}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '8px',
            letterSpacing: '0.5px'
          }}>
            About
          </h2>
          <p style={{ 
            color: '#374151', 
            fontSize: '12px', 
            lineHeight: '1.7', 
            margin: 0,
            borderLeft: '3px solid #FDE68A',
            paddingLeft: '12px'
          }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '16px', position: 'relative', paddingLeft: '18px' }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#F59E0B',
                  borderRadius: '50%'
                }}></div>
                
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
                    <span style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic' }}>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                      {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </span>
                  )}
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#EF4444', 
                  margin: '0 0 6px 0',
                  fontWeight: '600'
                }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ 
                    margin: '6px 0 0 14px', 
                    padding: 0,
                    listStyleType: 'none'
                  }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '11px', 
                        color: '#374151', 
                        lineHeight: '1.6', 
                        marginBottom: '3px',
                        paddingLeft: '12px',
                        position: 'relative'
                      }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: '0', 
                          color: '#F59E0B',
                          fontWeight: '700'
                        }}>→</span>
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
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
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
                      color: '#EF4444', 
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#6B7280', 
                        margin: '2px 0 0 0'
                      }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  {edu.graduationDate && (
                    <span style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic' }}>
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
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              skillGroup.items.filter(item => item.trim()).map((item, idx) => (
                <span key={`${index}-${idx}`} style={{ 
                  fontSize: '10px', 
                  color: '#374151',
                  backgroundColor: '#FEF3C7',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  border: '1px solid #FDE68A'
                }}>
                  {item}
                </span>
              ))
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>
                  {project.title}
                </h3>
                {project.description && (
                  <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6', margin: '4px 0' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                    {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '9px', 
                        color: '#EF4444',
                        backgroundColor: '#FEE2E2',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontWeight: '600'
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
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            color: '#F59E0B', 
            marginBottom: '10px',
            letterSpacing: '0.5px'
          }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '11px', color: '#EF4444', margin: 0, fontWeight: '600' }}>
                      {cert.issuer}
                    </p>
                  </div>
                  {cert.date && (
                    <span style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic' }}>
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
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#F59E0B', marginBottom: '8px' }}>
            Creative Resume Template
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>
            Bold and vibrant design with warm gradient accents.<br />
            Perfect for creative and design-focused roles.
          </p>
        </div>
      )}
    </>
  );
}
