// History UX fix: avoid polluting browser history with unnecessary entries
(function(){
  try {
    const originalPush = history.pushState;
    history.pushState = function(state, title, url){
      try {
        const base = location.href;
        const nextHref = typeof url === 'string' ? new URL(url, base).href : base;
        const curURL = new URL(base);
        const nextURL = new URL(nextHref);
        const samePath = curURL.origin === nextURL.origin && curURL.pathname === nextURL.pathname;
        const onlyHashChange = samePath && curURL.search === nextURL.search;
        const onlyQueryChange = samePath && curURL.hash === nextURL.hash;
        const isInitial = (performance.timing && performance.timing.navigationStart) ? (Date.now() - performance.timing.navigationStart) < 3000 : false;
        // Use replaceState when:
        // - only hash changes, or
        // - only query params change on same page, or
        // - during initial load (likely redirects/normalizations)
        if(onlyHashChange || onlyQueryChange || isInitial){
          return history.replaceState(state, title, url);
        }
      } catch(e){ /* fall through to push */ }
      return originalPush.apply(history, arguments);
    };
  } catch(e){ /* noop */ }
})();

