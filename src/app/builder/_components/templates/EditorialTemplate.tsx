import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function EditorialTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
            <div style={{ marginTop: '8px', fontSize: base.itemMeta.fontSize, color: colors.textSecondary }}>
              {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin, personalInfo.github]
                .filter(Boolean)
                .join(' • ')}
            </div>
          </div>

          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '999px',
              overflow: 'hidden',
              backgroundColor: colors.accentSoftBg,
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
              <div style={{ fontSize: '18px', fontWeight: 900, color: colors.accent }}>{initials || ' '}</div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '12px', height: `${line.thick}px`, backgroundColor: colors.accent }} />
      </div>

      {personalInfo.professionalSummary?.trim() && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: colors.accent }} />
            Summary
          </h2>
          <p style={base.bodyText}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: colors.accent }} />
            Experience
          </h2>
          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, index) => (
              <div key={index} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '12px' }}>
                  <div style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted }}>
                    {formatDateRange(e.startDate, e.endDate, e.current)}
                  </div>
                  <div>
                    <h3 style={{ ...base.itemTitle, marginBottom: '2px' }}>{e.jobTitle}</h3>
                    <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.company, e.location].filter(Boolean).join(' • ')}</div>
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
                </div>
              </div>
            ))}
        </div>
      )}

      {(resumeData.projects?.some((p) => p.title || p.description) || resumeData.education?.some((e) => e.degree || e.institution)) && (
        <div>
          {resumeData.projects?.some((p) => p.title || p.description) && (
            <div style={{ marginBottom: resumeData.education?.some((e) => e.degree || e.institution) ? '18px' : 0 }}>
              <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: colors.accent }} />
                Projects
              </h2>
              {resumeData.projects
                .filter((p) => p.title || p.description)
                .map((p, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <h3 style={base.itemTitle}>{p.title}</h3>
                    {(p.url || (p.technologies ?? []).length) && (
                      <div style={{ ...base.itemMeta, color: colors.textMuted }}>
                        {[p.url, (p.technologies ?? []).filter(Boolean).join(', ')].filter(Boolean).join(' • ')}
                      </div>
                    )}
                    {p.description && <div style={{ ...base.bodyText, marginTop: '4px' }}>{p.description}</div>}
                  </div>
                ))}
            </div>
          )}

          {resumeData.education?.some((e) => e.degree || e.institution) && (
            <div>
              <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: colors.accent }} />
                Education
              </h2>
              {resumeData.education
                .filter((e) => e.degree || e.institution)
                .map((e, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <h3 style={base.itemTitle}>{e.degree}</h3>
                    <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.institution, e.location].filter(Boolean).join(' • ')}</div>
                    {e.graduationDate && <div style={{ ...base.itemMeta, color: colors.textMuted }}>{formatMonthYear(e.graduationDate)}</div>}
                    {e.gpa && <div style={{ ...base.itemMeta, color: colors.textMuted }}>GPA: {e.gpa}</div>}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
        <div style={{ marginTop: '18px' }}>
          <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: colors.accent }} />
            Skills
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
            {resumeData.skills
              .filter((g) => g.category || g.items?.some((i) => i.trim()))
              .map((g, idx) => (
                <div key={idx} style={{ padding: '10px', borderRadius: '10px', backgroundColor: colors.subtleBg }}>
                  {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary }}>{g.category}</div>}
                  <div style={{ ...base.bodyText, marginTop: '4px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
