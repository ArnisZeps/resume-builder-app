import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function SplitHeaderTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 170) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const InfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: base.itemMeta.fontSize }}>
        <span style={{ color: colors.textMuted, fontWeight: 800 }}>{label}</span>
        <span style={{ color: colors.textSecondary, textAlign: 'right' }}>{value}</span>
      </div>
    );
  };

  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px', alignItems: 'stretch' }}>
          <div style={{ padding: '14px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '14px',
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
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.textMuted }}>{initials || ' '}</div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
                <div style={{ marginTop: '6px', fontSize: base.itemMeta.fontSize, color: colors.textMuted }}>
                  {personalInfo.professionalSummary?.trim() ? personalInfo.professionalSummary : ' '}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '12px', height: `${line.thick}px`, backgroundColor: colors.accent, borderRadius: '999px' }} />
          </div>

          <div style={{ position: 'relative', padding: '14px', borderRadius: '12px', backgroundColor: colors.accentSoftBg }}>
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              aria-hidden="true"
              style={{ position: 'absolute', top: '6px', right: '6px', opacity: 0.35 }}
            >
              <path d="M10 22 C22 10 46 10 58 22" fill="none" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
              <path d="M10 46 C22 34 46 34 58 46" fill="none" stroke={colors.accent} strokeWidth="4" strokeLinecap="round" />
            </svg>

            <div style={{ fontSize: base.sectionTitle.fontSize, fontWeight: base.sectionTitle.fontWeight, color: colors.textPrimary, marginBottom: '10px' }}>Contact</div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <InfoRow label="Email" value={personalInfo.email} />
              <InfoRow label="Phone" value={personalInfo.phone} />
              <InfoRow label="Location" value={personalInfo.location} />
              <InfoRow label="Website" value={personalInfo.website} />
              <InfoRow label="LinkedIn" value={personalInfo.linkedin} />
              <InfoRow label="GitHub" value={personalInfo.github} />
            </div>
          </div>
        </div>
      </div>

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={base.sectionTitle}>Experience</h2>
          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, idx) => (
              <div key={idx} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                  <h3 style={base.itemTitle}>{e.jobTitle}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.company, e.location].filter(Boolean).join(' • ')}</div>
                {e.responsibilities?.some((r) => r.trim()) && (
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                    {e.responsibilities
                      .filter((r) => r.trim())
                      .map((r, rIdx) => (
                        <li key={rIdx} style={{ ...base.bodyText, marginBottom: '3px' }}>
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {(resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) || resumeData.education?.some((e) => e.degree || e.institution) || resumeData.certifications?.some((c) => c.name || c.issuer)) && (
        <div>
          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div style={{ marginBottom: resumeData.education?.some((e) => e.degree || e.institution) || resumeData.certifications?.some((c) => c.name || c.issuer) ? '18px' : 0 }}>
              <h2 style={base.sectionTitle}>Skills</h2>
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary }}>{g.category}</div>}
                    <div style={{ ...base.bodyText, marginTop: '2px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          {(resumeData.education?.some((e) => e.degree || e.institution) || resumeData.certifications?.some((c) => c.name || c.issuer)) && (
            <div>
              {resumeData.education?.some((e) => e.degree || e.institution) && (
                <div style={{ marginBottom: resumeData.certifications?.some((c) => c.name || c.issuer) ? '18px' : 0 }}>
                  <h2 style={base.sectionTitle}>Education</h2>
                  {resumeData.education
                    .filter((e) => e.degree || e.institution)
                    .map((e, idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                          <h3 style={base.itemTitle}>{e.degree}</h3>
                          <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatMonthYear(e.graduationDate)}</span>
                        </div>
                        <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.institution, e.location].filter(Boolean).join(' • ')}</div>
                        {e.gpa && <div style={{ ...base.itemMeta, color: colors.textMuted }}>GPA: {e.gpa}</div>}
                      </div>
                    ))}
                </div>
              )}

              {resumeData.certifications?.some((c) => c.name || c.issuer) && (
                <div>
                  <h2 style={base.sectionTitle}>Certifications</h2>
                  {resumeData.certifications
                    .filter((c) => c.name || c.issuer)
                    .map((c, idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <h3 style={base.itemTitle}>{c.name}</h3>
                        <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[c.issuer, c.url].filter(Boolean).join(' • ')}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
