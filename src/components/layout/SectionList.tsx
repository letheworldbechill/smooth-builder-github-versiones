// =============================================================================
// SMOOTH BUILDER PRO - SECTION LIST
// Nach Krug: "4-6 essential components visibly" + Search at 15+ items
// =============================================================================

import React, { useState } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { AddSectionModal } from '../editors/AddSectionModal';
import type { Section, SectionType } from '../../types';

interface SectionListProps {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

// Section-Metadaten (Krug: "Text labels for all icons")
const sectionMeta: Record<SectionType, { icon: string; label: string; description: string }> = {
  header: { icon: '🔝', label: 'Navigation', description: 'Logo und Menü' },
  hero: { icon: '🎯', label: 'Hero', description: 'Hauptbereich mit CTA' },
  trustBar: { icon: '⭐', label: 'Vertrauen', description: 'Zahlen und Fakten' },
  services: { icon: '🛠️', label: 'Leistungen', description: 'Ihre Angebote' },
  about: { icon: '👤', label: 'Über uns', description: 'Ihre Geschichte' },
  team: { icon: '👥', label: 'Team', description: 'Teammitglieder' },
  testimonials: { icon: '💬', label: 'Referenzen', description: 'Kundenstimmen' },
  faq: { icon: '❓', label: 'FAQ', description: 'Häufige Fragen' },
  contact: { icon: '📧', label: 'Kontakt', description: 'Kontaktdaten' },
  cta: { icon: '🚀', label: 'CTA', description: 'Call-to-Action' },
  stickyCta: { icon: '📌', label: 'Sticky CTA', description: 'Fester Button' },
  footer: { icon: '📋', label: 'Footer', description: 'Fusszeile' },
  cookieBanner: { icon: '🍪', label: 'Cookies', description: 'Cookie-Hinweis' },
};

export const SectionList: React.FC<SectionListProps> = ({
  sections,
  selectedId,
  onSelect,
}) => {
  const { toggleSection, removeSection, duplicateSection } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Krug: "Search becomes essential at 15+ items"
  const showSearch = sections.length >= 10;

  const filteredSections = searchTerm
    ? sections.filter(s => {
        const meta = sectionMeta[s.type];
        return (
          meta.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meta.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : sections;

  return (
    <div className="flex flex-col h-full">
      {/* Search (Krug: Optional at 10+, mandatory at 15+) */}
      {showSearch && (
        <div className="p-3 border-b">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sektion suchen..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Section List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredSections
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const meta = sectionMeta[section.type] || {
              icon: '📦',
              label: section.type,
              description: '',
            };

            return (
              <div
                key={section.id}
                onClick={() => onSelect(section.id)}
                className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                  selectedId === section.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                } ${!section.enabled ? 'opacity-50' : ''}`}
              >
                {/* Drag Handle */}
                <div className="text-gray-300 cursor-grab">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 6h2v2H8V6zm6 0h2v2h-2V6zM8 11h2v2H8v-2zm6 0h2v2h-2v-2zm-6 5h2v2H8v-2zm6 0h2v2h-2v-2z" />
                  </svg>
                </div>

                {/* Icon */}
                <span className="text-lg">{meta.icon}</span>

                {/* Label + Description (Krug: "Text labels") */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-800">
                    {meta.label}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {meta.description}
                  </div>
                </div>

                {/* Toggle (Enable/Disable) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors ${
                    section.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      section.enabled ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>

                {/* Actions (on hover) */}
                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateSection(section.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    title="Duplizieren"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Sektion wirklich löschen?')) {
                        removeSection(section.id);
                      }
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                    title="Löschen"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Add Section Button */}
      <div className="p-3 border-t">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Sektion hinzufügen
        </button>
      </div>

      {/* Add Section Modal */}
      <AddSectionModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default SectionList;
