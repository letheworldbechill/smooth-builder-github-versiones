// =============================================================================
// SMOOTH BUILDER PRO - ZUSTAND STORE
// State Management mit Undo/Redo (200 Entries)
// =============================================================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { 
  Project, 
  Section, 
  SectionType,
  Theme, 
  HistoryEntry,
  Viewport,
  SidebarTab 
} from '../types';
import { getTemplate, templates } from '../data/templates';

const MAX_HISTORY = 200;

// =============================================================================
// HELPERS
// =============================================================================

const generateId = () => Math.random().toString(36).slice(2, 11);

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const setDeep = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) current[keys[i]] = {};
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
};

// =============================================================================
// STATE INTERFACE
// =============================================================================

interface ProjectStore {
  // State
  project: Project | null;
  isDirty: boolean;
  history: HistoryEntry[];
  historyIndex: number;
  selectedSectionId: string | null;
  viewport: Viewport;
  sidebarTab: SidebarTab;
  previewMode: boolean;

  // Project Actions
  createProject: (templateId: string) => void;
  setProject: (project: Project) => void;
  clearProject: () => void;

  // Section Actions
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  updateSectionContent: (sectionId: string, path: string, value: unknown) => void;
  addSection: (type: SectionType, afterIndex?: number) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;

  // Theme Actions
  updateTheme: (updates: Partial<Theme>) => void;
  updateThemeColor: (colorKey: keyof Theme['colors'], value: string) => void;

  // Selection Actions
  selectSection: (sectionId: string | null) => void;

  // UI Actions
  setViewport: (viewport: Viewport) => void;
  setSidebarTab: (tab: SidebarTab) => void;
  setPreviewMode: (mode: boolean) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

// =============================================================================
// HISTORY HELPER
// =============================================================================

function pushHistory(state: { history: HistoryEntry[]; historyIndex: number }, project: Project, description: string) {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push({
    state: deepClone(project),
    timestamp: Date.now(),
    description,
  });
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  state.history = newHistory;
  state.historyIndex = newHistory.length - 1;
}

// =============================================================================
// DEFAULT SECTION CONTENT
// =============================================================================

function createDefaultSection(type: SectionType): Section {
  const defaults: Record<SectionType, Record<string, unknown>> = {
    header: {
      logoText: 'Logo',
      navigation: [
        { label: 'Startseite', href: '#' },
        { label: 'Leistungen', href: '#services' },
        { label: 'Kontakt', href: '#contact' },
      ],
      cta: { label: 'Kontakt', href: '#contact' },
    },
    hero: {
      headline: 'Willkommen bei uns',
      subline: 'Ihre Beschreibung hier',
      primaryCta: { label: 'Jetzt starten', href: '#contact' },
      secondaryCta: { label: 'Mehr erfahren', href: '#about' },
    },
    trustBar: {
      items: [
        { value: '10+', label: 'Jahre Erfahrung' },
        { value: '500+', label: 'Zufriedene Kunden' },
        { value: '100%', label: 'Qualität' },
      ],
    },
    services: {
      headline: 'Unsere Leistungen',
      subline: 'Was wir für Sie tun können',
      items: [
        { icon: '📋', title: 'Beratung', description: 'Individuelle Beratung' },
        { icon: '🔧', title: 'Umsetzung', description: 'Professionelle Umsetzung' },
        { icon: '✓', title: 'Support', description: 'Zuverlässiger Support' },
      ],
    },
    about: {
      headline: 'Über uns',
      text: 'Erzählen Sie Ihre Geschichte...',
      image: '',
      layout: 'image-right',
    },
    team: {
      headline: 'Unser Team',
      members: [],
    },
    testimonials: {
      headline: 'Das sagen unsere Kunden',
      items: [
        { quote: 'Hervorragende Arbeit!', author: 'M. Müller', company: 'Beispiel AG' },
      ],
    },
    faq: {
      headline: 'Häufige Fragen',
      items: [
        { question: 'Wie kann ich Sie kontaktieren?', answer: 'Per Telefon oder E-Mail.' },
      ],
    },
    contact: {
      headline: 'Kontaktieren Sie uns',
      email: 'info@beispiel.ch',
      phone: '+41 44 123 45 67',
      address: 'Musterstrasse 1\n8000 Zürich',
      showForm: true,
    },
    cta: {
      headline: 'Bereit loszulegen?',
      subline: 'Kontaktieren Sie uns noch heute',
      button: { label: 'Jetzt starten', href: '#contact' },
    },
    stickyCta: {
      text: 'Jetzt Beratung sichern!',
      button: { label: 'Kontakt', href: '#contact' },
    },
    footer: {
      companyName: 'Firmenname',
      description: 'Ihre Beschreibung',
      copyright: `© ${new Date().getFullYear()} Firmenname`,
      links: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
      ],
    },
    cookieBanner: {
      headline: 'Cookie-Einstellungen',
      text: 'Wir verwenden Cookies für die beste Erfahrung.',
      acceptLabel: 'Alle akzeptieren',
      declineLabel: 'Nur notwendige',
    },
  };

