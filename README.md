# Smooth Builder Pro v5.0

> No-Code Website Builder für Schweizer KMU – Professionelle Websites in unter 20 Minuten

## 🚀 Features

### Editor
- **3-Panel Layout** (Krug Trunk Test): Sidebar, Canvas, Property Panel
- **Drag & Drop** Sections mit @dnd-kit
- **200-Step Undo/Redo** History
- **Live Preview** mit Desktop/Tablet/Mobile Ansichten
- **Autosave** mit LocalStorage Persistenz

### Templates
- **8 Branchen-Templates** für Schweizer KMU:
  - 📊 Treuhand & Finanzen
  - 🔧 Handwerker & Gewerbe
  - ✂️ Coiffeur & Beauty
  - 🏥 Arztpraxis & Medical
  - 🍽️ Restaurant & Gastro
  - ⚖️ Anwalt & Kanzlei
  - 💻 IT & Digital
  - 🏋️ Fitness & Sport

### Sektionen
- Header, Hero, Trust Bar, Services, About, Team
- Testimonials, FAQ, Contact, CTA, Footer, Cookie Banner

### Export
- **ZIP Export**: Separate HTML/CSS/JS Dateien
- **HTML Export**: Single-File mit embedded Styles
- **PWA Ready**: Service Worker + Manifest

### Internationalisierung
- 🇩🇪 Deutsch
- 🇬🇧 English
- 🇫🇷 Français
- 🇪🇸 Español
- 🇵🇹 Português
- 🇮🇩 Bahasa Indonesia
- 🇸🇦 العربية

## 📦 Tech Stack

| Kategorie | Technologie |
|-----------|-------------|
| Framework | React 18 + TypeScript |
| State | Zustand + Immer |
| Styling | Tailwind CSS |
| Build | Vite 6 |
| Drag & Drop | @dnd-kit |
| i18n | i18next + react-i18next |
| Icons | Lucide React |
| Export | JSZip |

## 🛠️ Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Build Preview
npm run preview
```

## 📁 Projekt-Struktur

```
src/
├── components/
│   ├── ui/              # Button, Input, Modal, Badge, etc.
│   ├── layout/          # EditorLayout, SectionList
│   └── editors/         # PropertyPanel, ThemePanel, ExportModal
├── store/               # Zustand Store (200 Undo Steps)
├── services/            # Export Service (ZIP/HTML)
├── data/                # 8 Branchen-Templates
├── types/               # TypeScript Interfaces
├── hooks/               # Custom Hooks (useDebounce, etc.)
├── utils/               # Helper Functions
├── i18n/                # 7 Sprachen
└── styles/              # Tailwind CSS
```

## 🎯 Krug Usability Compliance

| Prinzip | Status | Implementierung |
|---------|--------|-----------------|
| Trunk Test | ✅ | 3-Panel Layout |
| First-Click Accuracy | ✅ | Branche → Template in 2 Schritten |
| Progressive Disclosure | ✅ | Collapsible Panels |
| Visible Safety Nets | ✅ | Undo/Redo + Autosave |
| Text Labels | ✅ | Icon + Label + Description |
| Search at 15+ items | ✅ | Search ab 10 Sektionen |

## ⌨️ Keyboard Shortcuts

| Shortcut | Aktion |
|----------|--------|
| `⌘/Ctrl + Z` | Rückgängig |
| `⌘/Ctrl + Shift + Z` | Wiederholen |
| `⌘/Ctrl + S` | Speichern |

## 📊 Performance

| Metrik | Wert |
|--------|------|
| Dev Server Start | < 300ms |
| Production Build | ~3s |
| JS Bundle (gzip) | ~92 KB |
| CSS Bundle (gzip) | ~5 KB |
| Total (gzip) | ~127 KB |

## 🔧 Konfiguration

### Tailwind

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 📝 Changelog

### v5.0.0 (2025-01-20)
- ✅ Unified codebase from 4 versions
- ✅ Added @dnd-kit for drag & drop
- ✅ Added 7 language support
- ✅ Added PWA support
- ✅ Added Accessibility Panel
- ✅ Performance optimizations
- ✅ Full TypeScript strict mode

### v4.4.0
- Initial modular architecture
- 8 industry templates
- Export to ZIP/HTML

## 📄 Lizenz

MIT © 2025 gasserwerk.ch

---

**Erstellt mit ❤️ für Schweizer KMU**
