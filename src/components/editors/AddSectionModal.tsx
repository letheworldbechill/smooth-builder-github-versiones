// =============================================================================
// SMOOTH BUILDER PRO - ADD SECTION MODAL
// Nach Krug: "4-6 essential components visibly"
// =============================================================================

import React, { useState } from 'react';
import { Modal, Button } from '../ui';
import { useProjectStore } from '../../store/projectStore';
import type { SectionType } from '../../types';

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  afterIndex?: number;
}

// Kategorisierte Sektionen (Krug: "Functional grouping")
const sectionCategories = [
  {
    name: 'Essentiell',
    description: 'Die wichtigsten Bausteine',
    sections: [
      { type: 'hero' as SectionType, icon: '🎯', label: 'Hero', description: 'Hauptbereich mit Headline und CTA' },
      { type: 'services' as SectionType, icon: '🛠️', label: 'Leistungen', description: 'Ihre Angebote präsentieren' },
      { type: 'contact' as SectionType, icon: '📧', label: 'Kontakt', description: 'Kontaktdaten und Formular' },
      { type: 'cta' as SectionType, icon: '🚀', label: 'Call-to-Action', description: 'Handlungsaufforderung' },
    ],
  },
  {
    name: 'Vertrauen',
    description: 'Glaubwürdigkeit aufbauen',
    sections: [
      { type: 'trustBar' as SectionType, icon: '⭐', label: 'Zahlen & Fakten', description: 'Statistiken anzeigen' },
      { type: 'testimonials' as SectionType, icon: '💬', label: 'Kundenstimmen', description: 'Referenzen und Zitate' },
      { type: 'team' as SectionType, icon: '👥', label: 'Team', description: 'Teammitglieder vorstellen' },
    ],
  },
  {
    name: 'Information',
    description: 'Inhalte vermitteln',
    sections: [
      { type: 'about' as SectionType, icon: '👤', label: 'Über uns', description: 'Ihre Geschichte erzählen' },
      { type: 'faq' as SectionType, icon: '❓', label: 'FAQ', description: 'Häufige Fragen beantworten' },
    ],
  },
  {
    name: 'Navigation',
    description: 'Struktur und Orientierung',
    sections: [
      { type: 'header' as SectionType, icon: '🔝', label: 'Navigation', description: 'Logo und Menü' },
      { type: 'footer' as SectionType, icon: '📋', label: 'Footer', description: 'Fusszeile mit Links' },
      { type: 'stickyCta' as SectionType, icon: '📌', label: 'Sticky CTA', description: 'Fester Button beim Scrollen' },
      { type: 'cookieBanner' as SectionType, icon: '🍪', label: 'Cookie-Banner', description: 'DSGVO-konformer Hinweis' },
    ],
  },
];

export const AddSectionModal: React.FC<AddSectionModalProps> = ({
  isOpen,
  onClose,
  afterIndex,
}) => {
  const { addSection } = useProjectStore();
  const [selectedType, setSelectedType] = useState<SectionType | null>(null);

  const handleAdd = () => {
    if (selectedType) {
      addSection(selectedType, afterIndex);
      onClose();
      setSelectedType(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sektion hinzufügen" size="lg">
      <div className="space-y-6">
        {sectionCategories.map((category) => (
          <div key={category.name}>
            <h3 className="font-medium text-gray-800 mb-1">{category.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{category.description}</p>
            
            <div className="grid grid-cols-2 gap-2">
              {category.sections.map((section) => (
                <button
                  key={section.type}
                  onClick={() => setSelectedType(section.type)}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                    selectedType === section.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-800">
                      {section.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {section.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Abbrechen
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAdd}
            disabled={!selectedType}
          >
            Sektion hinzufügen
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSectionModal;
