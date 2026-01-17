"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { normalizeSectionOrder, type SectionKey, TemplateType, useResumeContext } from "./ResumeContext";
import { SECTION_LABELS, templateMeta, templateNames, templates } from "./templates";
import { DEFAULT_STYLE_SETTINGS, RECOMMENDED_ACCENT_COLORS } from "./templates/templateKit";
import WorkExperienceSection from "./sections/WorkExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import { useResumeApi } from "@/hooks/useResumeApi";
import { account, appwriteAuth, getProfilePicturePreviewUrl } from "@/lib/appwrite";
import { useResumeLoader } from "./useResumeLoader";
import { useDebouncedFormSync } from "@/hooks/useDebouncedFormSync";

const resumeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  professionalSummary: z.string().optional(),
});

type ResumeFormData = z.infer<typeof resumeFormSchema>;

function TemplateThumbnail({ templateKey }: { templateKey: TemplateType }) {
  const { resumeData, styleSettings } = useResumeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const TemplateComponent = useMemo(() => templates[templateKey], [templateKey]);

  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING = 60;

  useEffect(() => {
    const updateScale = () => {
      const host = containerRef.current;
      if (!host) return;
      const width = host.clientWidth;
      if (!width) return;
      const next = Math.min((width - 12) / A4_WIDTH, 1);
      setScale(next);
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="bg-white rounded-md overflow-hidden relative"
        style={{ height: `${Math.round(A4_HEIGHT * scale)}px` }}
      >
        <div
          style={{
            width: `${A4_WIDTH}px`,
            height: `${A4_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: `${PADDING}px`,
              boxSizing: "border-box",
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            <TemplateComponent resumeData={resumeData} styleSettings={styleSettings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeBuilderForm() {
  const { resumeData, updatePersonalInfo, setSelectedTemplate, selectedTemplate, styleSettings, updateStyleSettings, setStyleSettings, setSectionOrder } = useResumeContext();
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const { saveResume, updateResume, uploadProfilePicture, deleteProfilePicture, isLoading } = useResumeApi();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { resumeId, isEditing, isLoadingResume, loadError, hasLoadedResume } = useResumeLoader();
  const [hasResetForm, setHasResetForm] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoPreviewDataUrl, setPhotoPreviewDataUrl] = useState<string | null>(null);

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      firstName: resumeData.personalInfo.firstName,
      lastName: resumeData.personalInfo.lastName,
      email: resumeData.personalInfo.email,
      phone: resumeData.personalInfo.phone,
      location: resumeData.personalInfo.location,
      website: resumeData.personalInfo.website,
      linkedin: resumeData.personalInfo.linkedin,
      github: resumeData.personalInfo.github,
      professionalSummary: resumeData.personalInfo.professionalSummary,
    },
  });

  const syncFormToContext = useCallback((formData: Record<string, unknown>) => {
    updatePersonalInfo({
      firstName: (formData.firstName as string) || "",
      lastName: (formData.lastName as string) || "",
      email: (formData.email as string) || "",
      phone: (formData.phone as string) || "",
      location: (formData.location as string) || "",
      website: (formData.website as string) || "",
      linkedin: (formData.linkedin as string) || "",
      github: (formData.github as string) || "",
      professionalSummary: (formData.professionalSummary as string) || "",
    });
  }, [updatePersonalInfo]);

  useDebouncedFormSync(form.watch, syncFormToContext, 300, hasResetForm || !isEditing);

  useEffect(() => {
    let cancelled = false;
    const fileId = resumeData.personalInfo.photoFileId;
    if (!fileId) {
      setPhotoPreviewDataUrl(null);
      return;
    }

    const src = getProfilePicturePreviewUrl(fileId, 160);
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

    const blobToDataUrl = (blob: Blob) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read blob as data URL'));
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(blob);
      });

    void (async () => {
      try {
        const token = await account.createJWT();
        const headers: Record<string, string> = {
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'X-Appwrite-JWT': token.jwt,
        };
        if (projectId) headers['X-Appwrite-Project'] = projectId;

        const res = await fetch(src, { headers, cache: 'no-store' });
        if (!res.ok) {
          if (!cancelled) setPhotoPreviewDataUrl(null);
          return;
        }

        const contentLength = res.headers.get('content-length');
        if (contentLength && Number(contentLength) > 5_000_000) {
          if (!cancelled) setPhotoPreviewDataUrl(null);
          return;
        }

        const blob = await res.blob();
        const dataUrl = await blobToDataUrl(blob);
        if (!dataUrl.startsWith('data:')) {
          if (!cancelled) setPhotoPreviewDataUrl(null);
          return;
        }

        if (!cancelled) setPhotoPreviewDataUrl(dataUrl);
      } catch {
        if (!cancelled) setPhotoPreviewDataUrl(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resumeData.personalInfo.photoFileId]);

  useEffect(() => {
    if (isEditing && resumeId && hasLoadedResume && !hasResetForm) {
      form.reset({
        firstName: resumeData.personalInfo.firstName,
        lastName: resumeData.personalInfo.lastName,
        email: resumeData.personalInfo.email,
        phone: resumeData.personalInfo.phone,
        location: resumeData.personalInfo.location,
        website: resumeData.personalInfo.website,
        linkedin: resumeData.personalInfo.linkedin,
        github: resumeData.personalInfo.github,
        professionalSummary: resumeData.personalInfo.professionalSummary,
      });
      setHasResetForm(true);
    }
  }, [resumeData, form, isEditing, resumeId, hasLoadedResume, hasResetForm]);

  const handleSaveResume = async () => {
    setSaveStatus('idle');
    const currentUser = await appwriteAuth.getCurrentUser();
    
    try {
      const resumePayload = {
        ...resumeData,
        template: selectedTemplate,
        styleSettings,
      };

      let result;
      
      if (isEditing && resumeId) {
        console.log('Updating existing resume:', resumePayload);
        result = await updateResume(resumeId, resumePayload);
      } else {
        result = await saveResume({
          ...resumePayload,
          userId: currentUser.user?.$id || '',
        });
      }
      
      if (result.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        console.error('Save failed:', result.error);
      }
    } catch (error) {
      setSaveStatus('error');
      console.error('Save error:', error);
    }
  };

  const getSaveButtonText = () => {
    if (isLoading) return isEditing ? 'Updating...' : 'Saving...';
    if (saveStatus === 'success') return isEditing ? 'Updated!' : 'Saved!';
    if (saveStatus === 'error') return 'Save Failed - Retry';
    return isEditing ? 'Update Resume' : 'Save Resume';
  };

  const getSaveButtonStyle = () => {
    if (saveStatus === 'success') return 'bg-green-500 hover:bg-green-400';
    if (saveStatus === 'error') return 'bg-red-500 hover:bg-red-400';
    if (isLoading) return 'bg-gray-400 cursor-not-allowed';
    return 'bg-yellow-400 hover:bg-yellow-300';
  };

  const sidebarSections = useMemo(() => templateMeta[selectedTemplate]?.sidebarSections ?? [], [selectedTemplate]);
  const sidebarSet = useMemo(() => new Set<SectionKey>(sidebarSections), [sidebarSections]);
  const sectionOrder = useMemo(() => normalizeSectionOrder(resumeData.sectionOrder), [resumeData.sectionOrder]);
  const mainOrder = useMemo(() => sectionOrder.filter((k) => !sidebarSet.has(k)), [sectionOrder, sidebarSet]);
  const sidebarOrder = useMemo(() => sectionOrder.filter((k) => sidebarSet.has(k)), [sectionOrder, sidebarSet]);

  const [draggingKey, setDraggingKey] = useState<SectionKey | null>(null);
  const [dragOverKey, setDragOverKey] = useState<SectionKey | null>(null);

  const reorderWithin = useCallback((items: SectionKey[], from: SectionKey, to: SectionKey) => {
    const fromIndex = items.indexOf(from);
    const toIndex = items.indexOf(to);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return items;
    const next = [...items];
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, from);
    return next;
  }, []);

  const mergeRegionIntoGlobal = useCallback(
    (scope: 'all' | 'main' | 'sidebar', nextRegionOrder: SectionKey[]) => {
      if (scope === 'all') {
        setSectionOrder(nextRegionOrder);
        return;
      }

      const next = (() => {
        let i = 0;
        return sectionOrder.map((key) => {
          const inRegion = scope === 'sidebar' ? sidebarSet.has(key) : !sidebarSet.has(key);
          if (!inRegion) return key;
          const replacement = nextRegionOrder[i];
          i += 1;
          return replacement ?? key;
        });
      })();

      setSectionOrder(next);
    },
    [sectionOrder, setSectionOrder, sidebarSet],
  );

  const SectionOrderList = ({
    title,
    items,
    scope,
  }: {
    title: string;
    items: SectionKey[];
    scope: 'all' | 'main' | 'sidebar';
  }) => {
    const onDropOn = (target: SectionKey, e: React.DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('text/plain');
      const from = raw as SectionKey;
      if (!from || !items.includes(from) || from === target) return;
      const nextItems = reorderWithin(items, from, target);
      mergeRegionIntoGlobal(scope, nextItems);
    };

    return (
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">{title}</div>
        <div className="mt-3 space-y-2">
          {items.map((key) => (
            <div
              key={key}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', key);
                e.dataTransfer.effectAllowed = 'move';
                setDraggingKey(key);
              }}
              onDragEnd={() => {
                setDraggingKey(null);
                setDragOverKey(null);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (dragOverKey !== key) setDragOverKey(key);
              }}
              onDragLeave={() => {
                if (dragOverKey === key) setDragOverKey(null);
              }}
              onDrop={(e) => {
                onDropOn(key, e);
                setDragOverKey(null);
              }}
              className={
                "flex items-center justify-between gap-3 rounded-md border bg-white/5 px-3 py-2 select-none " +
                (dragOverKey === key && draggingKey && draggingKey !== key
                  ? "border-yellow-400/60"
                  : "border-white/10")
              }
            >
              <div className="text-sm text-white truncate">{SECTION_LABELS[key] ?? key}</div>
              <div className="text-xs text-white/50">Drag</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 relative">
      {isLoadingResume && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-3"></div>
            <p className="text-white font-medium">Loading resume...</p>
          </div>
        </div>
      )}

      {loadError && (
        <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">Failed to load resume</h3>
              <p className="mt-1 text-sm text-red-300">{loadError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex border-b border-white/20 shrink-0 gap-9">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Resume Builder</h1>
          <p className="text-white/80 text-sm">Fill out your information to build your resume</p>
        </div>
        <div className="flex-1 pt-6 pb-4">
          <button
            type="button"
            onClick={handleSaveResume}
            disabled={isLoading}
            className={`w-full px-6 py-3 text-violet-900 font-semibold rounded-lg transition-all duration-200 ${getSaveButtonStyle()}`}
          >
            {getSaveButtonText()}
          </button>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Template</h2>
            <p className="text-white/70 text-sm">Selected: {templateNames[selectedTemplate]}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowTemplatePicker((v) => !v)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
          >
            {showTemplatePicker ? 'Close' : 'Change template'}
          </button>
        </div>

        <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Customization</h3>
              <p className="text-xs text-white/60">Accent applies to lines and decorative elements</p>
            </div>
            <button
              type="button"
              onClick={() => setStyleSettings(DEFAULT_STYLE_SETTINGS)}
              className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-all duration-200"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Accent color</div>
                  <div className="text-xs text-white/60 mt-1">Used for section dividers, highlights and links</div>
                </div>
                <div className="flex items-center gap-2">

                  <input
                    type="color"
                    value={styleSettings.accentColor}
                    onChange={(e) => updateStyleSettings({ accentColor: e.target.value })}
                    className="h-8 w-10 bg-transparent"
                    aria-label="Pick accent color"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {RECOMMENDED_ACCENT_COLORS.map((hex) => {
                  const selected = styleSettings.accentColor.toLowerCase() === hex.toLowerCase();
                  return (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => updateStyleSettings({ accentColor: hex })}
                      className={
                        "h-8 w-8 rounded-md border transition-all duration-200 " +
                        (selected ? "border-yellow-400/70 ring-2 ring-yellow-400/30" : "border-white/20 hover:border-white/40")
                      }
                      style={{ backgroundColor: hex }}
                      aria-label={`Set accent color to ${hex}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Typography</div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Font size</label>
                  <div className="text-xs text-white/60">{Math.round(styleSettings.textScale * 100)}%</div>
                </div>
                <input
                  type="range"
                  min={0.9}
                  max={1.1}
                  step={0.01}
                  value={styleSettings.textScale}
                  onChange={(e) => updateStyleSettings({ textScale: Number(e.target.value) })}
                  className="mt-2 w-full"
                  aria-label="Font size"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Line height</label>
                  <div className="text-xs text-white/60">{Math.round(styleSettings.lineHeightScale * 100)}%</div>
                </div>
                <input
                  type="range"
                  min={0.9}
                  max={1.2}
                  step={0.01}
                  value={styleSettings.lineHeightScale}
                  onChange={(e) => updateStyleSettings({ lineHeightScale: Number(e.target.value) })}
                  className="mt-2 w-full"
                  aria-label="Line height"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sidebarSections.length > 0 ? (
              <>
                <SectionOrderList title="Main section order" items={mainOrder} scope="main" />
                <SectionOrderList title="Sidebar section order" items={sidebarOrder} scope="sidebar" />
              </>
            ) : (
              <SectionOrderList title="Section order" items={mainOrder} scope="all" />
            )}
          </div>
        </div>

        {showTemplatePicker && (
          <div
            role="radiogroup"
            aria-label="Resume template"
            className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {Object.entries(templateNames).map(([key, name]) => {
              const isSelected = selectedTemplate === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setSelectedTemplate(key as TemplateType);
                    setShowTemplatePicker(false);
                  }}
                  className={
                    `group text-left rounded-lg border transition-all duration-200 ` +
                    (isSelected
                      ? "border-yellow-400/60 bg-white/15 ring-2 ring-yellow-400/40"
                      : "border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/30")
                  }
                >
                  <div className="p-3">
                    <div className="rounded-md border border-black/10 bg-white">
                      <TemplateThumbnail templateKey={key as TemplateType} />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="text-white font-semibold text-sm truncate">{name}</div>
                      {isSelected && <div className="text-yellow-300 text-xs font-semibold">Selected</div>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-8 ">
        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-white/70 text-sm">Your basic contact information</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Profile photo</div>
              </div>
              {resumeData.personalInfo.photoFileId && (
                <button
                  type="button"
                  onClick={async () => {
                    const existing = resumeData.personalInfo.photoFileId;
                    updatePersonalInfo({ photoFileId: undefined });
                    if (existing) {
                      await deleteProfilePicture(existing);
                    }
                  }}
                  className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-all duration-200"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="mt-3 flex items-center gap-4">
              <div className="h-16 w-16 rounded-md border border-white/20 bg-white/5 overflow-hidden flex items-center justify-center">
                {resumeData.personalInfo.photoFileId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreviewDataUrl ?? getProfilePicturePreviewUrl(resumeData.personalInfo.photoFileId, 160)}
                    alt="Profile photo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-white/50 text-xs">No photo</div>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingPhoto}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setPhotoError(null);
                    setIsUploadingPhoto(true);
                    try {
                      const result = await uploadProfilePicture(file);
                      if (!result.success || !result.fileId) {
                        setPhotoError(result.error || 'Upload failed');
                        return;
                      }

                      const previous = resumeData.personalInfo.photoFileId;
                      updatePersonalInfo({ photoFileId: result.fileId });

                      if (previous) {
                        await deleteProfilePicture(previous);
                      }
                    } finally {
                      setIsUploadingPhoto(false);
                      e.target.value = '';
                    }
                  }}
                  className="block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
                {photoError && <div className="text-red-300 text-xs mt-2">{photoError}</div>}
                {isUploadingPhoto && <div className="text-white/60 text-xs mt-2">Uploading…</div>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">First Name *</label>
              <input
                {...form.register("firstName")}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="John"
              />
              {form.formState.errors.firstName && <p className="text-red-300 text-sm mt-1">{form.formState.errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Last Name *</label>
              <input
                {...form.register("lastName")}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="Doe"
              />
              {form.formState.errors.lastName && <p className="text-red-300 text-sm mt-1">{form.formState.errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="john.doe@email.com"
              />
              {form.formState.errors.email && <p className="text-red-300 text-sm mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Phone *</label>
              <input
                {...form.register("phone")}
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="+1 (555) 123-4567"
              />
              {form.formState.errors.phone && <p className="text-red-300 text-sm mt-1">{form.formState.errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Location *</label>
            <input
              {...form.register("location")}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              placeholder="New York, NY"
            />
            {form.formState.errors.location && <p className="text-red-300 text-sm mt-1">{form.formState.errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Website</label>
              <input
                {...form.register("website")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://yourwebsite.com"
              />
              {form.formState.errors.website && <p className="text-red-300 text-sm mt-1">{form.formState.errors.website.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">LinkedIn</label>
              <input
                {...form.register("linkedin")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://linkedin.com/in/johndoe"
              />
              {form.formState.errors.linkedin && <p className="text-red-300 text-sm mt-1">{form.formState.errors.linkedin.message}</p>}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">GitHub</label>
              <input
                {...form.register("github")}
                type="url"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="https://github.com/johndoe"
              />
              {form.formState.errors.github && <p className="text-red-300 text-sm mt-1">{form.formState.errors.github.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/20 pb-4">
            <h2 className="text-xl font-bold text-white mb-2">Professional Summary</h2>
            <p className="text-white/70 text-sm">A brief overview of your professional background and key achievements</p>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Professional Summary</label>
            <textarea
              {...form.register("professionalSummary")}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
              placeholder="Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives."
            />
            {form.formState.errors.professionalSummary && (
              <p className="text-red-300 text-sm mt-1">{form.formState.errors.professionalSummary.message}</p>
            )}
            <p className="text-white/60 text-sm mt-2">Current length: {form.watch("professionalSummary")?.length || 0} characters</p>
          </div>
        </div>

        <WorkExperienceSection />

        <EducationSection />

        <SkillsSection />

        <ProjectsSection />

        <CertificationsSection />
      </div>
    </div>
  );
}
