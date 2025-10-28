import { ResumeData } from '../ResumeContext';

export function ClassicTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px 0' }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '14px', color: '#2563EB' }}>
          {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
        </div>
      </div>

      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Professional Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Work Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {exp.jobTitle}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#374151', margin: '2px 0' }}>
                      {exp.company}{exp.location && `, ${exp.location}`}
                    </p>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'right' }}>
                    {exp.startDate && (
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </span>
                    )}
                  </div>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5', marginBottom: '4px' }}>
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

      {resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#374151', margin: '2px 0' }}>
                      {edu.institution}{edu.location && `, ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: '13px', color: '#6B7280', margin: '2px 0' }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Skills
          </h2>
          {resumeData.skills.map((skillGroup, index) => (
            (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                {skillGroup.category && (
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                    {skillGroup.category}:
                  </h3>
                )}
                <p style={{ fontSize: '14px', color: '#374151', margin: 0, lineHeight: '1.5' }}>
                  {skillGroup.items.filter(item => item.trim()).join(', ')}
                </p>
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {project.title}
                    </h3>
                    {project.url && (
                      <p style={{ fontSize: '13px', color: '#2563EB', margin: '2px 0' }}>
                        {project.url}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'right' }}>
                    {project.startDate && (
                      <span>
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </span>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5', margin: '4px 0' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0' }}>
                    Technologies: {project.technologies.filter(tech => tech.trim()).join(', ')}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#374151', margin: '2px 0' }}>
                      {cert.issuer}
                    </p>
                    {cert.url && (
                      <p style={{ fontSize: '13px', color: '#2563EB', margin: '2px 0' }}>
                        {cert.url}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {cert.date && new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Your Resume Preview</h3>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Start filling out the form on the left to see your resume come to life!
          </p>
        </div>
      )}
    </>
  );
}
