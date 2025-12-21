import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function CardsTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 170) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{ borderRadius: '12px', backgroundColor: colors.white, padding: '12px 14px' }}>{children}</div>
  );

  const CardTitle = ({ title }: { title: string }) => (
    <h2 style={{ ...base.sectionTitle, marginTop: 0, marginBottom: '10px', color: colors.accent }}>{title}</h2>
  );

  return (
    <>
      <div style={{ marginBottom: '14px' }}>
        <Card>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div
              style={{
                width: '76px',
                height: '76px',
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

          {personalInfo.professionalSummary?.trim() && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: `${line.hairline}px solid ${colors.divider}` }}>
              <div style={base.bodyText}>{personalInfo.professionalSummary}</div>
            </div>
          )}
        </Card>
      </div>

      <div>
        {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
          <div style={{ marginBottom: '14px' }}>
            <Card>
            <CardTitle title="Experience" />
            {resumeData.experience
              .filter((e) => e.jobTitle || e.company)
              .map((e, idx) => (
                <div key={idx} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
                    <h3 style={base.itemTitle}>{e.jobTitle}</h3>
                    <span style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, whiteSpace: 'nowrap' }}>{formatDateRange(e.startDate, e.endDate, e.current)}</span>
                  </div>
                  <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.company, e.location].filter(Boolean).join(' • ')}</div>
                  {e.responsibilities?.some((r) => r.trim()) && (
                    <ul style={{ margin: '6px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
                      {e.responsibilities
                        .filter((r) => r.trim())
                        .slice(0, 5)
                        .map((r, rIdx) => (
                          <li key={rIdx} style={{ ...base.bodyText, marginBottom: '3px' }}>
                            {r}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </Card>
          </div>
        )}

        {(resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) || resumeData.projects?.some((p) => p.title || p.description)) && (
          <div style={{ marginBottom: '14px' }}>
            <Card>
              <CardTitle title="Highlights" />

            {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary, marginBottom: '6px' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {resumeData.skills
                    .flatMap((g) => g.items?.filter((i) => i.trim()) ?? [])
                    .map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          backgroundColor: colors.accentSoftBg,
                          color: colors.textSecondary,
                          fontSize: base.itemMeta.fontSize,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            )}

              {resumeData.projects?.some((p) => p.title || p.description) && (
                <div>
                  <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary, marginBottom: '6px' }}>Projects</div>
                  {resumeData.projects
                    .filter((p) => p.title || p.description)
                    .slice(0, 3)
                    .map((p, idx) => (
                      <div key={idx} style={{ marginBottom: '10px' }}>
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
            </Card>
          </div>
        )}
      </div>

      {(resumeData.education?.some((e) => e.degree || e.institution) || resumeData.certifications?.some((c) => c.name || c.issuer)) && (
        <div style={{ marginTop: '14px' }}>
          {resumeData.education?.some((e) => e.degree || e.institution) && (
            <div style={{ marginBottom: resumeData.certifications?.some((c) => c.name || c.issuer) ? '14px' : 0 }}>
              <Card>
                <CardTitle title="Education" />
                {resumeData.education
                  .filter((e) => e.degree || e.institution)
                  .map((e, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                      <h3 style={base.itemTitle}>{e.degree}</h3>
                      <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.institution, e.location].filter(Boolean).join(' • ')}</div>
                      {(e.graduationDate || e.gpa) && (
                        <div style={{ ...base.itemMeta, color: colors.textMuted }}>
                          {[e.graduationDate ? formatMonthYear(e.graduationDate) : '', e.gpa ? `GPA: ${e.gpa}` : ''].filter(Boolean).join(' • ')}
                        </div>
                      )}
                    </div>
                  ))}
              </Card>
            </div>
          )}

          {resumeData.certifications?.some((c) => c.name || c.issuer) && (
            <Card>
              <CardTitle title="Certifications" />
              {resumeData.certifications
                .filter((c) => c.name || c.issuer)
                .map((c, idx) => (
                  <div key={idx} style={{ marginBottom: '12px' }}>
                    <h3 style={base.itemTitle}>{c.name}</h3>
                    <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[c.issuer, c.date ? formatMonthYear(c.date) : ''].filter(Boolean).join(' • ')}</div>
                    {c.url && <div style={{ ...base.itemMeta, color: colors.textMuted }}>{c.url}</div>}
                  </div>
                ))}
            </Card>
          )}
        </div>
      )}
    </>
  );
}
