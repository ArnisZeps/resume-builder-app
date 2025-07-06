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
