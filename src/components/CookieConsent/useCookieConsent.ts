/* eslint-disable react-hooks/set-state-in-effect */
// components/CookieConsent/useCookieConsent.ts
import { useCallback, useEffect, useState } from 'react';
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  getDefaultConsent,
  type ConsentState,
} from './cookies';

/* ===== Read consent from localStorage (SSR-safe) ===== */
const readStoredConsent = (): ConsentState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ConsentState;

    // Version mismatch → treat as no consent, re-prompt
    if (parsed.version !== CONSENT_VERSION) return null;

    return parsed;
  } catch {
    return null;
  }
};

export const useCookieConsent = () => {
  // `null` = not decided yet; `ConsentState` = decided
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  /* ===== Hydrate on mount ===== */
  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setHasMounted(true);
  }, []);

  /* ===== Persist + optionally apply side effects ===== */
  const saveConsent = useCallback((next: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage may be blocked — fail silently */
    }
    setConsent(next);
    setShowBanner(false);

    /* ===== Hook into analytics / marketing scripts here ===== */
    // Example:
    // if (next.categories.analytics) window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    // if (next.categories.marketing) window.fbq?.('consent', 'grant'); // or remove if declined
  }, []);

  /* ===== Public actions ===== */
  const acceptAll = useCallback(() => {
    const next = getDefaultConsent();
    next.categories = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    saveConsent(next);
  }, [saveConsent]);

  const declineAll = useCallback(() => {
    saveConsent(getDefaultConsent());
  }, [saveConsent]);

  const savePreferences = useCallback(
    (categories: ConsentState['categories']) => {
      saveConsent({
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        categories: { ...categories, necessary: true },
      });
    },
    [saveConsent]
  );

  /* ===== Allow re-opening the banner (e.g. from footer link) ===== */
  const reopenBanner = useCallback(() => setShowBanner(true), []);

  return {
    /** Whether a decision has been made */
    hasDecided: consent !== null,
    /** The current consent state (null if not decided) */
    consent,
    /** Whether the banner should currently render */
    showBanner: hasMounted && showBanner,
    /** Actions */
    acceptAll,
    declineAll,
    savePreferences,
    reopenBanner,
  };
};