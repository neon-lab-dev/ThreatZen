// components/CookieConsent/cookies.ts

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieDefinition {
  id: CookieCategory;
  title: string;
  description: string;
  examples: string[];
  required: boolean;
}

export const COOKIE_CATEGORIES: CookieDefinition[] = [
  {
    id: 'necessary',
    title: 'Strictly Necessary',
    description:
      'These cookies are essential for the website to function properly. They enable core features like security, network management, and accessibility. The website cannot function without them.',
    examples: [
      'Session authentication',
      'CSRF protection tokens',
      'Load balancing',
      'Cookie consent state',
    ],
    required: true,
  },
  {
    id: 'analytics',
    title: 'Analytics & Performance',
    description:
      'These cookies help us understand how visitors interact with the website by collecting anonymous information. We use this data to improve the experience for everyone.',
    examples: [
      'Page views and session duration',
      'Traffic sources',
      'Feature usage patterns',
      'Error tracking (Sentry)',
    ],
    required: false,
  },
  {
    id: 'preferences',
    title: 'Preferences & Functionality',
    description:
      'These cookies remember choices you make to provide enhanced, personalized features — such as language preference, theme, or region-specific content.',
    examples: [
      'Language selection',
      'Dark mode preference',
      'Recent searches',
      'Form autofill data',
    ],
    required: false,
  },
  {
    id: 'marketing',
    title: 'Marketing & Advertising',
    description:
      'These cookies are used to deliver relevant advertisements and track the effectiveness of campaigns. They may be set by us or by third-party advertising partners.',
    examples: [
      'Ad targeting and retargeting',
      'Campaign performance tracking',
      'Third-party pixels (LinkedIn, Google)',
      'Conversion attribution',
    ],
    required: false,
  },
];

/* ===== Copy ===== */

export const COOKIE_BANNER_COPY = {
  title: 'We value your privacy',
  body:
    'We use cookies to enhance your browsing experience, analyze site traffic, and deliver personalized content. You can choose which categories of cookies to allow. Some cookies are essential for the site to work properly.',
  acceptAll: 'Accept All',
  declineAll: 'Decline All',
  managePreferences: 'Manage Preferences',
  privacyLink: '/privacy-policy',
  privacyLinkText: 'Privacy Policy',
  cookieLink: '/cookie-policy',
  cookieLinkText: 'Cookie Policy',
};

/* ===== Storage ===== */

export const CONSENT_STORAGE_KEY = 'threatzen-cookie-consent';
export const CONSENT_VERSION = '1.0'; // bump this to re-prompt users when policy changes

export interface ConsentState {
  version: string;
  timestamp: string;
  categories: Record<CookieCategory, boolean>;
}

export const getDefaultConsent = (): ConsentState => ({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  categories: {
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  },
});