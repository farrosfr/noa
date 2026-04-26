(function() {
    'use strict';

    // 1. Define the domains you want to explicitly trust
    const excludedDomains = ['farros.co', 'google.com', 'medium.com'];
    const currentHost = window.location.hostname;

    // 2. Check if the current host exactly matches or is a subdomain (e.g., www.google.com)
    const isExcluded = excludedDomains.some(domain => 
        currentHost === domain || currentHost.endsWith('.' + domain)
    );

    // 3. If it's a trusted domain, halt execution immediately
    if (isExcluded) {
        return; 
    }

    // Prevent execution inside hidden ad iframes
    if (window.top !== window.self) return;

    // --- Core Guardrail Logic ---
    const badKeywords = /lk21|dunia21|layarkaca21|layartancap21|rebahin|idlix|bos21|indoxx1|indoxxi|film semi|nonton semi|dramacool/i;
    const targetURL = "https://www.youtube.com/watch?v=fbTlW1V2VuI&t=2726s";

    function enforceRedirect() {
        window.stop();
        // Kept the inline CSS minimal and elegant
        document.documentElement.innerHTML = '<h1 style="text-align:center; margin-top:20%; font-family:sans-serif; color:#333;">Redirecting...</h1>';
        window.location.replace(targetURL);
    }

    const observer = new MutationObserver((mutations, obs) => {
        if (document.title && badKeywords.test(document.title)) {
            obs.disconnect();
            enforceRedirect();
        }
        if (document.body && badKeywords.test(document.body.textContent)) {
            obs.disconnect();
            enforceRedirect();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
})();