import { ResumeData } from '../ResumeContext';
import { formatDateRange, formatMonthYear, getTemplateTheme, type ResumeStyleSettings } from './templateKit';
import { getProfilePicturePreviewUrl } from '@/lib/appwrite';

export function TimelineTemplate({ resumeData, styleSettings }: { resumeData: ResumeData; styleSettings?: ResumeStyleSettings }) {
  const { personalInfo } = resumeData;
  const { colors, base, line } = getTemplateTheme(styleSettings);

  const photoUrl = personalInfo.photoFileId ? getProfilePicturePreviewUrl(personalInfo.photoFileId, 140) : '';
  const initials = `${(personalInfo.firstName || ' ')[0] || ''}${(personalInfo.lastName || ' ')[0] || ''}`.trim().toUpperCase();

  const headerMeta = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin, personalInfo.github]
    .filter(Boolean)
    .join(' • ');

  const sectionLabelStyle = {
    fontSize: base.itemMeta.fontSize,
    fontWeight: 900,
    letterSpacing: '1.6px',
    textTransform: 'uppercase',
    color: colors.textMuted,
  } as const;

  const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
    <div style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <div style={{ display: 'table-cell', width: '140px', verticalAlign: 'top', paddingRight: '16px' }}>{left}</div>
      <div style={{ display: 'table-cell', verticalAlign: 'top' }}>{right}</div>
    </div>
  );

  const SectionRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '16px' }}>
      <TwoCol
        left={
          <div style={{ paddingTop: '2px' }}>
            <div style={sectionLabelStyle}>{label}</div>
          </div>
        }
        right={
          <div>
            {children}
            <div style={{ marginTop: '12px', height: `${line.hairline}px`, backgroundColor: colors.divider }} />
          </div>
        }
      />
    </div>
  );

  const DatedItem = ({ date, children }: { date: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '10px' }}>
      <TwoCol
        left={<div style={{ fontSize: base.itemMeta.fontSize, color: colors.textMuted, paddingTop: '2px' }}>{date}</div>}
        right={<div>{children}</div>}
      />
    </div>
  );

  return (
    <>
      <div style={{ position: 'relative', paddingBottom: '8px' }}>
        <svg
          width="100%"
          height="160"
          viewBox="0 0 900 160"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ position: 'absolute', inset: '0 auto auto 0', opacity: 0.12 }}
        >
          <defs>
            <linearGradient id="accentFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={colors.accent} stopOpacity="1" />
              <stop offset="1" stopColor={colors.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="108" width="900" height="8" fill="url(#accentFade)" />
          <text x="18" y="92" fontSize="72" fontWeight="900" fill={colors.accent} opacity="0.35">
            {initials || ' '}
          </text>
        </svg>

        <div style={{ position: 'relative', paddingTop: '10px', marginBottom: '22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ ...base.headerName, margin: 0 }}>{personalInfo.firstName} {personalInfo.lastName}</h1>
              <div style={{ marginTop: '10px', fontSize: base.itemMeta.fontSize, color: colors.textSecondary }}>
                {headerMeta || ' '}
              </div>
            </div>

            <div
              style={{
                width: '64px',
                height: '64px',
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
                <div style={{ fontSize: '16px', fontWeight: 900, color: colors.textMuted }}>{initials || ' '}</div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '14px', height: `${line.hairline}px`, backgroundColor: colors.divider }} />
        </div>

        {personalInfo.professionalSummary?.trim() && (
          <SectionRow label="Summary">
            <div style={{ ...base.bodyText, color: colors.textSecondary }}>{personalInfo.professionalSummary}</div>
          </SectionRow>
        )}

        {resumeData.experience?.some((e) => e.jobTitle || e.company) && (
          <SectionRow label="Experience">
            {resumeData.experience
              .filter((e) => e.jobTitle || e.company)
              .map((e, idx) => (
                <DatedItem key={idx} date={formatDateRange(e.startDate, e.endDate, e.current)}>
                  <h3 style={{ ...base.itemTitle, marginBottom: '2px' }}>{e.jobTitle}</h3>
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
                </DatedItem>
              ))}
          </SectionRow>
        )}

        {resumeData.projects?.some((p) => p.title || p.description) && (
          <SectionRow label="Projects">
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
          </SectionRow>
        )}

        {resumeData.education?.some((e) => e.degree || e.institution) && (
          <SectionRow label="Education">
            {resumeData.education
              .filter((e) => e.degree || e.institution)
              .map((e, idx) => (
                <DatedItem key={idx} date={e.graduationDate ? formatMonthYear(e.graduationDate) : ''}>
                  <h3 style={base.itemTitle}>{e.degree}</h3>
                  <div style={{ ...base.itemMeta, color: colors.textSecondary }}>{[e.institution, e.location].filter(Boolean).join(' • ')}</div>
                  {e.gpa && <div style={{ ...base.itemMeta, color: colors.textMuted }}>GPA: {e.gpa}</div>}
                </DatedItem>
              ))}
          </SectionRow>
        )}

        {resumeData.skills?.some((g) => g.category || g.items?.some((i) => i.trim())) && (
          <SectionRow label="Skills">
            {resumeData.skills
              .filter((g) => g.category || g.items?.some((i) => i.trim()))
              .map((g, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  {g.category && <div style={{ fontSize: base.itemMeta.fontSize, fontWeight: 900, color: colors.textPrimary }}>{g.category}</div>}
                  <div style={{ ...base.bodyText, color: colors.textSecondary, marginTop: '2px' }}>{g.items?.filter((i) => i.trim()).join(' · ')}</div>
                </div>
              ))}
          </SectionRow>
        )}
      </div>
    </>
  );
}
