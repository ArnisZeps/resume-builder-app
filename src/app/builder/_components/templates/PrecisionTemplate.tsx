import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function PrecisionTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const sectionTitle = {
    ...base.sectionTitle,
    borderBottom: `${line.hairline}px solid ${colors.divider}`,
  } as const;

  return (
    <>
      <div style={{ borderBottom: `${line.thick}px solid ${colors.textPrimary}`, paddingBottom: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: colors.subtleBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
            }}
          >
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ fontSize: '18px', fontWeight: 800, color: colors.textMuted }}>{initials || ' '}</div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>

            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textMuted }}>
              {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).map((v, idx) => (
                <span key={idx}>{v}</span>
              ))}
            </div>

            {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
              <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.accent }}>
                {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).map((v, idx) => (
                  <span key={idx}>{v}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {personalInfo.professionalSummary?.trim() && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionTitle}>Summary</h2>
          <p style={base.bodyText}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionTitle}>Experience</h2>
          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                  <h3 style={base.itemTitle}>{e.jobTitle}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <div style={{ ...base.itemMeta, color: colors.textSecondary, fontWeight: 650, marginTop: '2px' }}>
                  {[e.company, e.location].filter(Boolean).join(' • ')}
                </div>
                {e.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                    {e.responsibilities
                      .filter((r) => r.trim())
                      .map((r, idx) => (
                        <li key={idx} style={{ ...base.bodyText, marginBottom: '3px' }}>
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionTitle}>Skills</h2>
          {resumeData.skills
            .filter((g) => g.category || g.items?.some((i) => i.trim()))
            .map((g, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                {g.category && <div style={{ minWidth: '120px', fontSize: base.itemMeta.fontSize, fontWeight: 800, color: colors.textPrimary }}>{g.category}</div>}
                <div style={{ ...base.bodyText, flex: 1 }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
              </div>
            ))}
        </div>
      )}

      {(resumeData.education?.some((e) => e.degree || e.institution) || resumeData.certifications?.some((c) => c.name || c.issuer)) && (
        <div>
          {resumeData.education?.some((e) => e.degree || e.institution) && (
            <div style={{ marginBottom: resumeData.certifications?.some((c) => c.name || c.issuer) ? '18px' : 0 }}>
              <h2 style={sectionTitle}>Education</h2>
              {resumeData.education
                .filter((e) => e.degree || e.institution)
                .map((e, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                      <h3 style={base.itemTitle}>{e.degree}</h3>
                      <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(e.graduationDate)}</span>
                    </div>
                    <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.institution, e.location, e.gpa ? `GPA: ${e.gpa}` : ''].filter(Boolean).join(' • ')}</div>
                  </div>
                ))}
            </div>
          )}

          {resumeData.certifications?.some((c) => c.name || c.issuer) && (
            <div>
              <h2 style={sectionTitle}>Certifications</h2>
              {resumeData.certifications
                .filter((c) => c.name || c.issuer)
                .map((c, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                      <h3 style={base.itemTitle}>{c.name}</h3>
                      <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(c.date)}</span>
                    </div>
                    <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[c.issuer, c.url].filter(Boolean).join(' • ')}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
