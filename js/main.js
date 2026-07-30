// Tree Site Demo — mobile nav toggle, FAQ accordions, sticky header shadow
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var backdrop = document.querySelector('.nav-backdrop');

  function closeNav() {
    mainNav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.has-dropdown.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      if (backdrop) backdrop.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);

  // Dropdown toggles on mobile (tap to expand submenu instead of hover)
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return;
      e.preventDefault();
      var parent = btn.closest('.has-dropdown');
      var wasOpen = parent.classList.contains('is-open');
      document.querySelectorAll('.has-dropdown.is-open').forEach(function (el) {
        el.classList.remove('is-open');
      });
      if (!wasOpen) parent.classList.add('is-open');
    });
  });

  // FAQ accordions
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('is-open');
        var q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Floating header: solid background once scrolled (transparent over the hero at top)
  var header = document.querySelector('.site-header');
  if (header) {
    function syncHeaderScrollState() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    syncHeaderScrollState();
    window.addEventListener('scroll', syncHeaderScrollState);
  }
});
