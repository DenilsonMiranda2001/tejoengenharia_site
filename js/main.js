(function ($) {
    "use strict";

    /* ==========================================================
       BASE DO SITE
       ========================================================== */
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
       PORTFÓLIO TEJO
       Imagens: project-1.png até project-6.png
       ========================================================== */
    var projects = {
        'casa-barra': {
            name: 'Casa Barra',
            category: 'Residencial',
            number: '01',
            image: 'img/project-1.png',
            description: 'Residência de alto padrão marcada por uma arquitetura contemporânea, grandes vãos e integração entre os ambientes e a paisagem.'
        },
        'casa-taipa': {
            name: 'Casa Taipa',
            category: 'Residencial',
            number: '02',
            image: 'img/project-2.png',
            description: 'Projeto que ressignifica referências naturais em uma composição contemporânea, valorizando transparência, matéria e integração.'
        },
        'casa-duo': {
            name: 'Casa Duo',
            category: 'Residencial',
            number: '03',
            image: 'img/project-3.png',
            description: 'Uma residência de linguagem sofisticada, explorando o contraste entre materiais, volumes, vidro e iluminação natural.'
        },
        'casa-atria': {
            name: 'Casa Átria',
            category: 'Residencial',
            number: '04',
            image: 'img/project-4.png',
            description: 'Arquitetura contemporânea com materiais nobres e uma composição pensada para aproveitar a luz natural e a experiência dos espaços.'
        },
        'casa-eli': {
            name: 'Casa Eli',
            category: 'Residencial',
            number: '05',
            image: 'img/project-5.png',
            description: 'Residência que combina pedra, vidro e volumes contemporâneos para criar uma atmosfera marcante e integrada ao entorno.'
        },
        'escritorio-tejo': {
            name: 'Escritório Tejo Engenharia',
            category: 'Institucional',
            number: '06',
            image: 'img/project-6.png',
            description: 'Espaço institucional da Tejo Engenharia concebido para unir identidade, amplitude, funcionalidade e sofisticação.'
        }
    };

    var portfolioStyles = `
        .projects-section {
            background: #f7f5f1;
            overflow: hidden;
            position: relative;
        }

        .projects-section::after {
            border: 1px solid rgba(191,143,84,.13);
            content: "";
            height: 430px;
            pointer-events: none;
            position: absolute;
            right: -220px;
            top: 100px;
            transform: rotate(25deg);
            width: 430px;
        }

        .projects-heading {
            margin-left: 0;
            margin-right: 0;
            max-width: 850px;
            position: relative;
            z-index: 1;
        }

        .projects-heading h2 {
            font-size: clamp(2.5rem, 5vw, 4.6rem);
            letter-spacing: -.045em;
            margin-bottom: 18px;
        }

        .projects-heading p {
            font-size: 1.05rem;
            max-width: 650px;
        }

        .project-featured {
            background: #171717;
            box-shadow: 0 30px 80px rgba(21,21,21,.16);
            display: grid;
            grid-template-columns: minmax(0, 1.35fr) minmax(340px, .65fr);
            margin-bottom: 28px;
            min-height: 520px;
            overflow: hidden;
            position: relative;
            z-index: 1;
        }

        .project-featured-image {
            background: #ded9d0;
            min-height: 520px;
            overflow: hidden;
            position: relative;
        }

        .project-featured-image::after {
            background: linear-gradient(90deg, transparent 65%, rgba(23,23,23,.42));
            content: "";
            inset: 0;
            pointer-events: none;
            position: absolute;
        }

        .project-featured-image img {
            display: block;
            height: 100%;
            object-fit: cover;
            transition: transform 1s cubic-bezier(.2,.7,.2,1);
            width: 100%;
        }

        .project-featured:hover .project-featured-image img {
            transform: scale(1.035);
        }

        .project-featured-content {
            align-self: center;
            color: #fff;
            padding: 58px 52px;
            position: relative;
        }

        .project-index {
            color: #c9a06b;
            display: block;
            font-size: .7rem;
            font-weight: 800;
            letter-spacing: .13em;
            margin-bottom: 28px;
        }

        .project-category {
            color: rgba(255,255,255,.65);
            display: block;
            font-size: .72rem;
            font-weight: 800;
            letter-spacing: .12em;
            margin-bottom: 12px;
            text-transform: uppercase;
        }

        .project-featured-content h3 {
            color: #fff;
            font-size: clamp(2.4rem, 4vw, 4rem);
            letter-spacing: -.045em;
            line-height: .98;
            margin-bottom: 20px;
        }

        .project-featured-content p {
            color: rgba(255,255,255,.68);
            margin-bottom: 30px;
        }

        .project-open {
            align-items: center;
            background: transparent;
            border: 0;
            color: inherit;
            cursor: pointer;
            display: inline-flex;
            font: inherit;
            font-weight: 800;
            gap: 12px;
            padding: 0;
            text-align: left;
        }

        .project-featured-content .project-open {
            color: #fff;
        }

        .project-open i {
            align-items: center;
            background: var(--tejo-gold);
            border-radius: 50%;
            color: #fff;
            display: inline-flex;
            height: 42px;
            justify-content: center;
            transition: transform .3s ease;
            width: 42px;
        }

        .project-open:hover i,
        .project-open:focus-visible i {
            transform: translateX(5px);
        }

        .project-toolbar {
            align-items: center;
            border-bottom: 1px solid rgba(21,21,21,.12);
            display: flex;
            justify-content: space-between;
            margin-bottom: 26px;
            padding: 8px 0 18px;
            position: relative;
            z-index: 1;
        }

        .project-toolbar > span {
            color: var(--tejo-ink);
            font-family: "Space Grotesk", sans-serif;
            font-size: .95rem;
            font-weight: 700;
        }

        .project-filters {
            align-items: center;
            display: flex;
            gap: 6px;
        }

        .project-filter {
            background: transparent;
            border: 1px solid transparent;
            border-radius: 999px;
            color: var(--tejo-muted);
            cursor: pointer;
            font-size: .78rem;
            font-weight: 800;
            padding: 9px 14px;
        }

        .project-filter:hover,
        .project-filter.active {
            background: #fff;
            border-color: rgba(21,21,21,.1);
            box-shadow: 0 8px 24px rgba(21,21,21,.07);
            color: var(--tejo-ink);
        }

        .projects-grid {
            display: grid;
            gap: 18px;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            position: relative;
            z-index: 1;
        }

        .project-card {
            grid-column: span 4;
            min-width: 0;
        }

        .project-card:nth-child(1),
        .project-card:nth-child(4) {
            grid-column: span 5;
        }

        .project-card:nth-child(2),
        .project-card:nth-child(3),
        .project-card:nth-child(5) {
            grid-column: span 4;
        }

        .project-card:nth-child(4) {
            grid-column: span 4;
        }

        .project-card:nth-child(5) {
            grid-column: span 4;
        }

        .project-card-inner {
            background: #1a1a1a;
            min-height: 380px;
            overflow: hidden;
            position: relative;
        }

        .project-card-media {
            height: 100%;
            min-height: 380px;
            overflow: hidden;
            position: absolute;
            inset: 0;
        }

        .project-card-media::after {
            background: linear-gradient(180deg, rgba(0,0,0,.02) 25%, rgba(0,0,0,.88) 100%);
            content: "";
            inset: 0;
            position: absolute;
        }

        .project-card-media img {
            display: block;
            height: 100%;
            object-fit: cover;
            transition: transform .8s cubic-bezier(.2,.7,.2,1), filter .5s ease;
            width: 100%;
        }

        .project-card:hover .project-card-media img {
            filter: saturate(1.05);
            transform: scale(1.065);
        }

        .project-card-content {
            bottom: 0;
            color: #fff;
            left: 0;
            padding: 25px;
            position: absolute;
            right: 0;
            z-index: 2;
        }

        .project-card-number {
            color: #d6ae78;
            display: block;
            font-size: .67rem;
            font-weight: 800;
            letter-spacing: .1em;
            margin-bottom: 9px;
        }

        .project-card-content h3 {
            color: #fff;
            font-size: 1.55rem;
            letter-spacing: -.025em;
            line-height: 1.05;
            margin: 0 0 16px;
        }

        .project-card-content .project-open {
            color: rgba(255,255,255,.8);
            font-size: .78rem;
        }

        .project-card-content .project-open i {
            background: rgba(255,255,255,.15);
            height: 34px;
            width: 34px;
        }

        .project-card.is-hidden {
            display: none;
        }

        .project-modal {
            align-items: center;
            background: rgba(8,8,8,.84);
            display: flex;
            inset: 0;
            justify-content: center;
            opacity: 0;
            padding: 22px;
            pointer-events: none;
            position: fixed;
            transition: opacity .28s ease;
            z-index: 3000;
        }

        .project-modal.is-open {
            opacity: 1;
            pointer-events: auto;
        }

        .project-modal-dialog {
            background: #fff;
            box-shadow: 0 40px 120px rgba(0,0,0,.4);
            max-height: 92vh;
            max-width: 1180px;
            overflow: auto;
            position: relative;
            transform: translateY(18px) scale(.985);
            transition: transform .3s ease;
            width: 100%;
        }

        .project-modal.is-open .project-modal-dialog {
            transform: translateY(0) scale(1);
        }

        .project-modal-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.25fr) minmax(320px, .75fr);
        }

        .project-modal-image {
            background: #e7e2da;
            min-height: 620px;
        }

        .project-modal-image img {
            display: block;
            height: 100%;
            object-fit: cover;
            width: 100%;
        }

        .project-modal-copy {
            align-self: center;
            padding: 64px 52px;
        }

        .project-modal-copy h3 {
            font-size: clamp(2.2rem, 4vw, 3.8rem);
            letter-spacing: -.045em;
            line-height: .98;
            margin-bottom: 20px;
        }

        .project-modal-copy p {
            margin-bottom: 28px;
        }

        .project-modal-close {
            align-items: center;
            background: rgba(255,255,255,.95);
            border: 1px solid rgba(21,21,21,.12);
            border-radius: 50%;
            color: var(--tejo-ink);
            cursor: pointer;
            display: flex;
            height: 44px;
            justify-content: center;
            position: absolute;
            right: 18px;
            top: 18px;
            width: 44px;
            z-index: 5;
        }

        .project-modal-close:hover {
            background: var(--tejo-ink);
            color: #fff;
        }

        body.project-modal-open {
            overflow: hidden;
        }

        @media (max-width: 991.98px) {
            .project-featured {
                grid-template-columns: 1fr;
            }

            .project-featured-image {
                min-height: 440px;
            }

            .project-featured-content {
                padding: 42px 38px 48px;
            }

            .project-card,
            .project-card:nth-child(n) {
                grid-column: span 6;
            }

            .project-modal-grid {
                grid-template-columns: 1fr;
            }

            .project-modal-image {
                min-height: 430px;
                max-height: 52vh;
            }

            .project-modal-copy {
                padding: 40px;
            }
        }

        @media (max-width: 575.98px) {
            .projects-section {
                padding-left: 0;
                padding-right: 0;
            }

            .projects-heading h2 {
                font-size: 2.65rem;
            }

            .project-featured {
                margin-left: -8px;
                margin-right: -8px;
            }

            .project-featured-image {
                min-height: 310px;
            }

            .project-featured-content {
                padding: 32px 25px 38px;
            }

            .project-featured-content h3 {
                font-size: 2.55rem;
            }

            .project-toolbar {
                align-items: flex-start;
                flex-direction: column;
                gap: 12px;
            }

            .project-filters {
                flex-wrap: wrap;
            }

            .project-card,
            .project-card:nth-child(n) {
                grid-column: 1 / -1;
            }

            .project-card-inner,
            .project-card-media {
                min-height: 360px;
            }

            .project-modal {
                padding: 8px;
            }

            .project-modal-dialog {
                max-height: 96vh;
            }

            .project-modal-image {
                min-height: 270px;
                max-height: 42vh;
            }

            .project-modal-copy {
                padding: 34px 24px 38px;
            }

            .project-modal-close {
                height: 40px;
                right: 12px;
                top: 12px;
                width: 40px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .project-featured-image img,
            .project-card-media img,
            .project-open i,
            .project-modal,
            .project-modal-dialog {
                transition: none !important;
            }
        }
    `;

    if ($('#tejo-portfolio-styles').length === 0) {
        $('<style id="tejo-portfolio-styles">').text(portfolioStyles).appendTo('head');
    }

    var modal = $('#projectModal');

    /* Garante que o modal exista mesmo que o HTML tenha sido simplificado. */
    if (!modal.length && $('.project-open').length) {
        $('body').append(`
            <div class="project-modal" id="projectModal" aria-hidden="true">
                <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
                    <button class="project-modal-close" type="button" aria-label="Fechar projeto">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="project-modal-grid">
                        <div class="project-modal-image"><img id="projectModalImage" src="" alt=""></div>
                        <div class="project-modal-copy">
                            <span class="section-eyebrow" id="projectModalCategory">Projeto</span>
                            <h3 id="projectModalTitle"></h3>
                            <p id="projectModalDescription"></p>
                            <a class="btn btn-primary" id="projectModalContact" href="#" target="_blank" rel="noopener">
                                <i class="fab fa-whatsapp" aria-hidden="true"></i> Falar sobre este projeto
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `);
        modal = $('#projectModal');
    }

    var lastFocused = null;

    var closeModal = function () {
        if (!modal.length) {
            return;
        }

        modal.removeClass('is-open').attr('aria-hidden', 'true');
        $('body').removeClass('project-modal-open');

        if (lastFocused && lastFocused.length) {
            lastFocused.trigger('focus');
        }
    };

    var openModal = function (key, trigger) {
        var project = projects[key];

        if (!project || !modal.length) {
            return;
        }

        lastFocused = trigger;

        $('#projectModalImage').attr({
            src: project.image,
            alt: project.name + ' — Tejo Engenharia'
        });
        $('#projectModalCategory').text(project.category + ' / ' + project.number);
        $('#projectModalTitle').text(project.name);
        $('#projectModalDescription').text(project.description);
        $('#projectModalContact').attr(
            'href',
            'https://wa.me/556199322519?text=' + encodeURIComponent('Olá, gostaria de mais informações sobre o projeto ' + project.name + '.')
        );

        modal.addClass('is-open').attr('aria-hidden', 'false');
        $('body').addClass('project-modal-open');
        $('.project-modal-close').trigger('focus');
    };

    $('.project-open').on('click', function (event) {
        event.preventDefault();
        openModal($(this).data('project'), $(this));
    });

    $('.project-open').on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal($(this).data('project'), $(this));
        }
    });

    $(document).on('click', '.project-modal-close', closeModal);

    $(document).on('click', '.project-modal', function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    $(document).on('keydown', function (event) {
        if (event.key === 'Escape' && modal.hasClass('is-open')) {
            closeModal();
        }
    });

    /* ==========================================================
       FILTROS DO PORTFÓLIO
       ========================================================== */
    $('.project-filter').on('click', function () {
        var filter = $(this).data('filter');

        $('.project-filter').removeClass('active');
        $(this).addClass('active');

        $('.project-card').each(function () {
            var card = $(this);
            var category = card.data('category');
            var show = filter === 'all' || category === filter;

            card.toggleClass('is-hidden', !show);
        });
    });

    /* Fallback elegante caso alguma imagem ainda não tenha sido enviada. */
    $(document).on('error', '.projects-section img', function () {
        var image = $(this);
        if (image.data('fallback-applied')) {
            return;
        }

        image.data('fallback-applied', true);
        image.attr('src', 'img/logotejo.png');
    });

})(jQuery);
