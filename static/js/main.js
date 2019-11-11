$(document).ready(function() {

    "use strict";

    //HideShowHeader();
    scrollAnim();
    HeroSection();
    pageLoad();
    ajaxload();
    parallaxbg();
    portfolio();
    blogpost();
    project_slider1();
    project_slider2();
    popupGallery();
    popupVideo();
    contact();
    map();
    BackToTop();
    $('.cursor').css('transform', 'scale(.3)');
});

//Detect device mobile
var isMobile = false;
if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ($(window).width() < 1024)) {
    $('body').addClass('mobile');
    isMobile = true;
} else {
    isMobile = false;
}

//ajax load
function ajaxload() {

    $(document).on('click', '.ajax-link', function(e) {
        e.preventDefault();
        var link = $(this).attr('href');

        if (location.href.indexOf(link) === -1) {
            function hideMain() {
                $('#loading').addClass('in');
                $('#main').css('opacity', '0.3');
                $('#main').removeClass('fadeIn');

                window.history.pushState({ path: link }, '', link);

                $('html, body').animate({ scrollTop: 0 }, 300, function() {
                    function loadContent() {

                        $.ajax({
                            url: link,
                            success: function(response) {
                                $("#main").html($(response).find("#main > *"));

                                $('#main').addClass('fadeIn');
                                $('#loading').removeClass('in');

                                var title = $(response).filter('title').text();
                                $('head title').html(title);
                                $('.textFadeUp').css('opacity', '0');

                                HeroSection();

                                scrollAnim();

                                imgLoad();

                                parallaxbg();

                                portfolio();

                                blogpost();

                                project_slider1();

                                project_slider2();

                                popupGallery();

                                popupVideo();

                                contact();

                                map();

                                BackToTop();

                            }

                        });

                    }
                    setTimeout(loadContent, 300);
                });

            }
            setTimeout(hideMain, 200);
        }
    });
}

//browser next and prev button
window.addEventListener('popstate', function(event) {

    if (event.state) {

        function hideMain() {
            $('#main').css('opacity', '0.3');
            $('#main').removeClass('fadeIn');
            $('#loading').addClass('in');
        }
        setTimeout(hideMain, 200);

        var link = location.href;

        function loadContent() {

            $.ajax({
                url: link,
                success: function(response) {
                    $("#main").html($(response).find("#main > *"));

                    $('#main').addClass('fadeIn');
                    $('#loading').removeClass('in');

                    var title = $(response).filter('title').text();
                    $('head title').html(title);
                    $('.textFadeUp').css('opacity', '0');

                    HeroSection();

                    scrollAnim();

                    imgLoad();

                    parallaxbg();

                    portfolio();

                    blogpost();

                    project_slider1();

                    project_slider2();

                    popupGallery();

                    popupVideo();

                    contact();

                    map();

                    BackToTop();

                }

            });
        }
        setTimeout(loadContent, 300);
    }
}, false);

$(window).on("load", function() {
    $('#loading').removeClass('in');
    imgLoad();
});

//Page Load
function pageLoad() {
    $('body').removeClass('hidden');
    $('#header').addClass('animated fadeInDown');
    $('#loading').addClass('in');

    function loadMain() {
        $('#main').addClass('animated fadeIn');
        $('#loading').removeClass('in');
    }
    setTimeout(loadMain, 300)
}

//Img load
function imgLoad() {
    $('.portfolio-item').each(function() {
        var image = $(this).find('a').data('src');
        $(this).find('.portfolio-img-content').css({ 'background-image': 'url(' + image + ')', 'background-size': 'cover', 'background-position': 'center' });
    });
}

//Parallax Effect
function parallaxbg() {
    if ($('.parallax-inner').length > 0) {
        $('.parallax-background').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'shift',
            animate_duration: 3,
        });

        $('.portfolio-parallax, .fixed-bg').parallaxBackground();
    }
}

