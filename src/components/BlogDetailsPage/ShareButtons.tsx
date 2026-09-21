// components/BlogDetailsPage/ShareButtons.tsx
import React, { useState } from 'react';

interface ShareButtonsProps {
  /** Title of the article — used as share text on X/Twitter */
  title?: string;
  /** Full URL to share. Defaults to current page URL. */
  url?: string;
}

type Network = 'linkedin' | 'twitter' | 'facebook';

const ShareButtons: React.FC<ShareButtonsProps> = ({ title = '', url }) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () =>
    url || (typeof window !== 'undefined' ? window.location.href : '');

  const getShareTitle = () =>
    title || (typeof document !== 'undefined' ? document.title : '');

  const handleCopyLink = async () => {
    const link = getShareUrl();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback for non-secure contexts / older browsers
        const textarea = document.createElement('textarea');
        textarea.value = link;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const openShare = (network: Network) => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareTitle = encodeURIComponent(getShareTitle());

    const urls: Record<Network, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    };

    window.open(
      urls[network],
      '_blank',
      'noopener,noreferrer,width=600,height=500,top=100,left=100'
    );
  };

  const shareOptions: { name: string; key: Network; icon: React.ReactNode }[] = [
    {
      name: 'LinkedIn',
      key: 'linkedin',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'X',
      key: 'twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      key: 'facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-muted p-6">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
        Share Article
      </h3>

      <div className="flex items-center gap-3">
        {shareOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => openShare(option.key)}
            className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center text-muted-foreground hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
            aria-label={`Share on ${option.name}`}
            title={`Share on ${option.name}`}
          >
            {option.icon}
          </button>
        ))}

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className={`
            flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer
            ${
              copied
                ? 'bg-[var(--brand)]/20 text-[var(--brand)]'
                : 'bg-[var(--surface)] text-muted-foreground hover:bg-navy hover:text-white'
            }
          `}
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;