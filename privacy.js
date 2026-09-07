(() => {
  const CONSENT_KEY = 'earthly.analyticsConsent.v1';
  const notice = document.querySelector('.privacy-notice');
  const settingsButton = document.querySelector('[data-analytics-settings]');
  let analyticsLoaded = false;

  const readChoice = () => {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  };

  const saveChoice = (choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // The choice still applies to this page when browser storage is unavailable.
    }
  };

  const loadClarity = () => {
    window.clarity = window.clarity || function clarityQueue() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'granted'
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/y5nkpf0o9i';
    document.head.appendChild(script);
  };

  const grantClarityConsent = () => {
    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'granted'
    });
  };

  const loadGoatCounter = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = 'https://earthly.goatcounter.com/count';
    document.body.appendChild(script);
  };

  const loadAnalytics = () => {
    if (analyticsLoaded) {
      grantClarityConsent();
      return;
    }

    analyticsLoaded = true;
    loadClarity();
    loadGoatCounter();
  };

  const declineAnalytics = () => {
    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        ad_Storage: 'denied',
        analytics_Storage: 'denied'
      });
      window.clarity('consent', false);
    }
  };

  const applyChoice = (choice) => {
    saveChoice(choice);
    notice.hidden = true;

    if (choice === 'allow') {
      loadAnalytics();
    } else {
      declineAnalytics();
    }
  };

  notice.querySelectorAll('[data-analytics-choice]').forEach((button) => {
    button.addEventListener('click', () => applyChoice(button.dataset.analyticsChoice));
  });

  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      notice.hidden = false;
      notice.querySelector('[data-analytics-choice="allow"]').focus();
    });
  }

  if (readChoice() === 'allow') {
    loadAnalytics();
  } else if (readChoice() !== 'decline') {
    notice.hidden = false;
  }
})();
