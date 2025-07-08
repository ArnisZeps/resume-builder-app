import { ResumeData } from '../ResumeContext';

export function MinimalTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '300', color: '#111827', margin: '0 0 12px 0', letterSpacing: '-0.025em' }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '14px', color: '#6B7280' }}>
          {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
        </div>
        
        <div style={{ width: '100%', height: '1px', backgroundColor: '#E5E7EB', marginTop: '24px' }}></div>
      </div>

      {resumeData.professionalSummary && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: '1.6', margin: 0, fontWeight: '300' }}>
            {resumeData.professionalSummary}
          </p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '400', color: '#111827', margin: 0 }}>
                    {exp.jobTitle}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '300' }}>
                    {exp.startDate && (
                      <>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </>
                    )}
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 12px 0', fontWeight: '300' }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '8px', paddingLeft: '12px', position: 'relative', fontWeight: '300' }}>
                        <span style={{ position: 'absolute', left: '0', color: '#9CA3AF' }}>—</span>
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
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '400', color: '#111827', margin: 0 }}>
                    {edu.degree}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '300' }}>
                    {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '15px', color: '#6B7280', margin: 0, fontWeight: '300' }}>
                  {edu.institution}{edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.category || skill.items.some(item => item.trim())) && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Skills
          </h2>
          {resumeData.skills.map((skillGroup, index) => (
            (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
              <div key={index} style={{ marginBottom: '16px' }}>
                {skillGroup.category && (
                  <h3 style={{ fontSize: '15px', fontWeight: '400', color: '#111827', margin: '0 0 6px 0' }}>
                    {skillGroup.category}
                  </h3>
                )}
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, lineHeight: '1.5', fontWeight: '300' }}>
                  {skillGroup.items.filter(item => item.trim()).join(' • ')}
                </p>
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '400', color: '#111827', margin: 0 }}>
                    {project.title}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '300' }}>
                    {project.startDate && (
                      <>
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </>
                    )}
                  </span>
                </div>
                {project.url && (
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 8px 0', fontWeight: '300' }}>
                    {project.url}
                  </p>
                )}
                {project.description && (
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '8px 0', fontWeight: '300' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: '8px 0 0 0', fontWeight: '300' }}>
                    {project.technologies.filter(tech => tech.trim()).join(' • ')}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Certifications
          </h2>
          {resumeData.certifications.map((cert, index) => (
            (cert.name || cert.issuer) && (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '400', color: '#111827', margin: 0 }}>
                    {cert.name}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '300' }}>
                    {cert.date && new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, fontWeight: '300' }}>
                  {cert.issuer}
                  {cert.url && (
                    <span style={{ color: '#9CA3AF' }}> • {cert.url}</span>
                  )}
                </p>
              </div>
            )
          ))}
        </div>
      )}

      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '300', color: '#111827', marginBottom: '8px' }}>Your Minimal Resume Preview</h3>
          <p style={{ color: '#6B7280', margin: 0, fontWeight: '300' }}>
            Start filling out the form on the left to see your resume come to life!
          </p>
        </div>
      )}
    </>
  );
}
