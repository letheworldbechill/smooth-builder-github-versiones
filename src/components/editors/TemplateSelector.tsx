// =============================================================================
// SMOOTH BUILDER PRO - TEMPLATE SELECTOR
// Nach Krug: 3-5 Templates pro Branche, keine Überforderung
// =============================================================================

import React, { useState } from 'react';
import { Modal, Button } from '../ui';
import { templates, getTemplatesByIndustry } from '../../data/templates';
import { useProjectStore } from '../../store/projectStore';
import type { Template } from '../../types';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

// Branche-Icons und Namen
const industries = [
  { id: 'Finanzen', label: 'Treuhand & Finanzen', icon: '📊' },
  { id: 'Handwerk', label: 'Handwerk & Gewerbe', icon: '🔧' },
  { id: 'Beauty', label: 'Coiffeur & Beauty', icon: '✂️' },
  { id: 'Gesundheit', label: 'Arztpraxis & Medical', icon: '🏥' },
  { id: 'Gastronomie', label: 'Restaurant & Gastro', icon: '🍽️' },
  { id: 'Recht', label: 'Anwalt & Kanzlei', icon: '⚖️' },
  { id: 'Technologie', label: 'IT & Digital', icon: '💻' },
  { id: 'Sport', label: 'Fitness & Sport', icon: '🏋️' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { createProject } = useProjectStore();

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      createProject(selectedTemplate.id);
      onClose();
      // Reset state
      setSelectedIndustry(null);
      setSelectedTemplate(null);
    }
  };

  const handleBack = () => {
    if (selectedTemplate) {
      setSelectedTemplate(null);
    } else if (selectedIndustry) {
      setSelectedIndustry(null);
    }
  };

  // Step 1: Branche wählen (Krug: "First-click accuracy")
  const renderIndustrySelection = () => (
    <div>
      <p className="text-gray-600 mb-6">
        Wählen Sie Ihre Branche für passende Design-Vorschläge:
      </p>
      <div className="grid grid-cols-2 gap-3">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => setSelectedIndustry(industry.id)}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
          >
            <span className="text-2xl">{industry.icon}</span>
            <span className="font-medium text-gray-800">{industry.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Step 2: Template wählen (Krug: "3-5 templates per industry")
  const renderTemplateSelection = () => {
    const industryTemplates = selectedIndustry 
      ? getTemplatesByIndustry(selectedIndustry)
      : Object.values(templates);

    return (
      <div>
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Branchenauswahl
        </button>
        
        <p className="text-gray-600 mb-6">
          {industryTemplates.length} Template{industryTemplates.length !== 1 ? 's' : ''} verfügbar:
        </p>

        <div className="grid gap-4">
          {industryTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Color Preview */}
                <div className="flex flex-col gap-1">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: template.colorScheme.primary }}
                    title="Primärfarbe"
                  />
                  <div
                    className="w-8 h-4 rounded"
                    style={{ backgroundColor: template.colorScheme.accent }}
                    title="Akzentfarbe"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{template.sections.length} Sektionen</span>
                    <span>•</span>
                    <span style={{ fontFamily: template.fonts.heading }}>
                      {template.fonts.heading}
                    </span>
                  </div>
                </div>

                {/* Selection indicator */}
                {selectedTemplate?.id === template.id && (
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Bestätigung (Krug: "Endowed progress effect")
  const renderConfirmation = () => (
    <div className="text-center">
      <div
        className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl"
        style={{ backgroundColor: selectedTemplate!.colorScheme.primary + '20' }}
      >
        <span style={{ color: selectedTemplate!.colorScheme.primary }}>✓</span>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">
        {selectedTemplate!.name}
      </h3>
      <p className="text-gray-500 mb-6">
        {selectedTemplate!.description}
      </p>

      {/* Progress indicator (Krug: "Endowed progress") */}
      <div className="bg-gray-100 rounded-full p-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-600 font-medium">✓ Template gewählt</span>
          <span className="text-gray-400">→ Inhalte anpassen → Veröffentlichen</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={handleBack}>
          Anderes wählen
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Mit diesem Template starten
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        selectedTemplate
          ? 'Template bestätigen'
          : selectedIndustry
          ? 'Template wählen'
          : 'Branche wählen'
      }
      size={selectedTemplate ? 'md' : 'lg'}
    >
      {selectedTemplate
        ? renderConfirmation()
        : selectedIndustry
        ? renderTemplateSelection()
        : renderIndustrySelection()
      }
    </Modal>
  );
};

export default TemplateSelector;
