// Runtime fix for contact page handle/link and reapply on language toggle.
(function(){
  function applyFix(){
    try {
      const scope = document.querySelector('main') || document.body;
      // Fix anchor hrefs to use new X handle (scoped)
      scope.querySelectorAll('a[href*="x.com/"]').forEach(a=>{
        if(a.href.includes('x.com/rainssystem')){
          a.href = a.href.replace('x.com/rainssystem','x.com/nervcores');
        }
      });
      // Safe text replacements without nuking event listeners
      scope.querySelectorAll('p, span, small, a, li, h1, h2, h3, strong, em').forEach(el=>{
        if(el.innerHTML && (el.innerHTML.includes('@rainssystem') || el.innerHTML.includes('x.com/rainssystem'))){
          el.innerHTML = el.innerHTML
            .replace(/@rainssystem/g,'@nervcores')
            .replace(/x\.com\/rainssystem/g,'x.com/nervcores');
        }
      });
    } catch(e){ /* noop */ }
  }
  // Run after i18n applies on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(applyFix, 0); });
  // Reapply after language toggle (best-effort)
  document.addEventListener('click', function(e){
    if(e.target && (e.target.closest('[data-lang-toggle]') || e.target.matches('[data-lang-toggle]'))){
      setTimeout(applyFix, 120);
    }
  });
})();
