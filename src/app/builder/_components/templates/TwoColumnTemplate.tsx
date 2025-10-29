import { ResumeData } from '../ResumeContext';

export function TwoColumnTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#1F2937', 
        padding: '24px',
        marginBottom: '20px',
        color: '#FFFFFF'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          margin: '0 0 8px 0',
          letterSpacing: '0.5px'
        }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ 
          fontSize: '11px', 
          color: '#D1D5DB',
          lineHeight: '1.6'
        }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span> • {resumeData.personalInfo.location}</span>}
        </div>
        
        {(resumeData.personalInfo.website || resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px' }}>
            {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && <span> • {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span> • {resumeData.personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Column - 60% */}
        <div style={{ flex: '0 0 60%' }}>
          {/* Professional Summary */}
          {resumeData.personalInfo.professionalSummary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Professional Summary
              </h2>
              <p style={{ 
                color: '#374151', 
                fontSize: '11px', 
                lineHeight: '1.6', 
                margin: 0
              }}>
                {resumeData.personalInfo.professionalSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Work Experience
              </h2>
              {resumeData.experience.map((exp, index) => (
                (exp.jobTitle || exp.company) && (
                  <div key={index} style={{ marginBottom: '14px' }}>
                    <h3 style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {exp.jobTitle}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <p style={{ fontSize: '11px', color: '#4B5563', margin: 0, fontWeight: '600' }}>
                        {exp.company}{exp.location && ` • ${exp.location}`}
                      </p>
                      {exp.startDate && (
                        <span style={{ fontSize: '10px', color: '#6B7280', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                          {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                        </span>
                      )}
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                      <ul style={{ margin: '4px 0 0 14px', padding: 0, listStyleType: 'disc' }}>
                        {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                          <li key={idx} style={{ 
                            fontSize: '10px', 
                            color: '#374151', 
                            lineHeight: '1.6', 
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

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Projects
              </h2>
              {resumeData.projects.map((project, index) => (
                (project.title || project.description) && (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: '2px 0' }}>
                        {project.description}
                      </p>
                    )}
                    {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                      <p style={{ fontSize: '9px', color: '#6B7280', margin: '2px 0 0 0', fontStyle: 'italic' }}>
                        <strong>Tech:</strong> {project.technologies.filter(tech => tech.trim()).join(', ')}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Right Column - 40% */}
        <div style={{ flex: '0 0 40%' }}>
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Education
              </h2>
              {resumeData.education.map((edu, index) => (
                (edu.degree || edu.institution) && (
                  <div key={index} style={{ marginBottom: '12px' }}>
                    <h3 style={{ 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#111827', 
                      margin: '0 0 2px 0' 
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '11px', color: '#4B5563', margin: '2px 0', fontWeight: '600' }}>
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0' }}>
                        {edu.location}
                      </p>
                    )}
                    {edu.graduationDate && (
                      <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0', fontStyle: 'italic' }}>
                        {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    {edu.gpa && (
                      <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0' }}>
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
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Skills
              </h2>
              {resumeData.skills.map((skillGroup, index) => (
                (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    {skillGroup.category && (
                      <h3 style={{ 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        color: '#111827',
                        margin: '0 0 4px 0'
                      }}>
                        {skillGroup.category}
                      </h3>
                    )}
                    <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5', margin: 0 }}>
                      {skillGroup.items.filter(item => item.trim()).join(', ')}
                    </p>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1F2937', 
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Certifications
              </h2>
              {resumeData.certifications.map((cert, index) => (
                (cert.name || cert.issuer) && (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px 0' }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '10px', color: '#4B5563', margin: '2px 0' }}>
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <p style={{ fontSize: '10px', color: '#6B7280', margin: '2px 0', fontStyle: 'italic' }}>
                        {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
            Two-Column Resume Template
          </h3>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '12px', lineHeight: '1.6' }}>
            Professional two-column layout with dark header.<br />
            Organized sidebar for skills and education.
          </p>
        </div>
      )}
    </>
  );
}
