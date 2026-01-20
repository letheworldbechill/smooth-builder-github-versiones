// =============================================================================
// SMOOTH BUILDER PRO - UI COMPONENTS
// GASSERWERK THEME LAYER (Token-based)
// =============================================================================

import React from 'react';

// Small helper (avoid extra dependency)
const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

// =============================================================================
// CARD
// =============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padded = true }) => (
  <div
    className={cx(
      'bg-surface border border-border rounded-xl shadow-premium',
      padded && 'p-4',
      className
    )}
  >
    {children}
  </div>
);

// =============================================================================
// BUTTON
// =============================================================================

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-pill transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-bg';

  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-hover shadow-premium',
    secondary: 'bg-surface text-text border border-border hover:bg-surface-soft shadow-soft',
    ghost: 'bg-transparent text-text-soft hover:bg-surface-soft',
    danger: 'bg-error text-white hover:brightness-110 shadow-premium',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed hover:brightness-100',
        className
      )}
    >
      {children}
    </button>
  );
};

// =============================================================================
// ICON BUTTON
// =============================================================================

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  active = false,
  disabled = false,
  title,
  className = '',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cx(
      'p-2 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
      active ? 'bg-brand-soft text-brand border border-border' : 'text-text-soft hover:bg-surface-soft',
      disabled && 'opacity-40 cursor-not-allowed',
      className
    )}
  >
    {children}
  </button>
);

// =============================================================================
// TEXT INPUT
// =============================================================================

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: 'text' | 'email' | 'url' | 'tel';
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  disabled = false,
}) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-text-soft">{label}</label>}
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={cx(
        'w-full px-3 py-2 text-sm rounded-lg border bg-surface text-text placeholder:text-text-muted',
        'border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:border-brand',
        disabled && 'bg-surface-soft cursor-not-allowed opacity-70'
      )}
    />
  </div>
);

// =============================================================================
// TEXT AREA
// =============================================================================

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 3,
  disabled = false,
}) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-text-soft">{label}</label>}
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={cx(
        'w-full px-3 py-2 text-sm rounded-lg border bg-surface text-text placeholder:text-text-muted resize-none',
        'border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:border-brand',
        disabled && 'bg-surface-soft cursor-not-allowed opacity-70'
      )}
    />
  </div>
);

// =============================================================================
// SELECT
// =============================================================================

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  disabled = false,
}) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-text-soft">{label}</label>}
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cx(
        'w-full px-3 py-2 text-sm rounded-lg border bg-surface text-text',
        'border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:border-brand',
        disabled && 'bg-surface-soft cursor-not-allowed opacity-70'
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// =============================================================================
// COLOR INPUT
// =============================================================================

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, onChange, label }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-xs font-medium text-text-soft">{label}</label>}
    <div className="flex gap-2">
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg cursor-pointer border border-border bg-surface"
      />
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          'flex-1 px-3 py-2 text-sm rounded-lg border font-mono bg-surface text-text placeholder:text-text-muted',
          'border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
        )}
      />
    </div>
  </div>
);

// =============================================================================
// TOGGLE
// =============================================================================

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cx(
        'relative w-11 h-6 rounded-full transition-colors border',
        checked ? 'bg-brand border-brand' : 'bg-surface-soft border-border'
      )}
    >
      <div
        className={cx(
          'absolute top-1 w-4 h-4 rounded-full shadow transition-transform',
          checked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'
        )}
      />
    </div>
    {label && <span className="text-sm text-text">{label}</span>}
  </label>
);

// =============================================================================
// BADGE
// =============================================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-surface-soft text-text-soft border border-border',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
  };

  return (
    <span className={cx('inline-flex items-center px-2 py-0.5 text-xs font-medium rounded', variants[variant])}>
      {children}
    </span>
  );
};

// =============================================================================
// MODAL
// =============================================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className={cx('w-full', sizes[size], 'bg-surface text-text border border-border rounded-xl shadow-deep')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-soft"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

// =============================================================================
// COLLAPSIBLE / ACCORDION
// =============================================================================

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-surface-soft"
      >
        <span className="text-sm font-medium text-text">{title}</span>
        <span className={cx('text-text-muted transition-transform', isOpen && 'rotate-180')} aria-hidden>
          ▾
        </span>
      </button>
      {isOpen && <div className="px-4 pb-4 text-sm text-text-soft">{children}</div>}
    </div>
  );
};
