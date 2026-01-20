// =============================================================================
// SMOOTH BUILDER PRO - CUSTOM HOOKS
// =============================================================================

import { useEffect, useRef, useCallback, useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { isRTL } from '../i18n';

// =============================================================================
// useAutoSave - Automatisches Speichern alle 30 Sekunden
// =============================================================================

export type SaveStatus = 'saved' | 'saving' | 'unsaved';

export function useAutoSave(interval: number = 30000): SaveStatus {
  const { project, isDirty } = useProjectStore();
  const [status, setStatus] = useState<SaveStatus>('saved');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isDirty) {
      setStatus('unsaved');
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout for auto-save
      timeoutRef.current = setTimeout(() => {
        setStatus('saving');
        
        // Save to localStorage
        if (project) {
          localStorage.setItem('smooth-builder-autosave', JSON.stringify(project));
        }
        
        setTimeout(() => setStatus('saved'), 500);
      }, interval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [project, isDirty, interval]);

  return status;
}

// =============================================================================
// useKeyboardShortcuts - Tastaturkürzel
// =============================================================================

interface ShortcutActions {
  undo: () => void;
  redo: () => void;
  save?: () => void;
  export?: () => void;
  preview?: () => void;
}

export function useKeyboardShortcuts(actions: ShortcutActions): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (!modifier) return;

      switch (e.key.toLowerCase()) {
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            actions.redo();
          } else {
            actions.undo();
          }
          break;
        case 'y':
          if (!isMac) {
            e.preventDefault();
            actions.redo();
          }
          break;
        case 's':
          e.preventDefault();
          actions.save?.();
          break;
        case 'e':
          if (e.shiftKey) {
            e.preventDefault();
            actions.export?.();
          }
          break;
        case 'p':
          if (e.shiftKey) {
            e.preventDefault();
            actions.preview?.();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
}

// =============================================================================
// useRTL - RTL-Support für Arabisch
// =============================================================================

export function useRTL(language: string): boolean {
  const rtl = isRTL(language);

  useEffect(() => {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [rtl, language]);

  return rtl;
}

// =============================================================================
// useViewport - Responsive Viewport Management
// =============================================================================

export type Viewport = 'desktop' | 'tablet' | 'mobile';

const viewportWidths: Record<Viewport, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
};

export function useViewport() {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [zoom, setZoom] = useState(100);

  const getWidth = useCallback(() => viewportWidths[viewport], [viewport]);

  return {
    viewport,
    setViewport,
    zoom,
    setZoom,
    width: getWidth(),
    viewportWidths,
  };
}

// =============================================================================
// useOnlineStatus - Offline-Erkennung für PWA
// =============================================================================

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// =============================================================================
// useDebounce - Verzögerung für Eingaben
// =============================================================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// =============================================================================
// useFocusTrap - Focus-Trap für Modals (Accessibility)
// =============================================================================

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}

// =============================================================================
// useContrastCheck - WCAG Kontrast-Prüfung
// =============================================================================

export function useContrastCheck(foreground: string, background: string): {
  ratio: number;
  level: 'AAA' | 'AA' | 'fail';
  passes: boolean;
} {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  let level: 'AAA' | 'AA' | 'fail' = 'fail';
  if (ratio >= 7) level = 'AAA';
  else if (ratio >= 4.5) level = 'AA';

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    passes: ratio >= 4.5,
  };
}
