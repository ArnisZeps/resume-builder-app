import type { ComponentType } from 'react';

import type { ResumeData, SectionKey, TemplateType } from '../ResumeContext';
import type { ResumeStyleSettings } from './templateKit';

import { AsterTemplate } from './AsterTemplate';
import { BirchTemplate } from './BirchTemplate';
import { CipherTemplate } from './CipherTemplate';
import { DuneTemplate } from './DuneTemplate';
import { EonTemplate } from './EonTemplate';
import { FjordTemplate } from './FjordTemplate';
import { GroveTemplate } from './GroveTemplate';
import { HaloTemplate } from './HaloTemplate';
import { IvoryTemplate } from './IvoryTemplate';
import { JuniperTemplate } from './JuniperTemplate';
import { LumenTemplate } from './LumenTemplate';
import { MosaicTemplate } from './MosaicTemplate';
import { NovaTemplate } from './NovaTemplate';
import { SableTemplate } from './SableTemplate';
import { ValeTemplate } from './ValeTemplate';

export type TemplateProps = { resumeData: ResumeData; styleSettings?: ResumeStyleSettings };
export type TemplateComponent = ComponentType<TemplateProps>;

export const DEFAULT_TEMPLATE_KEY: TemplateType = 'aster';

export const templates: Record<TemplateType, TemplateComponent> = {
  aster: AsterTemplate,
  birch: BirchTemplate,
  cipher: CipherTemplate,
  dune: DuneTemplate,
  eon: EonTemplate,
  fjord: FjordTemplate,
  grove: GroveTemplate,
  halo: HaloTemplate,
  ivory: IvoryTemplate,
  juniper: JuniperTemplate,
  lumen: LumenTemplate,
  mosaic: MosaicTemplate,
  nova: NovaTemplate,
  sable: SableTemplate,
  vale: ValeTemplate,
};

export const templateNames: Record<TemplateType, string> = {
  aster: 'Aster',
  birch: 'Birch',
  cipher: 'Cipher',
  dune: 'Dune',
  eon: 'Eon',
  fjord: 'Fjord',
  grove: 'Grove',
  halo: 'Halo',
  ivory: 'Ivory',
  juniper: 'Juniper',
  lumen: 'Lumen',
  mosaic: 'Mosaic',
  nova: 'Nova',
  sable: 'Sable',
  vale: 'Vale',
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'Summary',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  certifications: 'Certifications',
};

export const templateMeta: Record<TemplateType, { sidebarSections: readonly SectionKey[] }> = {
  aster: { sidebarSections: [] },
  birch: { sidebarSections: ['skills', 'certifications', 'education'] },
  cipher: { sidebarSections: [] },
  dune: { sidebarSections: [] },
  eon: { sidebarSections: [] },
  fjord: { sidebarSections: ['skills', 'certifications'] },
  grove: { sidebarSections: [] },
  halo: { sidebarSections: [] },
  ivory: { sidebarSections: [] },
  juniper: { sidebarSections: ['skills', 'education'] },
  lumen: { sidebarSections: [] },
  mosaic: { sidebarSections: [] },
  nova: { sidebarSections: [] },
  sable: { sidebarSections: [] },
  vale: { sidebarSections: ['skills', 'certifications'] },
};

const LEGACY_TEMPLATE_MAP: Record<string, TemplateType> = {
  classic: 'aster',
  modern: 'lumen',
  elegant: 'ivory',
  bold: 'nova',
  precision: 'cipher',
  bannerWave: 'dune',
  editorial: 'eon',
  timeline: 'fjord',
  cards: 'grove',
  splitHeader: 'halo',
  outline: 'cipher',
  gridPattern: 'mosaic',
  badges: 'juniper',
  minimalLineArt: 'ivory',
  minimal: 'ivory',
  twoColumn: 'birch',
  tech: 'cipher',
  executive: 'sable',
  creative: 'mosaic',
  compact: 'lumen',
  centered: 'aster',
} as const;

export function migrateTemplateKey(value: unknown): TemplateType {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed in templates) return trimmed as TemplateType;
    if (trimmed in LEGACY_TEMPLATE_MAP) return LEGACY_TEMPLATE_MAP[trimmed];
  }
  return DEFAULT_TEMPLATE_KEY;
}
