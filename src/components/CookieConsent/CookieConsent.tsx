// components/CookieConsent/CookieConsent.tsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, Settings } from 'lucide-react';
import { COOKIE_BANNER_COPY } from './cookies';
import { useCookieConsent } from './useCookieConsent';
import CookiePreferencesModal from './CookiePreferencesModal';

const CookieConsent: React.FC = () => {
  const {
    showBanner,
    consent,
    acceptAll,
    declineAll,
    savePreferences,
    reopenBanner,
  } = useCookieConsent();

  const [showModal, setShowModal] = useState(false);

  const handleManage = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* ===== Banner ===== */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="
              fixed bottom-0 left-0 right-0 z-[100]
              p-3 sm:p-4 lg:p-6
              pointer-events-none
            "
          >
            <div
              className="
                max-w-6xl mx-auto
                rounded-2xl bg-white border border-muted
                shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]
                pointer-events-auto
                overflow-hidden
              "
            >
              <div className="p-4 sm:p-6 lg:p-7">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-8">
                  {/* Icon + copy */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Icon badge */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-brand" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight mb-1.5">
                        {COOKIE_BANNER_COPY.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {COOKIE_BANNER_COPY.body}{' '}
                        <a
                          href={COOKIE_BANNER_COPY.privacyLink}
                          className="font-medium text-navy hover:text-brand underline underline-offset-2 transition-colors"
                        >
                          {COOKIE_BANNER_COPY.privacyLinkText}
                        </a>
                        {' · '}
                        <a
                          href={COOKIE_BANNER_COPY.cookieLink}
                          className="font-medium text-navy hover:text-brand underline underline-offset-2 transition-colors"
                        >
                          {COOKIE_BANNER_COPY.cookieLinkText}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0 lg:pt-0.5">
                    <button
                      type="button"
                      onClick={handleManage}
                      className="
                        inline-flex items-center justify-center gap-2
                        px-4 py-2.5 rounded-xl
                        text-sm font-semibold
                        text-foreground
                        border border-muted bg-white
                        hover:bg-[var(--surface)] hover:border-brand/40
                        transition-all duration-200
                        whitespace-nowrap
                      "
                    >
                      <Settings className="w-3.5 h-3.5" />
                      {COOKIE_BANNER_COPY.managePreferences}
                    </button>

                    <button
                      type="button"
                      onClick={declineAll}
                      className="
                        inline-flex items-center justify-center
                        px-4 py-2.5 rounded-xl
                        text-sm font-semibold
                        text-foreground
                        border border-muted bg-white
                        hover:bg-[var(--surface)]
                        transition-all duration-200
                        whitespace-nowrap
                      "
                    >
                      {COOKIE_BANNER_COPY.declineAll}
                    </button>

                    <button
                      type="button"
                      onClick={acceptAll}
                      className="
                        inline-flex items-center justify-center
                        px-5 py-2.5 rounded-xl
                        text-sm font-semibold text-navy-deep
                        bg-brand
                        hover:bg-brand-glow
                        shadow-[0_0_0_0_rgba(76,192,138,0.5)]
                        hover:shadow-[0_0_30px_-4px_rgba(76,192,138,0.6)]
                        transition-all duration-200
                        whitespace-nowrap
                      "
                    >
                      {COOKIE_BANNER_COPY.acceptAll}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-0.5 bg-gradient-to-r from-brand via-brand-glow to-brand" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Preferences modal ===== */}
      <CookiePreferencesModal
        open={showModal}
        initial={consent}
        onClose={handleCloseModal}
        onSave={(categories) => {
          savePreferences(categories);
          handleCloseModal();
        }}
        onAcceptAll={() => {
          acceptAll();
          handleCloseModal();
        }}
      />

      {/* ===== Re-open helper — render this anywhere you want ===== */}
      <button
        type="button"
        onClick={reopenBanner}
        data-cookie-settings
        hidden
        aria-hidden
      />
    </>
  );
};

export default CookieConsent;