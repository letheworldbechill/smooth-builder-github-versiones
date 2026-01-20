// =============================================================================
// SMOOTH BUILDER PRO - TEMPLATES
// 8 Branchen-Templates für Schweizer KMU
// =============================================================================

import type { Template, SectionType, ThemeColors, ThemeFonts } from '../types';

// =============================================================================
// TEMPLATE DEFINITIONS
// =============================================================================

export const templates: Record<string, Template> = {
  // ---------------------------------------------------------------------------
  // TREUHAND
  // ---------------------------------------------------------------------------
  treuhand: {
    id: 'treuhand',
    name: 'Treuhand & Buchhaltung',
    description: 'Professionelles Design für Treuhänder und Buchhalter',
    industry: 'Finanzen',
    colorScheme: {
      primary: '#1e3a5f',
      secondary: '#2d5a87',
      accent: '#c9a227',
      background: '#f8f9fa',
      text: '#1a1a2e',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Muster Treuhand',
          navigation: [
            { label: 'Leistungen', href: '#services' },
            { label: 'Über uns', href: '#about' },
            { label: 'Kontakt', href: '#contact' },
          ],
          cta: { label: 'Beratung anfragen', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Ihr Partner für Treuhand & Finanzen',
          subline: 'Professionelle Buchhaltung, Steuererklärungen und Unternehmensberatung in Ihrer Region.',
          primaryCta: { label: 'Kostenlose Erstberatung', href: '#contact' },
          secondaryCta: { label: 'Leistungen entdecken', href: '#services' },
        },
      },
      {
        type: 'trustBar',
        content: {
          items: [
            { value: '25+', label: 'Jahre Erfahrung' },
            { value: '500+', label: 'Mandanten' },
            { value: '100%', label: 'Diskretion' },
          ],
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unsere Leistungen',
          subline: 'Massgeschneiderte Lösungen für Ihr Unternehmen',
          items: [
            { icon: '📊', title: 'Buchhaltung', description: 'Professionelle Führung Ihrer Geschäftsbücher' },
            { icon: '📋', title: 'Steuern', description: 'Optimierte Steuererklärungen für Privat und Geschäft' },
            { icon: '💼', title: 'Beratung', description: 'Strategische Unternehmensberatung' },
            { icon: '📈', title: 'Revision', description: 'Ordentliche und eingeschränkte Revisionen' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Kontaktieren Sie uns',
          email: 'info@muster-treuhand.ch',
          phone: '+41 44 123 45 67',
          address: 'Bahnhofstrasse 10\n8001 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Muster Treuhand AG',
          description: 'Ihr kompetenter Partner für Treuhand seit 1998.',
          copyright: '© 2025 Muster Treuhand AG',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // HANDWERK
  // ---------------------------------------------------------------------------
  handwerk: {
    id: 'handwerk',
    name: 'Handwerker & Gewerbe',
    description: 'Robustes Design für Handwerksbetriebe',
    industry: 'Handwerk',
    colorScheme: {
      primary: '#dc2626',
      secondary: '#991b1b',
      accent: '#fbbf24',
      background: '#fafafa',
      text: '#1f2937',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Meier Sanitär',
          navigation: [
            { label: 'Leistungen', href: '#services' },
            { label: 'Notfall', href: '#emergency' },
            { label: 'Kontakt', href: '#contact' },
          ],
          cta: { label: '24h Notfall', href: 'tel:+41441234567' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Sanitär • Heizung • Klima',
          subline: 'Ihr Fachbetrieb in der Region Zürich. Schnell, zuverlässig, fair.',
          primaryCta: { label: 'Offerte anfragen', href: '#contact' },
          secondaryCta: { label: 'Notfall-Nummer', href: 'tel:+41441234567' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unsere Leistungen',
          subline: 'Von der kleinen Reparatur bis zur Komplettsanierung',
          items: [
            { icon: '🔧', title: 'Sanitär', description: 'Installation und Reparatur' },
            { icon: '🔥', title: 'Heizung', description: 'Wartung und Erneuerung' },
            { icon: '❄️', title: 'Klima', description: 'Klimaanlagen und Lüftung' },
            { icon: '⏰', title: '24h Notdienst', description: 'Rund um die Uhr erreichbar' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Kontakt & Notfall',
          email: 'info@meier-sanitaer.ch',
          phone: '+41 44 123 45 67',
          address: 'Industriestrasse 5\n8000 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Meier Sanitär GmbH',
          description: 'Ihr Sanitär-Fachbetrieb seit 1985.',
          copyright: '© 2025 Meier Sanitär GmbH',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // COIFFEUR
  // ---------------------------------------------------------------------------
  coiffeur: {
    id: 'coiffeur',
    name: 'Coiffeur & Beauty',
    description: 'Elegantes Design für Salons',
    industry: 'Beauty',
    colorScheme: {
      primary: '#be185d',
      secondary: '#9d174d',
      accent: '#fbbf24',
      background: '#fdf4ff',
      text: '#1f2937',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Salon Bella',
          navigation: [
            { label: 'Angebot', href: '#services' },
            { label: 'Team', href: '#team' },
            { label: 'Termin', href: '#contact' },
          ],
          cta: { label: 'Termin buchen', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Ihr Salon für Stil & Schönheit',
          subline: 'Professionelle Haar- und Beauty-Behandlungen in entspannter Atmosphäre.',
          primaryCta: { label: 'Termin vereinbaren', href: '#contact' },
          secondaryCta: { label: 'Unser Angebot', href: '#services' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unser Angebot',
          subline: 'Individuelle Behandlungen für Ihren perfekten Look',
          items: [
            { icon: '✂️', title: 'Schnitt & Styling', description: 'Damen, Herren & Kinder' },
            { icon: '🎨', title: 'Färben & Strähnen', description: 'Balayage, Highlights & mehr' },
            { icon: '💆', title: 'Wellness', description: 'Kopfmassagen & Treatments' },
            { icon: '💅', title: 'Nails', description: 'Maniküre & Pediküre' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Termin buchen',
          email: 'info@salon-bella.ch',
          phone: '+41 44 123 45 67',
          address: 'Seestrasse 25\n8002 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Salon Bella',
          description: 'Ihr Beauty-Salon im Herzen von Zürich.',
          copyright: '© 2025 Salon Bella',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ARZTPRAXIS
  // ---------------------------------------------------------------------------
  arztpraxis: {
    id: 'arztpraxis',
    name: 'Arztpraxis & Medical',
    description: 'Vertrauenswürdiges Design für Praxen',
    industry: 'Gesundheit',
    colorScheme: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#10b981',
      background: '#f0fdfa',
      text: '#1f2937',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Dr. med. Muster',
          navigation: [
            { label: 'Leistungen', href: '#services' },
            { label: 'Team', href: '#team' },
            { label: 'Termin', href: '#contact' },
          ],
          cta: { label: 'Termin buchen', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Ihre Gesundheit in guten Händen',
          subline: 'Hausarztpraxis mit persönlicher Betreuung und moderner Medizin.',
          primaryCta: { label: 'Termin vereinbaren', href: '#contact' },
          secondaryCta: { label: 'Unsere Leistungen', href: '#services' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unsere Leistungen',
          subline: 'Umfassende medizinische Versorgung',
          items: [
            { icon: '🩺', title: 'Hausarztmedizin', description: 'Allgemeine Sprechstunde' },
            { icon: '💉', title: 'Vorsorge', description: 'Check-ups & Impfungen' },
            { icon: '🔬', title: 'Labor', description: 'Blutuntersuchungen vor Ort' },
            { icon: '📋', title: 'Beratung', description: 'Individuelle Gesundheitsberatung' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Sprechstunde',
          email: 'praxis@dr-muster.ch',
          phone: '+41 44 123 45 67',
          address: 'Gesundheitsweg 1\n8001 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Dr. med. Muster',
          description: 'FMH Allgemeine Innere Medizin',
          copyright: '© 2025 Dr. med. Muster',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // RESTAURANT
  // ---------------------------------------------------------------------------
  restaurant: {
    id: 'restaurant',
    name: 'Restaurant & Gastro',
    description: 'Appetitliches Design für Gastronomie',
    industry: 'Gastronomie',
    colorScheme: {
      primary: '#78350f',
      secondary: '#92400e',
      accent: '#f59e0b',
      background: '#fffbeb',
      text: '#1f2937',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Ristorante Sole',
          navigation: [
            { label: 'Menü', href: '#menu' },
            { label: 'Über uns', href: '#about' },
            { label: 'Reservation', href: '#contact' },
          ],
          cta: { label: 'Tisch reservieren', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Willkommen im Ristorante Sole',
          subline: 'Authentische italienische Küche mit frischen Zutaten aus der Region.',
          primaryCta: { label: 'Tisch reservieren', href: '#contact' },
          secondaryCta: { label: 'Menü ansehen', href: '#menu' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unsere Spezialitäten',
          subline: 'Frisch zubereitet mit Liebe',
          items: [
            { icon: '🍝', title: 'Pasta', description: 'Hausgemachte Pasta täglich frisch' },
            { icon: '🍕', title: 'Pizza', description: 'Aus dem Holzofen' },
            { icon: '🥗', title: 'Antipasti', description: 'Saisonale Vorspeisen' },
            { icon: '🍷', title: 'Weine', description: 'Ausgewählte italienische Weine' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Reservation',
          email: 'info@ristorante-sole.ch',
          phone: '+41 44 123 45 67',
          address: 'Seestrasse 50\n8002 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Ristorante Sole',
          description: 'Italienische Küche seit 1990.',
          copyright: '© 2025 Ristorante Sole',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ANWALT
  // ---------------------------------------------------------------------------
  anwalt: {
    id: 'anwalt',
    name: 'Anwalt & Kanzlei',
    description: 'Seriöses Design für Rechtsanwälte',
    industry: 'Recht',
    colorScheme: {
      primary: '#1e3a5f',
      secondary: '#2d5a87',
      accent: '#b8860b',
      background: '#f8f9fa',
      text: '#1a1a2e',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'Kanzlei Muster',
          navigation: [
            { label: 'Rechtsgebiete', href: '#services' },
            { label: 'Team', href: '#team' },
            { label: 'Kontakt', href: '#contact' },
          ],
          cta: { label: 'Beratung anfragen', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Kompetente Rechtsberatung',
          subline: 'Ihr Partner für alle Rechtsfragen in Zürich und der ganzen Schweiz.',
          primaryCta: { label: 'Erstberatung anfragen', href: '#contact' },
          secondaryCta: { label: 'Rechtsgebiete', href: '#services' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Rechtsgebiete',
          subline: 'Spezialisierte Beratung in allen Bereichen',
          items: [
            { icon: '⚖️', title: 'Vertragsrecht', description: 'Verträge und AGB' },
            { icon: '🏢', title: 'Gesellschaftsrecht', description: 'Gründung und M&A' },
            { icon: '👥', title: 'Arbeitsrecht', description: 'Arbeitgeber und Arbeitnehmer' },
            { icon: '🏠', title: 'Immobilienrecht', description: 'Kauf, Verkauf, Miete' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Kontakt aufnehmen',
          email: 'info@kanzlei-muster.ch',
          phone: '+41 44 123 45 67',
          address: 'Bahnhofstrasse 100\n8001 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'Kanzlei Muster',
          description: 'Rechtsanwälte und Notare',
          copyright: '© 2025 Kanzlei Muster',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // IT-DIENSTLEISTER
  // ---------------------------------------------------------------------------
  it: {
    id: 'it',
    name: 'IT & Digital',
    description: 'Modernes Design für IT-Unternehmen',
    industry: 'Technologie',
    colorScheme: {
      primary: '#4f46e5',
      secondary: '#4338ca',
      accent: '#10b981',
      background: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'TechSolutions',
          navigation: [
            { label: 'Services', href: '#services' },
            { label: 'Über uns', href: '#about' },
            { label: 'Kontakt', href: '#contact' },
          ],
          cta: { label: 'Projekt starten', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Digitale Lösungen für Ihr Business',
          subline: 'IT-Beratung, Software-Entwicklung und Cloud-Services aus einer Hand.',
          primaryCta: { label: 'Projekt anfragen', href: '#contact' },
          secondaryCta: { label: 'Services entdecken', href: '#services' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unsere Services',
          subline: 'Massgeschneiderte IT-Lösungen',
          items: [
            { icon: '💻', title: 'Software', description: 'Individuelle Entwicklung' },
            { icon: '☁️', title: 'Cloud', description: 'Migration und Management' },
            { icon: '🔒', title: 'Security', description: 'IT-Sicherheit und Backup' },
            { icon: '📱', title: 'Apps', description: 'Mobile und Web-Apps' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Projekt besprechen',
          email: 'hello@techsolutions.ch',
          phone: '+41 44 123 45 67',
          address: 'Technopark 1\n8005 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'TechSolutions AG',
          description: 'Ihr IT-Partner in der Schweiz.',
          copyright: '© 2025 TechSolutions AG',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // FITNESS
  // ---------------------------------------------------------------------------
  fitness: {
    id: 'fitness',
    name: 'Fitness & Sport',
    description: 'Energetisches Design für Fitness-Studios',
    industry: 'Sport',
    colorScheme: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#f59e0b',
      background: '#f0fdf4',
      text: '#1f2937',
      textMuted: '#6b7280',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    sections: [
      {
        type: 'header',
        content: {
          logoText: 'FitZone',
          navigation: [
            { label: 'Angebot', href: '#services' },
            { label: 'Preise', href: '#pricing' },
            { label: 'Kontakt', href: '#contact' },
          ],
          cta: { label: 'Probetraining', href: '#contact' },
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Dein Weg zu mehr Fitness',
          subline: 'Modernste Geräte, qualifizierte Trainer und eine motivierende Atmosphäre.',
          primaryCta: { label: 'Gratis Probetraining', href: '#contact' },
          secondaryCta: { label: 'Angebote ansehen', href: '#services' },
        },
      },
      {
        type: 'services',
        content: {
          headline: 'Unser Angebot',
          subline: 'Für jeden das passende Training',
          items: [
            { icon: '🏋️', title: 'Krafttraining', description: 'Modernste Geräte' },
            { icon: '🧘', title: 'Yoga & Pilates', description: 'Entspannung und Kraft' },
            { icon: '🚴', title: 'Cardio', description: 'Ausdauer verbessern' },
            { icon: '👥', title: 'Personal Training', description: 'Individuelle Betreuung' },
          ],
        },
      },
      {
        type: 'contact',
        content: {
          headline: 'Probetraining buchen',
          email: 'info@fitzone.ch',
          phone: '+41 44 123 45 67',
          address: 'Sportweg 10\n8000 Zürich',
          showForm: true,
        },
      },
      {
        type: 'footer',
        content: {
          companyName: 'FitZone',
          description: 'Dein Fitness-Studio in Zürich.',
          copyright: '© 2025 FitZone',
          links: [
            { label: 'Impressum', href: '/impressum' },
            { label: 'Datenschutz', href: '/datenschutz' },
          ],
        },
      },
    ],
  },
};

// =============================================================================
// HELPERS
// =============================================================================

export const getTemplate = (id: string): Template | undefined => templates[id];

export const getTemplateList = (): Template[] => Object.values(templates);

export const getTemplatesByIndustry = (industry: string): Template[] => 
  Object.values(templates).filter(t => t.industry === industry);

export default templates;