//Custom Cursor
if (!isMobile) {
    var $circleCursor = $('.cursor');

    function moveCursor(e) {
        var t = e.clientX + "px",
            n = e.clientY + "px";
        TweenMax.to($circleCursor, .3, {
            left: t,
            top: n,
            ease: 'Power1.easeOut'
        });
    }
    $(window).on('mousemove', moveCursor);

    function zoomCursor() {
        TweenMax.to($circleCursor, .3, {
            opacity: 1,
            scale: 1,
            ease: 'Power1.easeOut'
        });
    }

    $(document).on('mouseenter', 'a, .zoom-cursor', zoomCursor);

    function defaultCursor() {
        TweenLite.to($circleCursor, .1, {
            opacity: 0.5,
            scale: .3,
            ease: 'Power1.easeOut'
        });
    }

    $(document).on('mouseleave', 'a, .zoom-cursor', defaultCursor);
}

function blogpost() {
    var $container = $('.post-container');
    $container.isotope({
        masonry: {
            columnWidth: '.post'
        },
        itemSelector: '.post'
    });
}

//Portfolio masonry
function portfolio() {

    if ($('#portfolio-container').length > 0) {

        var $container = $('#portfolio-container');
        $container.isotope({
            masonry: {
                columnWidth: '.portfolio-item'
            },
            itemSelector: '.portfolio-item'
        });
        $('#filters').on('click', 'li', function() {
            $('#filters li').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({ filter: filterValue });
        });

        //Title Floating Tooltip
        if (!isMobile && $('.title-tooltip').length > 0) {

            $(".cursor").append('<div class="title-caption-tooltip"></div>');
            $("#portfolio-container.title-tooltip").find(".portfolio-item .portfolio-text-content").each(function() {
                    $(".title-caption-tooltip").append($(this))
                }),

                $("#portfolio-container").find(".portfolio-item a").on("mouseenter", function(e) {
                    $(".title-caption-tooltip").children().eq($(this).parent().index()).addClass("hover")
                }).on("mouseleave", function(e) {
                    $(".title-caption-tooltip").children().eq($(this).parent().index()).removeClass("hover")
                }).on("click", function() {
                    $(".title-caption-tooltip").children().eq($(this).parent().index()).removeClass("hover")
                });

            $(".portfolio-item").on('mouseenter', function() {
                $circleCursor.css('background-color', 'transparent');
                $circleCursor.css('mix-blend-mode', 'normal');
            });

            $('.portfolio-item').on('mouseenter', zoomCursor);

            $(".portfolio-item").on('mouseleave', function() {
                $circleCursor.css('background-color', '#ff0000');
                $circleCursor.css('mix-blend-mode', 'multiply');
            });

            $(".no-cursor .portfolio-item").on('mouseleave', function() {
                $circleCursor.css('background-color', 'transparent');
                $circleCursor.css('mix-blend-mode', 'normal');
            });

            $('.portfolio-item').on('mouseleave', defaultCursor);
        }
    }
}

//Flexnav Menu
$(".flexnav").flexNav({ 'animationSpeed': 100 });

$('.menu-button').on('click', function() {
    $('.menu-button').toggleClass('menu-open menu-close');
});

if (isMobile) {
    $('.flexnav li a').on('click', function() {
        $('.menu-button').toggleClass('menu-open menu-close');
        $('.flexnav.standard').removeClass('flexnav-show');
    });
    $('.flexnav li a').on('click', function() {
        $('.flexnav li ul').removeClass('flexnav-show open');
    });
}

//Hide Show Header on Scroll
function HideShowHeader() {

    var didScroll;
    var lastScrollTop = 0;
    var delta = 50;
    var navbarHeight = 250;
    var navbarHideAfter = navbarHeight

    $(window).scroll(function(event) {
        didScroll = true;
    });

    if ($('.scroll-hide').length > 0) {

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 100);

    }

    return false;

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHideAfter) {
            if ($('.scroll-hide').length > 0) {
                $('header').addClass('hide');
            }
        } else {
            if ($('.scroll-hide').length > 0) {
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('hide');
                    $('#header.transparent').addClass('white-bg');
                }
            }

            if ($(window).scrollTop() < 100) {
                $('#header.transparent').removeClass('white-bg');
                $('#header').css('position', 'relative');
            } else {
                $('#header').css('position', 'fixed');
            }
        }

        lastScrollTop = st;

    }

}

