// =============================================================================
// SMOOTH BUILDER PRO - EDITOR LAYOUT
// 3-Panel Layout nach Krug's Trunk Test
// =============================================================================

import React, { useState, useEffect } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { SectionList } from './SectionList';
import { PropertyPanel } from '../editors/PropertyPanel';
import { ThemePanel } from '../editors/ThemePanel';
import { TemplateSelector } from '../editors/TemplateSelector';
import { ExportModal } from '../editors/ExportModal';
import { Button, IconButton, Badge } from '../ui';
import type { SidebarTab, Viewport } from '../../types';

export const EditorLayout: React.FC = () => {
  const {
    project,
    isDirty,
    viewport,
    setViewport,
    sidebarTab,
    setSidebarTab,
    selectedSectionId,
    selectSection,
    previewMode,
    setPreviewMode,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useProjectStore();

  const [showTemplates, setShowTemplates] = useState(!project);
  const [showExport, setShowExport] = useState(false);

  // Keyboard shortcuts (Krug: "Visible safety nets")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        // Auto-save indicator flash
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Kein Projekt = Template-Auswahl zeigen
  if (!project) {
    return (
      <>
        <div className="h-screen flex items-center justify-center bg-bg">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-brand-soft rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">
              Smooth Builder Pro
            </h1>
            <p className="text-text-soft mb-6">
              Erstellen Sie Ihre professionelle Website in unter 20 Minuten.
            </p>
            <Button variant="primary" size="lg" onClick={() => setShowTemplates(true)}>
              Template wählen & starten
            </Button>
          </div>
        </div>
        <TemplateSelector isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
      </>
    );
  }

  const viewportClasses: Record<Viewport, string> = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  };

  return (
    <div className="h-screen flex flex-col bg-bg">
      {/* ============================================= */}
      {/* TOP TOOLBAR                                  */}
      {/* Krug: "What are my options here?"            */}
      {/* ============================================= */}
      <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-4 shadow-soft flex-shrink-0">
        {/* Left: Project name + status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚡</span>
          </div>
          <div>
            <h1 className="font-semibold text-text leading-tight">{project.name}</h1>
            <div className="flex items-center gap-2">
              {isDirty ? (
                <Badge variant="warning">Ungespeichert</Badge>
              ) : (
                <Badge variant="success">Gespeichert</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Center: Undo/Redo + Viewport */}
        <div className="flex items-center gap-1">
          {/* Undo/Redo (Krug: "Visible safety nets") */}
          <IconButton onClick={undo} disabled={!canUndo()} title="Rückgängig (⌘Z)">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </IconButton>
          <IconButton onClick={redo} disabled={!canRedo()} title="Wiederholen (⌘⇧Z)">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </IconButton>

          <div className="w-px h-6 bg-bg mx-2" />

          {/* Viewport Switcher */}
          <IconButton onClick={() => setViewport('desktop')} active={viewport === 'desktop'} title="Desktop">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
              <path strokeWidth={2} d="M8 21h8M12 17v4" />
            </svg>
          </IconButton>
          <IconButton onClick={() => setViewport('tablet')} active={viewport === 'tablet'} title="Tablet">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={2} />
            </svg>
          </IconButton>
          <IconButton onClick={() => setViewport('mobile')} active={viewport === 'mobile'} title="Mobile">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="2" width="12" height="20" rx="2" strokeWidth={2} />
            </svg>
          </IconButton>

          <div className="w-px h-6 bg-bg mx-2" />

          {/* Preview Mode */}
          <IconButton 
            onClick={() => setPreviewMode(!previewMode)} 
            active={previewMode}
            title="Vorschau"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </IconButton>
        </div>

        {/* Right: Export */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setShowTemplates(true)}>
            Templates
          </Button>
          <Button variant="primary" onClick={() => setShowExport(true)}>
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportieren
          </Button>
        </div>
      </header>

      {/* ============================================= */}
      {/* MAIN CONTENT                                 */}
      {/* ============================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ------------------------------------------- */}
        {/* LEFT SIDEBAR                               */}
        {/* Krug: "4-6 essential components visibly"   */}
        {/* ------------------------------------------- */}
        {!previewMode && (
          <aside className="w-72 bg-surface border-r border-border flex flex-col flex-shrink-0">
            {/* Sidebar Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setSidebarTab('sections')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                  sidebarTab === 'sections'
                    ? 'text-brand border-b-2 border-blue-600'
                    : 'text-text-soft hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Sektionen
              </button>
              <button
                onClick={() => setSidebarTab('theme')}
                className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                  sidebarTab === 'theme'
                    ? 'text-brand border-b-2 border-blue-600'
                    : 'text-text-soft hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Design
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              {sidebarTab === 'sections' && (
                <SectionList
                  sections={project.sections}
                  selectedId={selectedSectionId}
                  onSelect={selectSection}
                />
              )}
              {sidebarTab === 'theme' && <ThemePanel />}
            </div>
          </aside>
        )}

        {/* ------------------------------------------- */}
        {/* CANVAS (Live Preview)                      */}
        {/* ------------------------------------------- */}
        <main className="flex-1 overflow-auto bg-bg p-6">
          <div
            className={`mx-auto bg-surface border border-border min-h-full shadow-premium transition-all rounded-lg ${viewportClasses[viewport]}`}
            style={{
              '--color-primary': project.theme.colors.primary,
              '--color-secondary': project.theme.colors.secondary,
              '--color-accent': project.theme.colors.accent,
              '--color-background': project.theme.colors.background,
              '--color-text': project.theme.colors.text,
            } as React.CSSProperties}
          >
            {/* Section Rendering */}
            {project.sections
              .filter(s => s.enabled)
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div
                  key={section.id}
                  onClick={() => !previewMode && selectSection(section.id)}
                  className={`relative ${
                    !previewMode && selectedSectionId === section.id
                      ? 'ring-2 ring-brand ring-offset-2'
                      : !previewMode ? 'hover:ring-1 hover:ring-brand cursor-pointer' : ''
                  }`}
                >
                  <SectionPreview section={section} />
                </div>
              ))}
          </div>
        </main>

        {/* ------------------------------------------- */}
        {/* RIGHT SIDEBAR (Property Panel)             */}
        {/* Krug: "Progressive disclosure"             */}
        {/* ------------------------------------------- */}
        {!previewMode && selectedSectionId && (
          <aside className="w-80 bg-surface border-l border-border flex-shrink-0 overflow-hidden">
            <PropertyPanel sectionId={selectedSectionId} />
          </aside>
        )}
      </div>

      {/* Modals */}
      <TemplateSelector isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
};

// =============================================================================
// SECTION PREVIEW (Inline-Komponente)
// =============================================================================

const SectionPreview: React.FC<{ section: any }> = ({ section }) => {
  const content = section.content || {};

  // Einfache Preview-Darstellung
  const styles = {
    padding: '2rem',
    backgroundColor: section.settings?.backgroundColor || '#ffffff',
    color: section.settings?.textColor || '#1f2937',
  };

  switch (section.type) {
    case 'hero':
      return (
        <div style={styles} className="text-center py-16">
          <h1 className="text-4xl font-bold mb-4">{content.headline || 'Headline'}</h1>
          <p className="text-xl text-text-soft mb-8">{content.subline || 'Subline'}</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-brand text-white rounded-lg">
              {content.primaryCta?.label || 'Primary CTA'}
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg">
              {content.secondaryCta?.label || 'Secondary CTA'}
            </button>
          </div>
        </div>
      );

    case 'header':
      return (
        <div style={styles} className="flex items-center justify-between py-4 px-6 border-b">
          <span className="font-bold text-xl">{content.logoText || 'Logo'}</span>
          <nav className="flex gap-6">
            {(content.navigation || []).map((item: any, i: number) => (
              <span key={i} className="text-text-soft hover:text-gray-900">{item.label}</span>
            ))}
          </nav>
          <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm">
            {content.cta?.label || 'CTA'}
          </button>
        </div>
      );

    case 'services':
      return (
        <div style={styles} className="py-16">
          <h2 className="text-3xl font-bold text-center mb-4">{content.headline || 'Services'}</h2>
          <p className="text-center text-text-soft mb-12">{content.subline || ''}</p>
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            {(content.items || []).slice(0, 3).map((item: any, i: number) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-4">{item.icon || '📦'}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div style={styles} className="py-16">
          <h2 className="text-3xl font-bold text-center mb-8">{content.headline || 'Kontakt'}</h2>
          <div className="max-w-md mx-auto text-center">
            <p className="mb-2">{content.email}</p>
            <p className="mb-2">{content.phone}</p>
            <p className="whitespace-pre-line">{content.address}</p>
          </div>
        </div>
      );

    case 'footer':
      return (
        <div style={{ ...styles, backgroundColor: '#1f2937', color: 'white' }} className="py-8">
          <div className="text-center">
            <p className="font-bold mb-2">{content.companyName || 'Company'}</p>
            <p className="text-text-muted text-sm">{content.copyright}</p>
          </div>
        </div>
      );

    default:
      return (
        <div style={styles} className="py-12 text-center">
          <span className="text-text-muted">{section.type} Section</span>
        </div>
      );
  }
};

export default EditorLayout;
