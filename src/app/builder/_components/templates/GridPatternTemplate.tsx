import { ResumeData } from '../ResumeContext';
import { formatDateRange, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function GridPatternTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 160) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', padding: '14px', backgroundColor: colors.white }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, opacity: 0.25 }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={colors.divider} strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="400" height="120" fill="url(#grid)" />
              <circle cx="340" cy="-10" r="70" fill={colors.accent} opacity="0.14" />
              <circle cx="40" cy="120" r="60" fill={colors.accent} opacity="0.10" />
            </svg>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '14px',
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
            </div>
          </div>

          {personalInfo.professionalSummary?.trim() && (
            <div style={{ padding: '12px 14px', borderTop: `${line.hairline}px solid ${colors.divider}` }}>
              <p style={{ ...base.bodyText, margin: 0 }}>{personalInfo.professionalSummary}</p>
            </div>
          )}
        </div>
      </div>

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Experience
            <span style={{ width: '54px', height: `${line.thick}px`, borderRadius: '999px', backgroundColor: colors.accent }} />
          </h2>

          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, idx) => (
              <div key={idx} style={{ marginBottom: '14px', padding: '10px 12px', borderRadius: '12px', backgroundColor: colors.white }}>
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
          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div style={{ marginBottom: resumeData.projects?.some((p) => p.title || p.description) ? '18px' : 0 }}>
              <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Skills
                <span style={{ width: '54px', height: `${line.thick}px`, borderRadius: '999px', backgroundColor: colors.accent }} />
              </h2>
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

          {resumeData.projects?.some((p) => p.title || p.description) && (
            <div>
              <h2 style={{ ...base.sectionTitle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Projects
                <span style={{ width: '54px', height: `${line.thick}px`, borderRadius: '999px', backgroundColor: colors.accent }} />
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
        </div>
      )}
    </>
  );
}
