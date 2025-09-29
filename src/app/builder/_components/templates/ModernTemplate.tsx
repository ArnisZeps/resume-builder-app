import { ResumeData } from '../ResumeContext';

export function ModernTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '32px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1F2937', margin: '0 0 8px 0', lineHeight: '1.1' }}>
            {resumeData.personalInfo.firstName}
          </h1>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#6366F1', margin: '0 0 16px 0', lineHeight: '1.1' }}>
            {resumeData.personalInfo.lastName}
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#4B5563' }}>
            {resumeData.personalInfo.email && <span>✉ {resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#6366F1', marginTop: '12px' }}>
            {resumeData.personalInfo.website && <span>🌐 {resumeData.personalInfo.website}</span>}
            {resumeData.personalInfo.linkedin && <span>💼 {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span>💻 {resumeData.personalInfo.github}</span>}
          </div>
        </div>
        
        <div style={{ width: '4px', backgroundColor: '#6366F1', margin: '0 24px' }}></div>
      </div>

      {resumeData.personalInfo.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Professional Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            {resumeData.personalInfo.professionalSummary}
          </p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            (exp.jobTitle || exp.company) && (
              <div key={index} style={{ marginBottom: '24px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '0', top: '4px', width: '8px', height: '8px', backgroundColor: '#6366F1', borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                      {exp.jobTitle}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#6366F1', fontWeight: '600', margin: '4px 0' }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500', textAlign: 'right' }}>
                    {exp.startDate && (
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                        {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                      </span>
                    )}
                  </div>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(resp => resp.trim()) && (
                  <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
                    {exp.responsibilities.filter(resp => resp.trim()).map((responsibility, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '6px', paddingLeft: '12px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '0', color: '#6366F1' }}>▸</span>
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
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            (edu.degree || edu.institution) && (
              <div key={index} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '0', top: '4px', width: '8px', height: '8px', backgroundColor: '#6366F1', borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#6366F1', fontWeight: '600', margin: '4px 0' }}>
                      {edu.institution}{edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0' }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>
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
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {resumeData.skills.map((skillGroup, index) => (
              (skillGroup.category || skillGroup.items.some(item => item.trim())) && (
                <div key={index}>
                  {skillGroup.category && (
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', margin: '0 0 8px 0' }}>
                      {skillGroup.category}
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skillGroup.items.filter(item => item.trim()).map((skill, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: '#EEF2FF', 
                        color: '#6366F1', 
                        padding: '4px 12px', 
                        borderRadius: '16px', 
                        fontSize: '13px', 
                        fontWeight: '500' 
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.title || project.description) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Projects
          </h2>
          {resumeData.projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} style={{ marginBottom: '24px', position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '0', top: '4px', width: '8px', height: '8px', backgroundColor: '#6366F1', borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                      {project.title}
                    </h3>
                    {project.url && (
                      <p style={{ fontSize: '14px', color: '#6366F1', margin: '4px 0' }}>
                        {project.url}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500', textAlign: 'right' }}>
                    {project.startDate && (
                      <span>
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      </span>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '8px 0' }}>
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(tech => tech.trim()) && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.technologies.filter(tech => tech.trim()).map((tech, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: '#F3F4F6', 
                        color: '#6B7280', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '500' 
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

      {resumeData.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name || cert.issuer) && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {resumeData.certifications.map((cert, index) => (
              (cert.name || cert.issuer) && (
                <div key={index} style={{ border: '2px solid #EEF2FF', borderRadius: '12px', padding: '16px', backgroundColor: '#FAFBFF' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', margin: '0 0 4px 0' }}>
                    {cert.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6366F1', fontWeight: '600', margin: '0 0 8px 0' }}>
                    {cert.issuer}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>
                      {cert.date && new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    {cert.url && (
                      <span style={{ fontSize: '12px', color: '#6366F1', textDecoration: 'underline' }}>
                        View Credential
                      </span>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#6366F1', marginBottom: '8px' }}>Your Modern Resume Preview</h3>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Start filling out the form on the left to see your resume come to life!
          </p>
        </div>
      )}
    </>
  );
}