//Hero Section
function HeroSection() {

    if ($('#hero').length > 0) {

        var Hero = document.getElementById('hero');
        var windowScrolled;

        window.addEventListener('scroll', function windowScroll() {
            windowScrolled = window.pageYOffset || document.documentElement.scrollTop;

            Hero.style.opacity = (1 - (windowScrolled / 30) / 15);

            if ($('#hero').hasClass('split')) {
                Hero.style.opacity = 1;
            }

        });
    }

}

//Project Slider 1
function project_slider1() {
    if ($('#projectSlider1').length > 0) {
        var testimonialSwiper = new Swiper('#projectSlider1', {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                800: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
            }
        });
    }
}

//Project Slider 2
function project_slider2() {
    if ($('#projectSlider2').length > 0) {
        var testimonialSwiper = new Swiper('#projectSlider2', {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            //effect: 'fade',
        });
    }
}

//Magnific Pop Up
function popupGallery() {
    if ($('.popup-gallery').length > 0) {
        $('.popup-gallery').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    }
}

function popupVideo() {
    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
}

//Back To Top
function BackToTop() {

    $('.scrolltotop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $('.scrolltotop').fadeOut();

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 600) {
            $('.scrolltotop').fadeIn();
        } else {
            $('.scrolltotop').fadeOut();
        }
    });

}

//Contact Form
function contact() {

    if ($('#contactForm').length > 0) {

        $("#contactForm").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                formError();
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                event.preventDefault();
                submitForm();
            }
        });

        function submitForm() {
            var name = $("#name").val();
            var email = $("#email").val();
            var msg_subject = $("#msg_subject").val();
            var message = $("#message").val();
            $.ajax({
                type: "POST",
                url: "php/form-process.php",
                data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
                success: function(text) {
                    if (text == "success") { formSuccess(); } else {
                        formError();
                        submitMSG(false, text);
                    }
                }
            });
        }

        function formSuccess() {
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Submitted!")
        }

        function formError() { $("#contactForm").removeClass('').addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { $(this).removeClass(); }); }

        function submitMSG(valid, msg) {
            if (valid) { var msgClasses = "h3 text-center tada animated text-success"; } else { var msgClasses = "h3 text-center text-danger"; }
            $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
    }
}

// Map
function map() {
    if ($('#mapid').length > 0) {
        var lat = $('#mapid').data('lat');
        var lang = $('#mapid').data('lang');
        var marker = "<img src='" + $('#mapid').data('markericon') + "'>";
        var mymap = L.map('mapid').setView([lat, lang], 20);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        var popup = L.popup()
            .setLatLng([lat, lang])
            .setContent(marker)
            .openOn(mymap);
    }
}

function scrollAnim() {

    // init ScrollMagic
    var scrollMagic = new ScrollMagic.Controller();

    // Animation text line
    var textFadeUp = $('.textFadeUp');

    textFadeUp.css('opacity', '1');

    textFadeUp.each(function(i) {
        var splitone = new SplitText(textFadeUp[i], { type: 'lines' });
        var tweenLine = new TimelineMax({
            delay: 0.6,
        });

        //if (!isMobile) {
        tweenLine.staggerFrom(splitone.lines, .6, {
            y: 50,
            opacity: 0,
            ease: 'Circ.easeOut'
        }, 0.2);
        //}

        new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 'onEnter',
                reverse: false
            })
            .setTween(tweenLine)
            .addTo(scrollMagic);
    });

    // Reveal
    var reveal = document.querySelectorAll('.reveal-effect');

    $.each(reveal, function(index, reveal_item) {
        // if (!isMobile) {
        new ScrollMagic.Scene({
                triggerElement: reveal_item,
                triggerHook: 'onEnter',
                reverse: false
            })
            .setClassToggle(reveal_item, 'animated')
            .addTo(scrollMagic);
        // }
    });
}