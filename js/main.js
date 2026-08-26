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

})(jQuery);
