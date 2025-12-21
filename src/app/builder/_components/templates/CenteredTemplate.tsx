import { ResumeData } from '../ResumeContext';
import { formatDateRange, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function CenteredTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 180) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const CenterTitle = ({ title }: { title: string }) => (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{ fontSize: base.sectionTitle.fontSize, fontWeight: base.sectionTitle.fontWeight, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '1.2px' }}>{title}</div>
      <div style={{ margin: '8px auto 0 auto', width: '72px', height: `${line.thick}px`, backgroundColor: colors.accent }} />
    </div>
  );

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '999px',
            overflow: 'hidden',
            margin: '0 auto',
            backgroundColor: colors.accentSoftBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ fontSize: '22px', fontWeight: 900, color: colors.accent }}>{initials || ' '}</div>
          )}
        </div>

        <h1 style={{ ...base.headerName, margin: '10px 0 0 0' }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', fontSize: base.itemMeta.fontSize, color: colors.textSecondary }}>
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean)
            .map((v, idx) => (
              <span key={idx}>{v}</span>
            ))}
        </div>
      </div>

      {personalInfo.professionalSummary?.trim() && (
        <div style={{ marginBottom: '18px' }}>
          <CenterTitle title="Summary" />
          <p style={{ ...base.bodyText, textAlign: 'center' }}>{personalInfo.professionalSummary}</p>
        </div>
      )}

      {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
        <div style={{ marginBottom: '18px' }}>
          <CenterTitle title="Experience" />
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
            <div>
              <CenterTitle title="Skills" />
              {resumeData.skills
                .filter((g) => g.category || g.items?.some((i) => i.trim()))
                .map((g, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary, textAlign: 'center' }}>{g.category}</div>}
                    <div style={{ ...base.bodyText, textAlign: 'center', marginTop: '2px' }}>{g.items?.filter((i) => i.trim()).join(', ')}</div>
                  </div>
                ))}
            </div>
          )}

          {resumeData.projects?.some((p) => p.title || p.description) && (
            <div>
              <CenterTitle title="Projects" />
              {resumeData.projects
                .filter((p) => p.title || p.description)
                .map((p, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <h3 style={{ ...base.itemTitle, textAlign: 'center' }}>{p.title}</h3>
                    {(p.url || (p.technologies ?? []).length) && (
                      <div style={{ ...base.itemMeta, color: colors.textMuted, textAlign: 'center' }}>
                        {[p.url, (p.technologies ?? []).filter(Boolean).join(', ')].filter(Boolean).join(' • ')}
                      </div>
                    )}
                    {p.description && <div style={{ ...base.bodyText, textAlign: 'center', marginTop: '4px' }}>{p.description}</div>}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
