// =============================================================================
// SMOOTH BUILDER PRO - EXPORT MODAL
// =============================================================================

import React, { useState } from 'react';
import { Modal, Button } from '../ui';
import { useProjectStore } from '../../store/projectStore';
import { exportToZip, exportToHTML } from '../../services/exportService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { project } = useProjectStore();
  const [exporting, setExporting] = useState(false);
  const [exportType, setExportType] = useState<'zip' | 'html'>('zip');

  if (!project) return null;

  const handleExport = async () => {
    setExporting(true);
    try {
      if (exportType === 'zip') {
        await exportToZip(project);
      } else {
        await exportToHTML(project);
      }
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
    setExporting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Website exportieren" size="md">
      <div className="space-y-6">
        {/* Export-Optionen */}
        <div className="space-y-3">
          <label
            className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              exportType === 'zip'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="exportType"
              value="zip"
              checked={exportType === 'zip'}
              onChange={() => setExportType('zip')}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-800">ZIP-Datei</div>
              <div className="text-sm text-gray-500">
                Alle Dateien separat: index.html, styles.css, main.js, README.md
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">index.html</span>
                <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">styles.css</span>
                <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">main.js</span>
                <span className="px-2 py-0.5 bg-gray-100 text-xs rounded">README.md</span>
              </div>
            </div>
          </label>

          <label
            className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              exportType === 'html'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="exportType"
              value="html"
              checked={exportType === 'html'}
              onChange={() => setExportType('html')}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-800">Einzelne HTML-Datei</div>
              <div className="text-sm text-gray-500">
                Alles in einer Datei mit eingebettetem CSS und JavaScript
              </div>
            </div>
          </label>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Enthält:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Vollständig responsives Design</li>
            <li>✓ SEO-optimierter HTML-Code</li>
            <li>✓ Keine externen Abhängigkeiten</li>
            <li>✓ Bereit für jeden Hosting-Anbieter</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={handleExport} disabled={exporting}>
            {exporting ? (
              <>
                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exportiere...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportieren
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
