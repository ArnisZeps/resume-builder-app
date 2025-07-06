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

      {resumeData.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Professional Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            {resumeData.professionalSummary}
          </p>
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