  return {
    id: generateId(),
    type,
    enabled: true,
    order: 0,
    content: defaults[type],
    settings: {},
  };
}

// =============================================================================
// STORE
// =============================================================================

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial State
        project: null,
        isDirty: false,
        history: [],
        historyIndex: -1,
        selectedSectionId: null,
        viewport: 'desktop',
        sidebarTab: 'sections',
        previewMode: false,

        // =============================================================================
        // PROJECT ACTIONS
        // =============================================================================

        createProject: (templateId) => set((state) => {
          const template = getTemplate(templateId);
          if (!template) return;

          const project: Project = {
            id: generateId(),
            name: template.name,
            template: templateId,
            theme: {
              colors: { ...template.colorScheme },
              fonts: { ...template.fonts },
              borderRadius: 'md',
            },
            sections: template.sections.map((s, i) => ({
              id: generateId(),
              type: s.type,
              enabled: true,
              order: i,
              content: s.content,
              settings: {},
            })),
            settings: {
              language: 'de',
              timezone: 'Europe/Zurich',
            },
            seo: {
              title: template.name,
              description: template.description,
            },
          };

          state.project = project;
          state.isDirty = false;
          state.selectedSectionId = null;
          state.history = [{
            state: deepClone(project),
            timestamp: Date.now(),
            description: 'Projekt erstellt',
          }];
          state.historyIndex = 0;
        }),

        setProject: (project) => set((state) => {
          state.project = deepClone(project);
          state.isDirty = false;
          state.selectedSectionId = null;
          pushHistory(state, project, 'Projekt geladen');
        }),

        clearProject: () => set((state) => {
          state.project = null;
          state.isDirty = false;
          state.history = [];
          state.historyIndex = -1;
          state.selectedSectionId = null;
        }),

        // =============================================================================
        // SECTION ACTIONS
        // =============================================================================

        updateSection: (sectionId, updates) => set((state) => {
          if (!state.project) return;
          const section = state.project.sections.find(s => s.id === sectionId);
          if (section) {
            Object.assign(section, updates);
            state.isDirty = true;
            pushHistory(state, state.project, `${section.type} aktualisiert`);
          }
        }),

        updateSectionContent: (sectionId, path, value) => set((state) => {
          if (!state.project) return;
          const section = state.project.sections.find(s => s.id === sectionId);
          if (section) {
            setDeep(section.content, path, value);
            state.isDirty = true;
            pushHistory(state, state.project, `Inhalt: ${path}`);
          }
        }),

        addSection: (type, afterIndex) => set((state) => {
          if (!state.project) return;
          const newSection = createDefaultSection(type);
          const insertIndex = afterIndex !== undefined ? afterIndex + 1 : state.project.sections.length;
          state.project.sections.splice(insertIndex, 0, newSection);
          state.project.sections.forEach((s, i) => { s.order = i; });
          state.isDirty = true;
          state.selectedSectionId = newSection.id;
          pushHistory(state, state.project, `${type} hinzugefügt`);
        }),

        removeSection: (sectionId) => set((state) => {
          if (!state.project) return;
          const index = state.project.sections.findIndex(s => s.id === sectionId);
          if (index !== -1) {
            const section = state.project.sections[index];
            state.project.sections.splice(index, 1);
            state.project.sections.forEach((s, i) => { s.order = i; });
            state.isDirty = true;
            if (state.selectedSectionId === sectionId) state.selectedSectionId = null;
            pushHistory(state, state.project, `${section.type} entfernt`);
          }
        }),

        reorderSections: (from, to) => set((state) => {
          if (!state.project) return;
          const [removed] = state.project.sections.splice(from, 1);
          state.project.sections.splice(to, 0, removed);
          state.project.sections.forEach((s, i) => { s.order = i; });
          state.isDirty = true;
          pushHistory(state, state.project, 'Reihenfolge geändert');
        }),

        toggleSection: (sectionId) => set((state) => {
          if (!state.project) return;
          const section = state.project.sections.find(s => s.id === sectionId);
          if (section) {
            section.enabled = !section.enabled;
            state.isDirty = true;
            pushHistory(state, state.project, `${section.type} ${section.enabled ? 'aktiviert' : 'deaktiviert'}`);
          }
        }),

        duplicateSection: (sectionId) => set((state) => {
          if (!state.project) return;
          const index = state.project.sections.findIndex(s => s.id === sectionId);
          if (index !== -1) {
            const original = state.project.sections[index];
            const duplicate: Section = { ...deepClone(original), id: generateId() };
            state.project.sections.splice(index + 1, 0, duplicate);
            state.project.sections.forEach((s, i) => { s.order = i; });
            state.isDirty = true;
            state.selectedSectionId = duplicate.id;
            pushHistory(state, state.project, `${original.type} dupliziert`);
          }
        }),

        // =============================================================================
        // THEME ACTIONS
        // =============================================================================

        updateTheme: (updates: Partial<Theme>) => set((state: ProjectStore) => {
          if (!state.project) return;
          Object.assign(state.project.theme, updates);
          state.isDirty = true;
          pushHistory(state, state.project, 'Theme aktualisiert');
        }),

        updateThemeColor: (colorKey: keyof Theme['colors'], value: string) => set((state: ProjectStore) => {
          if (!state.project) return;
          state.project.theme.colors[colorKey] = value;
          state.isDirty = true;
          pushHistory(state, state.project, `Farbe ${colorKey}`);
        }),

        // =============================================================================
        // SELECTION ACTIONS
        // =============================================================================

        selectSection: (sectionId: string | null) => set((state: ProjectStore) => {
          state.selectedSectionId = sectionId;
        }),

        // =============================================================================
        // UI ACTIONS
        // =============================================================================

        setViewport: (viewport: Viewport) => set((state: ProjectStore) => { state.viewport = viewport; }),
        setSidebarTab: (tab: SidebarTab) => set((state: ProjectStore) => { state.sidebarTab = tab; }),
        setPreviewMode: (mode: boolean) => set((state: ProjectStore) => { state.previewMode = mode; }),

        // =============================================================================
        // HISTORY ACTIONS
        // =============================================================================

        undo: () => set((state: ProjectStore) => {
          if (state.historyIndex > 0) {
            state.historyIndex--;
            state.project = deepClone(state.history[state.historyIndex].state);
            state.isDirty = true;
          }
        }),

        redo: () => set((state: ProjectStore) => {
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            state.project = deepClone(state.history[state.historyIndex].state);
            state.isDirty = true;
          }
        }),

        canUndo: () => get().historyIndex > 0,
        canRedo: () => get().historyIndex < get().history.length - 1,
      })),
      {
        name: 'smooth-builder-project',
        partialize: (state: ProjectStore) => ({
          project: state.project,
          viewport: state.viewport,
        }),
      }
    ),
    { name: 'ProjectStore' }
  )
);
