// =============================================================================
// SMOOTH BUILDER PRO - PROPERTY PANEL
// Progressive Disclosure nach Krug: 3-4 wichtigste Felder zuerst
// =============================================================================

import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { TextInput, TextArea, Select, ColorInput, Collapsible } from '../ui';
import type { Section, SectionType } from '../../types';

interface PropertyPanelProps {
  sectionId: string;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ sectionId }) => {
  const { project, updateSectionContent, selectSection } = useProjectStore();
  const section = project?.sections.find(s => s.id === sectionId);

  if (!section) return null;

  const sectionLabels: Record<SectionType, string> = {
    header: 'Navigation',
    hero: 'Hero-Bereich',
    trustBar: 'Vertrauensleiste',
    services: 'Leistungen',
    about: 'Über uns',
    team: 'Team',
    testimonials: 'Kundenstimmen',
    faq: 'FAQ',
    contact: 'Kontakt',
    cta: 'Call-to-Action',
    stickyCta: 'Sticky CTA',
    footer: 'Footer',
    cookieBanner: 'Cookie-Banner',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header mit Breadcrumb (Krug: "Where am I?") */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div>
          <button 
            onClick={() => selectSection(null)}
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Alle Sektionen
          </button>
          <h3 className="font-semibold text-lg">
            {sectionLabels[section.type]}
          </h3>
        </div>
        <button
          onClick={() => selectSection(null)}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content - Progressive Disclosure */}
      <div className="flex-1 overflow-y-auto">
        {/* Primäre Felder (Krug: "3-4 most commonly adjusted") */}
        <Collapsible title="Inhalt" defaultOpen={true}>
          <div className="space-y-4">
            <SectionFields section={section} onUpdate={updateSectionContent} />
          </div>
        </Collapsible>

        {/* Sekundäre Felder */}
        <Collapsible title="Darstellung" defaultOpen={false}>
          <div className="space-y-4">
            <ColorInput
              label="Hintergrundfarbe"
              value={section.settings.backgroundColor || '#ffffff'}
              onChange={(v) => updateSectionContent(sectionId, 'settings.backgroundColor', v)}
            />
            <ColorInput
              label="Textfarbe"
              value={section.settings.textColor || '#1f2937'}
              onChange={(v) => updateSectionContent(sectionId, 'settings.textColor', v)}
            />
          </div>
        </Collapsible>

        {/* Erweiterte Felder (Krug: "Hide behind expansion") */}
        <Collapsible title="Erweitert" defaultOpen={false}>
          <div className="space-y-4">
            <Select
              label="Abstand oben"
              value={section.settings.paddingTop || 'md'}
              onChange={(v) => updateSectionContent(sectionId, 'settings.paddingTop', v)}
              options={[
                { value: 'none', label: 'Keiner' },
                { value: 'sm', label: 'Klein' },
                { value: 'md', label: 'Mittel' },
                { value: 'lg', label: 'Gross' },
                { value: 'xl', label: 'Extra gross' },
              ]}
            />
            <Select
              label="Abstand unten"
              value={section.settings.paddingBottom || 'md'}
              onChange={(v) => updateSectionContent(sectionId, 'settings.paddingBottom', v)}
              options={[
                { value: 'none', label: 'Keiner' },
                { value: 'sm', label: 'Klein' },
                { value: 'md', label: 'Mittel' },
                { value: 'lg', label: 'Gross' },
                { value: 'xl', label: 'Extra gross' },
              ]}
            />
          </div>
        </Collapsible>
      </div>
    </div>
  );
};

// =============================================================================
// SECTION-SPECIFIC FIELDS
// Nach Krug: Nur 3-4 wichtigste Felder pro Section
// =============================================================================

interface SectionFieldsProps {
  section: Section;
  onUpdate: (sectionId: string, path: string, value: unknown) => void;
}

