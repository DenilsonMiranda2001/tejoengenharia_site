(function ($) {
    "use strict";

    var spinner = document.getElementById('spinner');
    if (spinner) {
        requestAnimationFrame(function () {
            spinner.classList.remove('show');
        });
    }

    var header = document.querySelector('.site-header');
    var backToTop = document.querySelector('.back-to-top');
    var ticking = false;

    var updateHeader = function () {
        var scrollY = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle('shadow-sm', scrollY > 20);
        if (backToTop) backToTop.style.display = scrollY > 160 ? 'inline-flex' : 'none';
        ticking = false;
    };

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateHeader);
        }
    }, { passive: true });
    updateHeader();

    if (backToTop) {
        backToTop.addEventListener('click', function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    $('a[href^="#"]').not('.back-to-top, .project-open').on('click', function (event) {
        var href = $(this).attr('href');
        var target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        var navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show') && typeof bootstrap !== 'undefined') {
            var collapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar, { toggle: false });
            collapse.hide();
        }

        var headerHeight = header ? header.offsetHeight : 0;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        if (history.pushState) history.pushState(null, '', href);
    });

    if ($('.header-carousel').length && typeof $.fn.owlCarousel === 'function' && window.innerWidth >= 576) {
        $('.header-carousel').owlCarousel({
            autoplay: true,
            autoplayTimeout: 5500,
            autoplayHoverPause: true,
            smartSpeed: 650,
            loop: true,
            dots: true,
            nav: false,
            items: 1
        });
    } else {
        $('.header-carousel').addClass('header-carousel-static');
    }

    if ($('.projects-section').length && !document.getElementById('projects-home-css')) {
        var projectsCss = document.createElement('link');
        projectsCss.rel = 'stylesheet';
        projectsCss.href = 'css/projects-home.css';
        projectsCss.id = 'projects-home-css';
        document.head.appendChild(projectsCss);
    }

    var projectPages = {
        'casa-barra': 'projetos/casa-barra.html',
        'casa-taipa': 'projetos/casa-taipa.html',
        'casa-duo': 'projetos/casa-duo.html',
        'casa-atria': 'projetos/casa-atria.html',
        'casa-eli': 'projetos/casa-eli.html',
        'escritorio-tejo': 'projetos/escritorio-tejo.html'
    };

    $('.project-open').on('click', function (event) {
        event.preventDefault();
        var page = projectPages[$(this).data('project')];
        if (page) window.location.href = page;
    });

    $('.project-open').on('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        var page = projectPages[$(this).data('project')];
        if (page) window.location.href = page;
    });

    $('.project-filter').on('click', function () {
        var filter = $(this).data('filter');
        $('.project-filter').removeClass('active');
        $(this).addClass('active');
        $('.project-card').each(function () {
            var category = $(this).data('category');
            $(this).toggleClass('is-hidden', filter !== 'all' && category !== filter);
        });
    });
})(jQuery);
