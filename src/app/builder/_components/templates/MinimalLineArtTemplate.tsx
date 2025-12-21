import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function MinimalLineArtTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const Title = ({ title }: { title: string }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <h2 style={{ ...base.sectionTitle, margin: 0 }}>{title}</h2>
        <svg width="120" height="12" viewBox="0 0 120 12" aria-hidden="true" style={{ flex: '0 0 auto', opacity: 0.75 }}>
          <path d="M2 10 C20 2, 40 2, 58 10 S96 18, 118 6" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ marginTop: '8px', height: `${line.hairline}px`, backgroundColor: colors.divider }} />
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textSecondary }}>
              {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin, personalInfo.github]
                .filter(Boolean)
                .map((v, idx) => (
                  <span key={idx}>{v}</span>
                ))}
            </div>

            {personalInfo.professionalSummary?.trim() && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ ...base.bodyText }}>{personalInfo.professionalSummary}</div>
              </div>
            )}
          </div>

          <div
            style={{
              width: '66px',
              height: '66px',
              borderRadius: '12px',
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
              <div style={{ fontSize: '16px', fontWeight: 900, color: colors.textMuted }}>{initials || ' '}</div>
            )}
          </div>
        </div>
      </div>

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <Title title="Experience" />
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

      {(resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) || resumeData.projects?.some((p) => p.title || p.description)) && (
        <div>
          {resumeData.projects?.some((p) => p.title || p.description) && (
            <div style={{ marginBottom: resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) ? '18px' : 0 }}>
              <Title title="Projects" />
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

          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div>
              <Title title="Skills" />
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
        </div>
      )}

      {resumeData.education?.some((e) => e.degree || e.institution) && (
        <div style={{ marginTop: '18px' }}>
          <Title title="Education" />
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
    </>
  );
}
