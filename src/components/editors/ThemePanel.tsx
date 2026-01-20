// =============================================================================
// SMOOTH BUILDER PRO - THEME PANEL
// Nach Krug: "6-10 curated palette themes" statt unlimited custom
// =============================================================================

import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { ColorInput, Select, Collapsible } from '../ui';

// Kuratierte Farbpaletten (Krug: "Smart defaults")
const colorPalettes = [
  { name: 'Professionell', primary: '#1e3a5f', accent: '#c9a227' },
  { name: 'Modern', primary: '#4f46e5', accent: '#10b981' },
  { name: 'Warm', primary: '#78350f', accent: '#f59e0b' },
  { name: 'Frisch', primary: '#059669', accent: '#fbbf24' },
  { name: 'Elegant', primary: '#be185d', accent: '#fbbf24' },
  { name: 'Medizin', primary: '#0891b2', accent: '#10b981' },
  { name: 'Klassisch', primary: '#1f2937', accent: '#dc2626' },
  { name: 'Kreativ', primary: '#7c3aed', accent: '#f97316' },
];

// Schriftarten
const fontOptions = [
  { value: 'Inter', label: 'Inter (Modern)' },
  { value: 'Playfair Display', label: 'Playfair (Elegant)' },
  { value: 'Roboto', label: 'Roboto (Neutral)' },
  { value: 'Open Sans', label: 'Open Sans (Freundlich)' },
  { value: 'Montserrat', label: 'Montserrat (Stark)' },
];

export const ThemePanel: React.FC = () => {
  const { project, updateThemeColor, updateTheme } = useProjectStore();

  if (!project) return null;

  const { colors, fonts } = project.theme;

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    updateThemeColor('primary', palette.primary);
    updateThemeColor('accent', palette.accent);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Farbpaletten (Krug: "Show presets first") */}
      <Collapsible title="Farbpalette wählen" defaultOpen={true}>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {colorPalettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => applyPalette(palette)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                colors.primary === palette.primary
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              title={palette.name}
            >
              <div
                className="h-2/3"
                style={{ backgroundColor: palette.primary }}
              />
              <div
                className="h-1/3"
                style={{ backgroundColor: palette.accent }}
              />
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          Klicken Sie auf eine Palette, um sie anzuwenden
        </p>
      </Collapsible>

      {/* Individuelle Farben (Krug: "Hide behind expansion") */}
      <Collapsible title="Farben anpassen" defaultOpen={false}>
        <div className="space-y-4">
          <ColorInput
            label="Primärfarbe"
            value={colors.primary}
            onChange={(v) => updateThemeColor('primary', v)}
          />
          <ColorInput
            label="Sekundärfarbe"
            value={colors.secondary}
            onChange={(v) => updateThemeColor('secondary', v)}
          />
          <ColorInput
            label="Akzentfarbe"
            value={colors.accent}
            onChange={(v) => updateThemeColor('accent', v)}
          />
          <ColorInput
            label="Hintergrund"
            value={colors.background}
            onChange={(v) => updateThemeColor('background', v)}
          />
          <ColorInput
            label="Textfarbe"
            value={colors.text}
            onChange={(v) => updateThemeColor('text', v)}
          />
        </div>
      </Collapsible>

      {/* Schriftarten */}
      <Collapsible title="Schriftarten" defaultOpen={false}>
        <div className="space-y-4">
          <Select
            label="Überschriften"
            value={fonts.heading}
            onChange={(v) => updateTheme({ fonts: { ...fonts, heading: v } })}
            options={fontOptions}
          />
          <Select
            label="Fliesstext"
            value={fonts.body}
            onChange={(v) => updateTheme({ fonts: { ...fonts, body: v } })}
            options={fontOptions}
          />
        </div>
      </Collapsible>

      {/* Border Radius */}
      <Collapsible title="Ecken-Stil" defaultOpen={false}>
        <div className="grid grid-cols-5 gap-2">
          {['none', 'sm', 'md', 'lg', 'xl'].map((radius) => (
            <button
              key={radius}
              onClick={() => updateTheme({ borderRadius: radius as any })}
              className={`p-3 border-2 rounded transition-all ${
                project.theme.borderRadius === radius
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div
                className="w-full aspect-square bg-gray-300"
                style={{
                  borderRadius:
                    radius === 'none' ? '0' :
                    radius === 'sm' ? '4px' :
                    radius === 'md' ? '8px' :
                    radius === 'lg' ? '12px' : '16px',
                }}
              />
              <span className="text-xs text-gray-500 mt-1 block">
                {radius === 'none' ? 'Eckig' :
                 radius === 'sm' ? 'Klein' :
                 radius === 'md' ? 'Mittel' :
                 radius === 'lg' ? 'Gross' : 'Rund'}
              </span>
            </button>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};

export default ThemePanel;
