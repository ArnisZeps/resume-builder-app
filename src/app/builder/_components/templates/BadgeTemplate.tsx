import { ResumeData } from '../ResumeContext';
import { formatDateRange, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function BadgeTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 170) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const Badge = ({ text }: { text: string }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 10px',
        borderRadius: '999px',
        backgroundColor: colors.accentSoftBg,
        fontSize: base.itemMeta.fontSize,
        color: colors.textSecondary,
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '999px', backgroundColor: colors.accent }} />
      {text}
    </span>
  );

  return (
    <>
      <div style={{ marginBottom: '18px', paddingBottom: '12px', borderBottom: `${line.hairline}px solid ${colors.divider}` }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
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
              <div style={{ fontSize: '20px', fontWeight: 900, color: colors.accent }}>{initials || ' '}</div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
            <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textMuted }}>
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
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Summary</h2>
          <p style={base.bodyText}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.skills?.some((g) => g.items?.some((i) => i.trim())) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Skill Badges</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {resumeData.skills
              .flatMap((g) => (g.items ?? []).filter((i) => i.trim()))
              .map((s, idx) => (
                <Badge key={idx} text={s} />
              ))}
          </div>
        </div>
      )}

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ ...base.sectionTitle, color: colors.accent }}>Experience</h2>
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
    </>
  );
}
