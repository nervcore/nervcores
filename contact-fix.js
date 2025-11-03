// Runtime fix for contact page handle/link and reapply on language toggle.
(function(){
  function applyFix(){
    try {
      // Fix anchor hrefs to use new X handle
      document.querySelectorAll('a[href*="x.com/"]').forEach(a=>{
        if(a.href.includes('x.com/rainssystem')){
          a.href = a.href.replace('x.com/rainssystem','x.com/nervcores');
        }
      });
      // Aggressive fallback: replace any remaining occurrences in the rendered HTML,
      // including inside nested elements like <strong>
      var html = document.body.innerHTML;
      var newHtml = html.replace(/x\.com\/rainssystem/g,'x.com/nervcores').replace(/@rainssystem/g,'@nervcores');
      if(newHtml !== html){ document.body.innerHTML = newHtml; }
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
