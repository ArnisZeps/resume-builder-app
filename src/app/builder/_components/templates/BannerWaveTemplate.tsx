import { ResumeData } from '../ResumeContext';
import { formatDateRange, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function BannerWaveTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);
  const accentText = colors.white;

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 180) : '';
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
          <div style={{ backgroundColor: colors.accent, color: accentText, padding: '18px 18px 8px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '78px',
                  height: '78px',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.2)',
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
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>{initials || ' '}</div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ ...base.headerName, margin: 0, color: accentText }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
                <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: accentText }}>
                  {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).map((v, idx) => (
                    <span key={idx}>{v}</span>
                  ))}
                </div>
                {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: accentText }}>
                    {[personalInfo.website, personalInfo.linkedin, personalInfo.github].filter(Boolean).map((v, idx) => (
                      <span key={idx}>{v}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: colors.accent }}>
            <svg viewBox="0 0 1200 90" width="100%" height="40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,16 C160,64 320,0 480,32 C640,64 800,12 960,40 C1080,60 1160,44 1200,32 L1200,90 L0,90 Z" fill={colors.white} opacity={0.95} />
              <path d="M0,24 C180,80 360,8 520,40 C700,76 860,26 1000,46 C1100,60 1170,56 1200,50 L1200,90 L0,90 Z" fill={colors.white} opacity={0.65} />
            </svg>
          </div>

          {personalInfo.professionalSummary?.trim() && (
            <div style={{ padding: '14px 18px 18px 18px', backgroundColor: colors.white }}>
              <p style={{ ...base.bodyText, margin: 0 }}>{personalInfo.professionalSummary}</p>
            </div>
          )}
        </div>
      </div>

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Experience</h2>
          {resumeData.experience
            .filter((e) => e.jobTitle || e.company)
            .map((e, index) => (
              <div key={index} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `${line.thick}px solid ${colors.accent}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                  <h3 style={base.itemTitle}>{e.jobTitle}</h3>
                  <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
                </div>
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
            ))}
        </div>
      )}

      {(resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) || resumeData.projects?.some((p) => p.title || p.description)) && (
        <div>
          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div style={{ marginBottom: resumeData.projects?.some((p) => p.title || p.description) ? '18px' : 0 }}>
              <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Skills</h2>
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 800, color: colors.textPrimary }}>{g.category}</div>}
                    <div style={{ ...base.bodyText, marginTop: '2px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          {resumeData.projects?.some((p) => p.title || p.description) && (
            <div>
              <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Projects</h2>
              {resumeData.projects
                .filter((p) => p.title || p.description)
                .map((p, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                      <h3 style={base.itemTitle}>{p.title}</h3>
                      <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{[p.url, (p.technologies ?? []).filter(Boolean).join(', ')].filter(Boolean).join(' • ')}</span>
                    </div>
                    {p.description && <div style={base.bodyText}>{p.description}</div>}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
