/*
 * silviapititto.com
 * Copyright 2024 Silvia Pititto
 *
 */
(function ($) {
  "use strict";

  var isDesktop = false;
  if (
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  ) {
    isDesktop = false;
  } else {
    isDesktop = true;
    $("html").addClass("scroll-snap");
    $("section, header, footer").addClass("scroll-snap-section");
  }

  // Fast click
  FastClick.attach(document.body);

  // MARK: - Functions

  // DOCUMENT READY
  $(document).ready(function () {
    $("a.page-scroll").click(function (event) {
      // Remove scroll snap
      if (isDesktop) {
        $(".scroll-snap").css("scroll-snap-type", "none");
      }
      event.preventDefault();
      const $anchor = $(this).attr("href");
      // animate
      $("html").animate(
        {
          scrollTop: $($anchor).offset().top,
        },
        1250,
        "easeInOutExpo",
        function () {
          // Resume scroll snap
          if (isDesktop) {
            $(".scroll-snap").css("scroll-snap-type", "y mandatory");
          }
        }
      );
    });

    //#to-top button appears after scrolling
    var fixed = false;
    // show go to top on scroll only on desktop or tablets
    if ($(window).width() > 736) {
      $(document).scroll(function () {
        if ($(this).scrollTop() > 250) {
          if (!fixed) {
            fixed = true;
            // $("#to-top").css({position:"fixed", display:"block"});
            $("#to-top").show("slow", function () {
              $("#to-top").css({
                position: "fixed",
                display: "block",
              });
            });
          }
        } else {
          if (fixed) {
            fixed = false;
            $("#to-top").hide("slow", function () {
              $("#to-top").css({
                display: "none",
              });
            });
          }
        }
      });
    }
    // Toggles site-notice page
    function toggleScreen(e, pageId, isClosing) {
      e.preventDefault();
      // fadeIn dimScreen
      $(pageId).fadeToggle("fast", "linear", function () {
        if (pageId !== "#site-notice" && !isClosing) {
          // stop the scroll on the bottom page (toggle scroll)
          $("html").css("overflow-y", "hidden");
          $(pageId).css("overflow-y", "scroll");
        } else if (isClosing) {
          // restore the scroll
          $("html").css("overflow-y", "scroll");
          $("html").css("overflow-x", "hidden");
        }
        return;
      });
    } // end of toggleScreen()

    $("#site-notice-link , #close-btn").on("click", function (e) {
      e.preventDefault();
      if ($(e.currentTarget).attr("id") === "site-notice-link") {
        toggleScreen(e, "#site-notice");
      } else {
        // close site notice
        toggleScreen(e, "#site-notice", true);
      }
    });

    $(".portfolio-box-caption, .close-project-btn").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var projectId,
        projectName = "";
      var isClosing = false;
      const target = $(e.currentTarget);
      const targetClass = target.attr("class");

      if (targetClass === "portfolio-box-caption") {
        // open project
        projectName = $.trim(target.attr("id"));
        projectId = "#" + projectName + "-project";
      } else {
        // close project
        projectName = target.parents(".project-container").attr("id");
        projectId = "#" + projectName;
        isClosing = true;
      }
      toggleScreen(e, projectId, isClosing);
    });
    // Closes menu when menu items are clicked
    $(".menu-item, .overlay label").on("click", function (e) {
      e.preventDefault();
      $("#menuButton").toggleClass("change");
      $("#menu-overlay").toggleClass("open-menu");
    });

    /* Scroll Reveal */
    const fooReveal = {
      delay: 200,
      viewFactor: 0.6,
      easing: "ease-in-out",
      scale: 1.1,
      mobile: true,
    };
    const sr = ScrollReveal();
    sr.reveal(".reveal-footer, .reveal-about , .reveal-work", fooReveal);

    /* Swiper */
    const slidesPerView = 3;
    const minSpaceBetweenSlides = 10;
    const minSlidesPerView = 1;
    const breakpoints = {
      // when window width is <= 320px
      320: {
        slidesPerView: minSlidesPerView,
        spaceBetween: minSpaceBetweenSlides,
        width: 260,
      },
      // when window width is <= 480px
      480: {
        slidesPerView: minSlidesPerView,
        spaceBetween: minSpaceBetweenSlides,
        width: 360,
      },
      // when window width is <= 640px
      640: {
        slidesPerView: minSlidesPerView,
        spaceBetween: minSpaceBetweenSlides,
        width: 550,
      },
      // when window width is >= 896px
      896: {
        slidesPerView: minSlidesPerView,
        spaceBetween: minSpaceBetweenSlides,
        width: 800,
        centeredSlides: true,
      },
    };

    const swiperOptions = {
      slidesPerView: slidesPerView,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      observer: true,
      observeParents: true,
      breakpoints: breakpoints,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    };

    const s1 = new Swiper(".s1", swiperOptions);
    const s2 = new Swiper(".s2", swiperOptions);
    const s3 = new Swiper(".s3", swiperOptions);

    /* Focus Contact */
    $(".input2").each(function () {
      $(this).on("blur", function () {
        if ($(this).val().trim() != "") {
          $(this).addClass("has-val");
        } else {
          $(this).removeClass("has-val");
        }
      });
    });

    /* Contact Form Validation */
    const name = $('.validate-input input[name="name"]');
    const email = $('.validate-input input[name="email"]');
    const message = $('.validate-input textarea[name="message"]');

    $(".validate-form").on("submit", function () {
      var check = true;
      if ($(name).val().trim() == "") {
        showValidate(name);
        check = false;
      }
      if (
        $(email)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        showValidate(email);
        check = false;
      }
      if ($(message).val().trim() == "") {
        showValidate(message);
        check = false;
      }
      return check;
    });

    $(".validate-form .input2").each(function () {
      $(this).focus(function () {
        hideValidate(this);
      });
    });

    function showValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).addClass("alert-validate");
    }

    function hideValidate(input) {
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
  });
})(jQuery);

// Globals
function toggleMenuButton(x) {
  x.classList.toggle("change");
  $("#menu-overlay").toggleClass("open-menu");
}
