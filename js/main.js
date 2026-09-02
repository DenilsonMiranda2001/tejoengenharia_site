(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 120);
    };
    spinner();

    new WOW().init();

    var toggleHeaderState = function () {
        if ($(window).scrollTop() > 20) {
            $('.site-header').addClass('shadow-sm');
        } else {
            $('.site-header').removeClass('shadow-sm');
        }
    };
    toggleHeaderState();
    $(window).on('scroll', toggleHeaderState);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 160) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 900, 'easeInOutExpo');
        return false;
    });

    $('a[href^="#"]').not('.back-to-top').on('click', function (event) {
        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('.navbar-collapse').collapse('hide');

            $('html, body').animate({
                scrollTop: target.offset().top - $('.site-header').outerHeight()
            }, 750, 'easeInOutExpo');

            if (history.pushState) {
                history.pushState(null, '', $(this).attr('href'));
            }
        }
    });

    if ($(window).width() >= 576) {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 900,
            loop: true,
            dots: true,
            nav: false,
            items: 1
        });
    } else {
        $(".header-carousel").addClass("header-carousel-static");
    }

    /* ==========================================================
       PORTFÓLIO — projetos reais apresentados no site oficial
       A ordem acompanha o portfólio atual da Tejo Engenharia.
       ========================================================== */
    var projects = [
        {
            name: 'Casa Barra',
            category: 'Residencial',
            image: 'img/project-1.png',
            description: 'Residência de alto padrão com arquitetura contemporânea, grandes vãos e forte integração com a paisagem.'
        },
        {
            name: 'Casa Taipa',
            category: 'Residencial',
            image: 'img/project-2.png',
            description: 'Projeto residencial contemporâneo que combina materiais naturais, transparência e integração entre os ambientes.'
        },
        {
            name: 'Casa Duo',
            category: 'Residencial',
            image: 'img/project-3.png',
            description: 'Residência marcada pelo contraste entre materiais, iluminação e superfícies envidraçadas.'
        },
        {
            name: 'Casa Átria',
            category: 'Residencial',
            image: 'img/project-4.png',
            description: 'Projeto contemporâneo com materiais de alto padrão, iluminação natural e linguagem arquitetônica atemporal.'
        },
        {
            name: 'Casa Eli',
            category: 'Residencial',
            image: 'img/project-5.png',
            description: 'Residência que explora o encontro entre pedra, vidro e volumes arquitetônicos contemporâneos.'
        },
        {
            name: 'Escritório Tejo Engenharia',
            category: 'Institucional',
            image: 'img/project-6.png',
            description: 'Espaço da própria Tejo Engenharia pensado para unir identidade, amplitude, funcionalidade e sofisticação.'
        }
    ];

    var projectStyles = `
        .projects-section .section-heading {
            margin-bottom: 52px;
        }

        .project-showcase {
            align-items: stretch;
        }

        .project-gallery {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
        }

        .project-item {
            background: #151515;
            border: 0;
            display: block;
            min-height: 360px;
            overflow: hidden;
            position: relative;
            text-decoration: none;
            transform: translateZ(0);
        }

        .project-item::before {
            background: linear-gradient(180deg, rgba(21,21,21,0) 30%, rgba(21,21,21,.86) 100%);
            content: "";
            inset: 0;
            pointer-events: none;
            position: absolute;
            transition: opacity .4s ease;
            z-index: 2;
        }

        .project-item img {
            height: 100%;
            inset: 0;
            object-fit: cover;
            position: absolute;
            transition: transform .8s cubic-bezier(.2,.7,.2,1), filter .5s ease;
            width: 100%;
        }

        .project-item:hover img,
        .project-item:focus-visible img {
            filter: saturate(1.05);
            transform: scale(1.06);
        }

        .project-item:hover,
        .project-item:focus-visible {
            box-shadow: 0 28px 65px rgba(21,21,21,.18);
            transform: translateY(-5px);
        }

        .project-item-content {
            bottom: 0;
            color: #fff;
            left: 0;
            padding: 24px;
            position: absolute;
            right: 0;
            z-index: 3;
        }

        .project-item-category {
            align-items: center;
            color: #e2b77e;
            display: flex;
            font-size: .68rem;
            font-weight: 800;
            gap: 9px;
            letter-spacing: .08em;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .project-item-category::before {
            background: currentColor;
            content: "";
            height: 2px;
            width: 24px;
        }

        .project-item-title {
            color: #fff;
            font-family: "Space Grotesk", "Inter", sans-serif;
            font-size: 1.45rem;
            line-height: 1.05;
            margin: 0;
        }

        .project-item-action {
            align-items: center;
            background: rgba(255,255,255,.12);
            border: 1px solid rgba(255,255,255,.25);
            border-radius: 999px;
            display: inline-flex;
            font-size: .76rem;
            font-weight: 800;
            gap: 8px;
            margin-top: 14px;
            opacity: 0;
            padding: 8px 12px;
            transform: translateY(8px);
            transition: opacity .35s ease, transform .35s ease, background .35s ease;
        }

        .project-item:hover .project-item-action,
        .project-item:focus-visible .project-item-action {
            opacity: 1;
            transform: translateY(0);
        }

        .project-modal {
            align-items: center;
            background: rgba(10,10,10,.82);
            display: flex;
            inset: 0;
            justify-content: center;
            opacity: 0;
            padding: 24px;
            pointer-events: none;
            position: fixed;
            transition: opacity .3s ease;
            z-index: 2000;
        }

        .project-modal.is-open {
            opacity: 1;
            pointer-events: auto;
        }

        .project-modal-dialog {
            background: #fff;
            box-shadow: 0 35px 100px rgba(0,0,0,.35);
            max-height: min(90vh, 820px);
            max-width: 1120px;
            overflow: auto;
            position: relative;
            transform: translateY(18px) scale(.98);
            transition: transform .35s ease;
            width: 100%;
        }

        .project-modal.is-open .project-modal-dialog {
            transform: translateY(0) scale(1);
        }

        .project-modal-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr);
        }

        .project-modal-image {
            background: #ece9e4;
            min-height: 560px;
        }

        .project-modal-image img {
            display: block;
            height: 100%;
            object-fit: cover;
            width: 100%;
        }

        .project-modal-copy {
            align-self: center;
            padding: 56px;
        }

        .project-modal-copy .section-eyebrow {
            margin-bottom: 18px;
        }

        .project-modal-copy h3 {
            font-size: clamp(2.1rem, 4vw, 3.5rem);
            line-height: 1;
            margin-bottom: 22px;
        }

        .project-modal-copy p {
            margin-bottom: 28px;
        }

        .project-modal-close {
            align-items: center;
            background: #fff;
            border: 1px solid rgba(21,21,21,.12);
            border-radius: 50%;
            color: #151515;
            display: flex;
            font-size: 1.1rem;
            height: 42px;
            justify-content: center;
            position: absolute;
            right: 18px;
            top: 18px;
            width: 42px;
            z-index: 5;
        }

        .project-modal-close:hover {
            background: #151515;
            color: #fff;
        }

        body.project-modal-open {
            overflow: hidden;
        }

        @media (max-width: 991.98px) {
            .project-gallery {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .project-item {
                min-height: 330px;
            }

            .project-modal-grid {
                grid-template-columns: 1fr;
            }

            .project-modal-image {
                min-height: 42vh;
                max-height: 460px;
            }

            .project-modal-copy {
                padding: 38px;
            }
        }

        @media (max-width: 575.98px) {
            .project-gallery {
                gap: 14px;
                grid-template-columns: 1fr;
            }

            .project-item {
                min-height: 390px;
            }

            .project-item-content {
                padding: 22px;
            }

            .project-item-action {
                opacity: 1;
                transform: none;
            }

            .project-modal {
                padding: 10px;
            }

            .project-modal-dialog {
                max-height: 94vh;
            }

            .project-modal-image {
                min-height: 300px;
                max-height: 42vh;
            }

            .project-modal-copy {
                padding: 30px 24px 34px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .project-item,
            .project-item img,
            .project-item-action,
            .project-modal,
            .project-modal-dialog {
                transition: none !important;
            }
        }
    `;

    $('<style id="tejo-project-styles">').text(projectStyles).appendTo('head');

    var projectItems = $('.project-gallery .project-item');

    if (projectItems.length) {
        projectItems.each(function (index) {
            var item = $(this);
            var project = projects[index];

            if (!project) {
                return;
            }

            item.attr('href', '#projeto-' + (index + 1));
            item.attr('aria-label', 'Conhecer o projeto ' + project.name);
            item.attr('role', 'button');
            item.attr('tabindex', '0');

            var image = item.find('img');
            image.attr('src', project.image);
            image.attr('alt', project.name + ' — Tejo Engenharia');

            item.find('span').remove();
            item.append(
                '<div class="project-item-content">' +
                    '<span class="project-item-category">' + project.category + '</span>' +
                    '<h3 class="project-item-title">' + project.name + '</h3>' +
                    '<span class="project-item-action">Ver projeto <i class="fas fa-arrow-right" aria-hidden="true"></i></span>' +
                '</div>'
            );
        });

        $('body').append(
            '<div class="project-modal" id="projectModal" aria-hidden="true">' +
                '<div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">' +
                    '<button class="project-modal-close" type="button" aria-label="Fechar projeto"><i class="fas fa-times" aria-hidden="true"></i></button>' +
                    '<div class="project-modal-grid">' +
                        '<div class="project-modal-image"><img id="projectModalImage" src="" alt=""></div>' +
                        '<div class="project-modal-copy">' +
                            '<span class="section-eyebrow" id="projectModalCategory">Projeto</span>' +
                            '<h3 id="projectModalTitle"></h3>' +
                            '<p id="projectModalDescription"></p>' +
                            '<a class="btn btn-primary" id="projectModalContact" href="https://wa.me/556199322519?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20um%20projeto%20da%20Tejo%20Engenharia." target="_blank" rel="noopener">' +
                                '<i class="fab fa-whatsapp" aria-hidden="true"></i> Falar sobre este projeto' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );

        var modal = $('#projectModal');
        var lastFocusedItem = null;

        var closeProjectModal = function () {
            modal.removeClass('is-open').attr('aria-hidden', 'true');
            $('body').removeClass('project-modal-open');
            if (lastFocusedItem) {
                lastFocusedItem.trigger('focus');
            }
        };

        var openProjectModal = function (index, item) {
            var project = projects[index];
            if (!project) {
                return;
            }

            lastFocusedItem = item;
            $('#projectModalImage').attr({ src: project.image, alt: project.name + ' — Tejo Engenharia' });
            $('#projectModalCategory').text(project.category);
            $('#projectModalTitle').text(project.name);
            $('#projectModalDescription').text(project.description);
            $('#projectModalContact').attr('href', 'https://wa.me/556199322519?text=' + encodeURIComponent('Olá, gostaria de mais informações sobre o projeto ' + project.name + '.'));

            modal.addClass('is-open').attr('aria-hidden', 'false');
            $('body').addClass('project-modal-open');
            $('.project-modal-close').trigger('focus');
        };

        projectItems.on('click', function (event) {
            event.preventDefault();
            openProjectModal($(this).index(), $(this));
        });

        projectItems.on('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectModal($(this).index(), $(this));
            }
        });

        $('.project-modal-close').on('click', closeProjectModal);

        modal.on('click', function (event) {
            if (event.target === this) {
                closeProjectModal();
            }
        });

        $(document).on('keydown', function (event) {
            if (event.key === 'Escape' && modal.hasClass('is-open')) {
                closeProjectModal();
            }
        });
    }

})(jQuery);