const SectionFields: React.FC<SectionFieldsProps> = ({ section, onUpdate }) => {
  const update = (path: string, value: unknown) => onUpdate(section.id, path, value);
  const content = section.content as Record<string, unknown>;

  switch (section.type) {
    case 'hero':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <TextArea
            label="Beschreibung"
            value={(content.subline as string) || ''}
            onChange={(v) => update('subline', v)}
          />
          <TextInput
            label="Primärer Button"
            value={((content.primaryCta as Record<string, string>)?.label) || ''}
            onChange={(v) => update('primaryCta.label', v)}
          />
          <TextInput
            label="Sekundärer Button"
            value={((content.secondaryCta as Record<string, string>)?.label) || ''}
            onChange={(v) => update('secondaryCta.label', v)}
          />
        </>
      );

    case 'services':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <TextArea
            label="Beschreibung"
            value={(content.subline as string) || ''}
            onChange={(v) => update('subline', v)}
          />
          {/* Array-Items werden in erweitertem Panel bearbeitet */}
          <p className="text-xs text-gray-500 mt-2">
            {((content.items as unknown[]) || []).length} Leistungen definiert
          </p>
        </>
      );

    case 'contact':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <TextInput
            label="E-Mail"
            value={(content.email as string) || ''}
            onChange={(v) => update('email', v)}
            type="email"
          />
          <TextInput
            label="Telefon"
            value={(content.phone as string) || ''}
            onChange={(v) => update('phone', v)}
            type="tel"
          />
          <TextArea
            label="Adresse"
            value={(content.address as string) || ''}
            onChange={(v) => update('address', v)}
            rows={3}
          />
        </>
      );

    case 'about':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <TextArea
            label="Text"
            value={(content.text as string) || ''}
            onChange={(v) => update('text', v)}
            rows={5}
          />
          <TextInput
            label="Bild-URL"
            value={(content.image as string) || ''}
            onChange={(v) => update('image', v)}
            type="url"
          />
          <Select
            label="Layout"
            value={(content.layout as string) || 'image-right'}
            onChange={(v) => update('layout', v)}
            options={[
              { value: 'image-left', label: 'Bild links' },
              { value: 'image-right', label: 'Bild rechts' },
              { value: 'image-center', label: 'Bild oben' },
            ]}
          />
        </>
      );

    case 'faq':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <p className="text-xs text-gray-500 mt-2">
            {((content.items as unknown[]) || []).length} Fragen definiert
          </p>
        </>
      );

    case 'header':
      return (
        <>
          <TextInput
            label="Logo-Text"
            value={(content.logoText as string) || ''}
            onChange={(v) => update('logoText', v)}
          />
          <TextInput
            label="CTA-Button"
            value={((content.cta as Record<string, string>)?.label) || ''}
            onChange={(v) => update('cta.label', v)}
          />
        </>
      );

    case 'footer':
      return (
        <>
          <TextInput
            label="Firmenname"
            value={(content.companyName as string) || ''}
            onChange={(v) => update('companyName', v)}
          />
          <TextArea
            label="Beschreibung"
            value={(content.description as string) || ''}
            onChange={(v) => update('description', v)}
          />
          <TextInput
            label="Copyright"
            value={(content.copyright as string) || ''}
            onChange={(v) => update('copyright', v)}
          />
        </>
      );

    case 'cta':
      return (
        <>
          <TextInput
            label="Überschrift"
            value={(content.headline as string) || ''}
            onChange={(v) => update('headline', v)}
          />
          <TextArea
            label="Beschreibung"
            value={(content.subline as string) || ''}
            onChange={(v) => update('subline', v)}
          />
          <TextInput
            label="Button-Text"
            value={((content.button as Record<string, string>)?.label) || ''}
            onChange={(v) => update('button.label', v)}
          />
        </>
      );

    default:
      // Generische Felder für unbekannte Section-Typen
      return (
        <>
          {content.headline !== undefined && (
            <TextInput
              label="Überschrift"
              value={(content.headline as string) || ''}
              onChange={(v) => update('headline', v)}
            />
          )}
          {content.subline !== undefined && (
            <TextArea
              label="Beschreibung"
              value={(content.subline as string) || ''}
              onChange={(v) => update('subline', v)}
            />
          )}
          {content.text !== undefined && (
            <TextArea
              label="Text"
              value={(content.text as string) || ''}
              onChange={(v) => update('text', v)}
              rows={5}
            />
          )}
        </>
      );
  }
};

export default PropertyPanel;
