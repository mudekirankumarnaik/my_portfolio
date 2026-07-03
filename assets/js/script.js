/* ============================================================
   KIRAN PORTFOLIO BLOG — CORE SCRIPT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky Navbar ---------- */
  var navbar = document.querySelector('.navbar');
  function onScrollNav() {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav);

  /* ---------- Mobile Navigation ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href.indexOf(currentPage) !== -1 && currentPage !== '') {
      a.classList.add('active');
    }
  });

  /* ---------- Typing Animation (Hero Terminal) ---------- */
  var typedEl = document.getElementById('typed-text');
  if (typedEl) {
    var phrases = [
      'Python Developer',
      'Frontend Developer',
      'Cybersecurity Enthusiast',
      'Senior Freelancer @ Alpha Auron'
    ];
    var pIndex = 0, cIndex = 0, deleting = false;

    function typeLoop() {
      var current = phrases[pIndex];
      if (!deleting) {
        cIndex++;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        cIndex--;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  /* ---------- Counter Animation ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1600;
          var startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Animated Progress Bars (Skills) ---------- */
  var bars = document.querySelectorAll('.progress-fill');
  if (bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = el.getAttribute('data-percent') + '%';
          barObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { barObserver.observe(b); });
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Back To Top ---------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Portfolio Filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        projectCards.forEach(function (card) {
          var cats = card.getAttribute('data-category') || '';
          if (filter === 'all' || cats.indexOf(filter) !== -1) {
            card.classList.remove('hidden-card');
          } else {
            card.classList.add('hidden-card');
          }
        });
      });
    });
  }

  /* ---------- Project Details Modal ---------- */
  var modalOverlay = document.getElementById('projectModal');
  if (modalOverlay) {
    var modalTitle = modalOverlay.querySelector('.modal-title');
    var modalDesc = modalOverlay.querySelector('.modal-desc');
    var modalMeta = modalOverlay.querySelector('.modal-meta');
    var modalGithub = modalOverlay.querySelector('.modal-github');
    var modalDemo = modalOverlay.querySelector('.modal-demo');

    document.querySelectorAll('[data-project]').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        modalTitle.textContent = card.getAttribute('data-title') || '';
        modalDesc.textContent = card.getAttribute('data-desc') || '';
        modalMeta.innerHTML = '';
        (card.getAttribute('data-tags') || '').split(',').forEach(function (t) {
          if (!t.trim()) return;
          var span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t.trim();
          modalMeta.appendChild(span);
        });
        modalGithub.href = card.getAttribute('data-github') || '#';
        modalDemo.href = card.getAttribute('data-demo') || '#';
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay || e.target.closest('.modal-close')) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Blog Search ---------- */
  var searchInput = document.getElementById('blogSearch');
  var postCards = document.querySelectorAll('[data-post-title]');
  if (searchInput && postCards.length) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      postCards.forEach(function (card) {
        var title = (card.getAttribute('data-post-title') || '').toLowerCase();
        var cat = (card.getAttribute('data-post-cat') || '').toLowerCase();
        var match = title.indexOf(q) !== -1 || cat.indexOf(q) !== -1;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  /* ---------- Category Filter (Blog) ---------- */
  document.querySelectorAll('[data-cat-filter]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var cat = link.getAttribute('data-cat-filter').toLowerCase();
      postCards.forEach(function (card) {
        var pcat = (card.getAttribute('data-post-cat') || '').toLowerCase();
        card.style.display = (cat === 'all' || pcat === cat) ? '' : 'none';
      });
      if (searchInput) searchInput.value = '';
    });
  });

  /* ---------- Reading Progress Bar (Articles) ---------- */
  var progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    });
  }

  /* ---------- Estimated Reading Time ---------- */
  var readingTimeEl = document.getElementById('readingTime');
  var articleBody = document.querySelector('.article-body');
  if (readingTimeEl && articleBody) {
    var words = articleBody.innerText.trim().split(/\s+/).length;
    var minutes = Math.max(1, Math.round(words / 200));
    readingTimeEl.textContent = minutes + ' min read';
  }

  /* ---------- Share Buttons ---------- */
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-share');
      var url = encodeURIComponent(window.location.href);
      var title = encodeURIComponent(document.title);
      var shareUrls = {
        twitter: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
        whatsapp: 'https://api.whatsapp.com/send?text=' + title + '%20' + url
      };
      if (type === 'copy') {
        navigator.clipboard && navigator.clipboard.writeText(window.location.href);
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy Link'; }, 1800);
      } else if (shareUrls[type]) {
        window.open(shareUrls[type], '_blank', 'width=600,height=500');
      }
    });
  });

  /* ---------- Comment Form (UI only) ---------- */
  var commentForm = document.getElementById('commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = commentForm.querySelector('[name="name"]').value.trim();
      var text = commentForm.querySelector('[name="comment"]').value.trim();
      if (!name || !text) return;
      var list = document.getElementById('commentsList');
      var item = document.createElement('div');
      item.className = 'comment reveal in';
      item.innerHTML =
        '<div class="comment-avatar"></div>' +
        '<div><span class="comment-name"></span><span class="comment-date">Just now</span>' +
        '<p class="comment-text"></p></div>';
      item.querySelector('.comment-name').textContent = name;
      item.querySelector('.comment-text').textContent = text;
      list.prepend(item);
      commentForm.reset();
    });
  }

  /* ---------- Contact Form Validation ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var name = contactForm.querySelector('#cf-name');
      var email = contactForm.querySelector('#cf-email');
      var message = contactForm.querySelector('#cf-message');

      function setInvalid(field, invalid) {
        field.closest('.field').classList.toggle('invalid', invalid);
      }

      if (!name.value.trim()) { setInvalid(name, true); valid = false; } else setInvalid(name, false);

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) { setInvalid(email, true); valid = false; } else setInvalid(email, false);

      if (message.value.trim().length < 10) { setInvalid(message, true); valid = false; } else setInvalid(message, false);

      var successBox = document.getElementById('formSuccess');
      if (valid) {
        successBox.classList.add('show');
        contactForm.reset();
        setTimeout(function () { successBox.classList.remove('show'); }, 5000);
      }
    });
  }

  /* ---------- Newsletter Form (UI only) ---------- */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var original = btn.textContent;
      btn.textContent = 'Subscribed!';
      setTimeout(function () { btn.textContent = original; }, 2200);
      form.reset();
    });
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
