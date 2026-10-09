/* eslint-disable react-hooks/set-state-in-effect */
// components/CookieConsent/CookiePreferencesModal.tsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X, Lock, Check } from 'lucide-react';
import {
  COOKIE_CATEGORIES,
  getDefaultConsent,
  type ConsentState,
  type CookieCategory,
} from './cookies';

interface CookiePreferencesModalProps {
  open: boolean;
  initial: ConsentState | null;
  onClose: () => void;
  onSave: (categories: ConsentState['categories']) => void;
  onAcceptAll: () => void;
}

const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  open,
  initial,
  onClose,
  onSave,
  onAcceptAll,
}) => {
  const [categories, setCategories] = useState<ConsentState['categories']>(
    initial?.categories ?? getDefaultConsent().categories
  );

  /* Sync with latest consent when modal opens */
  useEffect(() => {
    if (open) {
      setCategories(initial?.categories ?? getDefaultConsent().categories);
    }
  }, [open, initial]);

  /* Escape + scroll lock */
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const toggle = (id: CookieCategory) => {
    if (id === 'necessary') return; // locked
    setCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    onSave(categories);
  };

  const allNonEssentialOn =
    categories.analytics && categories.preferences && categories.marketing;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-navy-deep/60 backdrop-blur-sm"
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            className="
              fixed z-[120] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[calc(100%-2rem)] max-w-2xl max-h-[90vh]
              rounded-3xl bg-white border border-muted
              shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)]
              overflow-hidden
              flex flex-col
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-7 pb-5 border-b border-muted flex-shrink-0">
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-brand" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="cookie-prefs-title"
                    className="text-lg font-bold text-foreground leading-tight"
                  >
                    Cookie Preferences
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    Choose which categories of cookies you allow. You can change
                    these at any time.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 p-1.5 -mt-1 -mr-1 rounded-lg hover:bg-[var(--surface)] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-3">
              {COOKIE_CATEGORIES.map((cat) => {
                const enabled = categories[cat.id];
                return (
                  <div
                    key={cat.id}
                    className={`
                      rounded-2xl border p-4 sm:p-5
                      transition-colors duration-200
                      ${
                        enabled
                          ? 'border-brand/30 bg-brand/[0.03]'
                          : 'border-muted bg-white'
                      }
                    `}
                  >
                    {/* Row 1: title + toggle */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`
                            flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                            transition-colors duration-200
                            ${
                              enabled
                                ? 'bg-brand text-navy-deep'
                                : 'bg-[var(--surface)] text-muted-foreground'
                            }
                          `}
                        >
                          {cat.required ? (
                            <Lock className="w-4 h-4" />
                          ) : enabled ? (
                            <Check className="w-4 h-4" strokeWidth={3} />
                          ) : (
                            <Cookie className="w-4 h-4" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-foreground">
                              {cat.title}
                            </h3>
                            {cat.required && (
                              <span className="px-2 py-0.5 rounded-md bg-navy/10 text-navy text-[10px] font-semibold uppercase tracking-wider">
                                Always active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      {/* Toggle switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`Toggle ${cat.title}`}
                        disabled={cat.required}
                        onClick={() => toggle(cat.id)}
                        className={`
                          relative flex-shrink-0 mt-0.5
                          w-11 h-6 rounded-full
                          transition-colors duration-300
                          ${
                            enabled ? 'bg-brand' : 'bg-muted-foreground/30'
                          }
                          ${
                            cat.required
                              ? 'opacity-60 cursor-not-allowed'
                              : 'cursor-pointer'
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute top-0.5 left-0.5
                            w-5 h-5 rounded-full bg-white shadow-sm
                            transition-transform duration-300
                            ${enabled ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        />
                      </button>
                    </div>

                    {/* Row 2: examples */}
                    <div className="mt-3 pt-3 border-t border-muted/60">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Examples
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.examples.map((ex) => (
                          <span
                            key={ex}
                            className="
                              inline-flex px-2 py-0.5 rounded-md
                              bg-[var(--surface)] border border-muted
                              text-[10px] font-medium text-muted-foreground
                            "
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-7 py-4 border-t border-muted bg-[var(--surface)]/50 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onAcceptAll}
                className="
                  text-xs font-medium
                  text-muted-foreground hover:text-foreground
                  transition-colors underline underline-offset-2
                  order-3 sm:order-1 sm:ml-0
                "
              >
                {allNonEssentialOn
                  ? 'All cookies already accepted'
                  : 'Accept all instead'}
              </button>

              <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    inline-flex items-center justify-center
                    px-4 py-2.5 rounded-xl
                    text-sm font-semibold text-foreground
                    border border-muted bg-white
                    hover:bg-[var(--surface)]
                    transition-colors
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="
                    inline-flex items-center justify-center
                    px-5 py-2.5 rounded-xl
                    text-sm font-semibold text-navy-deep
                    bg-brand hover:bg-brand-glow
                    transition-colors
                  "
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookiePreferencesModal;