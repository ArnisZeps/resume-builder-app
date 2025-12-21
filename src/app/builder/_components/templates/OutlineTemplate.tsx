import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function OutlineTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '14px', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: colors.accentSoftBg, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ ...base.sectionTitle, margin: 0 }}>{title}</div>
        <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden="true" style={{ opacity: 0.6 }}>
          <path d="M1 5 H43" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ padding: '12px' }}>{children}</div>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
            <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textSecondary }}>
              {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin, personalInfo.github]
                .filter(Boolean)
                .map((v, idx) => (
                  <span key={idx}>{v}</span>
                ))}
            </div>
          </div>
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '999px',
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
        </div>
      </div>

      {personalInfo.professionalSummary?.trim() && (
        <Box title="Summary">
          <div style={base.bodyText}>{personalInfo.professionalSummary}</div>
        </Box>
      )}

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <Box title="Experience">
          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, idx) => (
              <div key={idx} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `${line.thick}px solid ${colors.accent}` }}>
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
        </Box>
      )}

      {(resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) || resumeData.projects?.some((p) => p.title || p.description)) && (
        <div>
          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div style={{ marginBottom: resumeData.projects?.some((p) => p.title || p.description) ? '14px' : 0 }}>
              <Box title="Skills">
                {resumeData.skills
                  .filter((g) => g.category || g.items?.some((i) => i.trim()))
                  .map((g, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                      {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary }}>{g.category}</div>}
                      <div style={{ ...base.bodyText, marginTop: '2px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                    </div>
                  ))}
              </Box>
            </div>
          )}

          {resumeData.projects?.some((p) => p.title || p.description) && (
            <Box title="Projects">
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
            </Box>
          )}
        </div>
      )}

      {resumeData.education?.some((e) => e.degree || e.institution) && (
        <Box title="Education">
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
        </Box>
      )}
    </>
  );
}
