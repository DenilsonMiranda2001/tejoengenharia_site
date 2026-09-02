(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            $('#spinner').removeClass('show');
        }, 120);
    };
    spinner();

    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    var updateHeader = function () {
        $('.site-header').toggleClass('shadow-sm', $(window).scrollTop() > 20);

        if ($(window).scrollTop() > 160) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    };

    updateHeader();
    $(window).on('scroll', updateHeader);

    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 900, 'easeInOutExpo');
        return false;
    });

    $('a[href^="#"]').not('.back-to-top, .project-open').on('click', function (event) {
        var href = $(this).attr('href');
        var target = $(href);

        if (!target.length) {
            return;
        }

        event.preventDefault();
        $('.navbar-collapse').collapse('hide');

        $('html, body').animate({
            scrollTop: target.offset().top - $('.site-header').outerHeight()
        }, 750, 'easeInOutExpo');

        if (history.pushState) {
            history.pushState(null, '', href);
        }
    });

    if ($('.header-carousel').length && typeof $.fn.owlCarousel === 'function') {
        if ($(window).width() >= 576) {
            $('.header-carousel').owlCarousel({
                autoplay: true,
                smartSpeed: 900,
                loop: true,
                dots: true,
                nav: false,
                items: 1
            });
        } else {
            $('.header-carousel').addClass('header-carousel-static');
        }
    }

    /* ==========================================================
       PORTFÓLIO DA HOME — CSS ISOLADO E MODAL ANTIGO REMOVIDO
       ========================================================== */
    if ($('.projects-section').length) {
        if (!document.getElementById('projects-home-css')) {
            $('<link>', {
                id: 'projects-home-css',
                rel: 'stylesheet',
                href: 'css/projects-home.css'
            }).appendTo('head');
        }

        // A navegação agora usa páginas individuais; o modal antigo não é mais necessário.
        $('#projectModal').remove();
    }

    /* ==========================================================
       PORTFÓLIO — FILTROS E NAVEGAÇÃO PARA PÁGINAS INDIVIDUAIS
       ========================================================== */
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

        var projectKey = $(this).data('project');
        var page = projectPages[projectKey];

        if (page) {
            window.location.href = page;
        }
    });

    $('.project-open').on('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        event.preventDefault();

        var projectKey = $(this).data('project');
        var page = projectPages[projectKey];

        if (page) {
            window.location.href = page;
        }
    });

    $('.project-filter').on('click', function () {
        var filter = $(this).data('filter');

        $('.project-filter').removeClass('active');
        $(this).addClass('active');

        $('.project-card').each(function () {
            var category = $(this).data('category');
            var show = filter === 'all' || category === filter;
            $(this).toggleClass('is-hidden', !show);
        });
    });

})(jQuery);
