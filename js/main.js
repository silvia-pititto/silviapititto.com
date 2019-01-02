/*!
 * silviapititto.com
 * Copyright 2019 Silvia Pititto
 *
 */
(function ($) {
  "use strict";

  // Fast click
  FastClick.attach(document.body);

  $(function() {
    "use strict"; // Start of use strict
    $("a.page-scroll").click(function(event) {
      //            event.preventDefault();
      //            var $anchor = $(this);
      var $anchor = $(this).attr("href");
      $("html, body").stop().animate({
        scrollTop: ($($anchor).offset().top)
      }, 1250, "easeInOutExpo");
      event.preventDefault();
    });

    //#to-top button appears after scrolling
    var fixed = false;
    // show go to top on scroll only on desktop or tabletss
    if($(window).width() > 736){
      $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
          if (!fixed) {
            fixed = true;
            // $("#to-top").css({position:"fixed", display:"block"});
            $("#to-top").show("slow", function() {
              $("#to-top").css({
                position: "fixed",
                display: "block"
              });
            });
          }
        } else {
          if (fixed) {
            fixed = false;
            $("#to-top").hide("slow", function() {
              $("#to-top").css({
                display: "none"
              });
            });
          }
        }
      });
    }
    // Toggles site-notice page
    function toggleScreen(e, pageId, isClosing){
      e.preventDefault();
      // fadeIn dimScreen
      $(pageId).fadeToggle("fast", "linear", function(){
        if(pageId !== "#site-notice" && !isClosing){
          // stop the scroll on the bottom page (toggle scroll)
          $("html").css("overflow", "hidden");
          $(pageId).css("overflow-y", "scroll");
        } else if(isClosing) {
          // restore the scroll
          $("html").css("overflow-y", "auto");
          $("html").css("overflow-x", "hidden");
        }
        return;
      });
    } // end of toggleScreen()

    $("#site-notice-link , #close-btn").on("click",function(e){
      e.preventDefault();
      if($(e.currentTarget).attr("id") === "site-notice-link"){
        toggleScreen(e, "#site-notice");
      }else{
        // close site notice
        toggleScreen(e, "#site-notice", true);
      }
    });

    $(".portfolio-box-caption, .close-project-btn").on("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      var projectId, projectName = "";
      var isClosing = false;
      var target = $(e.currentTarget);
      var targetClass = target.attr("class");

      if(targetClass === "portfolio-box-caption"){
        // open project
        projectName = $.trim(target.attr("id"));
        projectId = "#"+projectName+"-project";
      } else {
        // close project
        projectName = $.trim(target.siblings(".project-title").text());
        projectName = projectName.replace(/\s+/g, "-").toLowerCase();
        projectId = "#"+projectName+"-project";
        isClosing = true;
      }
      toggleScreen(e, projectId, isClosing);

    });
    // Closes menu when menu items are clicked
    $(".menu-item, .overlay label").on("click", function(e){
      e.preventDefault();
      $("#menu").prop("checked", false);
    });
    // Opens menu when menu items are clicked
    $(".lower label").on("click", function(e){
      e.preventDefault();
      $("#menu").prop("checked", true);
    });

    /* Scroll Reveal */
    var fooReveal = {
      delay    : 200,
      viewFactor: 0.6,
      easing   : "ease-in-out",
      scale    : 1.1,
      mobile: true
    };

    var logoReveal = {
      delay: 210,
      easing: 'ease-in', //"cubic-bezier(0.075, 0.82, 0.165, 1)",
      mobile: true
    };

    var sr =  ScrollReveal();
    sr.reveal(".reveal-home, .reveal-logo", logoReveal, 50);
    sr.reveal(".reveal-footer, .reveal-about , .reveal-work", fooReveal);
  });

  /* Swiper */
  var spaceBetweenSlides = 20;
  var slidesPerView = 2;
  var minSpaceBetweenSlides = 10;
  var minSlidesPerView = 1;
  var breakpoints = {
    // when window width is <= 320px
    320: {
      slidesPerView: minSlidesPerView,
      spaceBetween: minSpaceBetweenSlides,
      autoHeight: true,
      width: 260,
      centeredSlides: true
    },
    // when window width is <= 480px
    480: {
      slidesPerView: minSlidesPerView,
      spaceBetween: minSpaceBetweenSlides,
      autoHeight: true,
      width: 360,
      centeredSlides: true
    },
    // when window width is <= 640px
    640: {
      slidesPerView: minSlidesPerView,
      spaceBetween: minSpaceBetweenSlides,
      autoHeight: true,
      width: 550,
      centeredSlides: true
    },
    // when window width is <= 896px
    896: {
      slidesPerView: minSlidesPerView,
      spaceBetween: minSpaceBetweenSlides,
      autoHeight: true,
      width: 800,
      centeredSlides: true
    }
  };

  var swiperOptions = {
    slidesPerView: slidesPerView,
    spaceBetween: spaceBetweenSlides,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    observer: true,
    observeParents: true,
    breakpoints: breakpoints,
  };


  var swiper2 = new Swiper(".s2", swiperOptions);
  var swiper2 = new Swiper(".s3", swiperOptions);
  var swiper1 = new Swiper(".s1", swiperOptions);

  /* Focus Contact2 */
  $(".input2").each(function(){
    $(this).on("blur", function(){
      if($(this).val().trim() != "") {
        $(this).addClass("has-val");
      }
      else {
        $(this).removeClass("has-val");
      }
    });
  });

  /* Validate */
  var name = $('.validate-input input[name="name"]');
  var email = $('.validate-input input[name="email"]');
  var message = $('.validate-input textarea[name="message"]');


  $(".validate-form").on("submit",function(){
    var check = true;

    if($(name).val().trim() == "") {
      showValidate(name);
      check=false;
    }

    if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      showValidate(email);
      check=false;
    }

    if($(message).val().trim() == ""){
      showValidate(message);
      check=false;
    }

    return check;
  });


  $(".validate-form .input2").each(function(){
    $(this).focus(function(){
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

})(jQuery);
