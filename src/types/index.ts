// =============================================================================
// SMOOTH BUILDER PRO - TYPES
// Modulare TypeScript-Definitionen nach Krug-Prinzipien
// =============================================================================

// =============================================================================
// THEME
// =============================================================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textMuted: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// =============================================================================
// SECTIONS
// =============================================================================

export type SectionType = 
  | 'header'
  | 'hero'
  | 'trustBar'
  | 'services'
  | 'about'
  | 'team'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'cta'
  | 'stickyCta'
  | 'footer'
  | 'cookieBanner';

export interface SectionSettings {
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface Section {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  content: Record<string, unknown>;
  settings: SectionSettings;
}

// =============================================================================
// PROJECT
// =============================================================================

export interface Project {
  id: string;
  name: string;
  template: string;
  theme: Theme;
  sections: Section[];
  settings: {
    language: string;
    timezone: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

// =============================================================================
// TEMPLATES
// =============================================================================

export interface TemplateSection {
  type: SectionType;
  content: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  industry: string;
  colorScheme: ThemeColors;
  fonts: ThemeFonts;
  sections: TemplateSection[];
}

// =============================================================================
// HISTORY (Undo/Redo)
// =============================================================================

export interface HistoryEntry {
  state: Project;
  timestamp: number;
  description: string;
}

// =============================================================================
// STORE STATE
// =============================================================================

export type Viewport = 'desktop' | 'tablet' | 'mobile';
export type SidebarTab = 'sections' | 'theme' | 'settings';

export interface BuilderState {
  project: Project | null;
  isDirty: boolean;
  history: HistoryEntry[];
  historyIndex: number;
  selectedSectionId: string | null;
  viewport: Viewport;
  sidebarTab: SidebarTab;
  previewMode: boolean;
}
