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

      {resumeData.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366F1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Professional Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            {resumeData.professionalSummary}
          </p>
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
