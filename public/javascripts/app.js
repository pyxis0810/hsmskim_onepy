var $ = jQuery = require('jquery');
require('./jquery.easings.min');
require('./jquery.slimscroll.min');
require('./jquery.fullPage');
require('bootstrap-sass');

$(function(){

    var $global = $(window),
        $logo = $("#logo"),
        $window = $(".window"),
        $footer = $(".footer");

    var init = function() {
        $.ajax({
          url: '/instagram'
        }).done(function(res) {
          console.log(res);
        });
    };

    var oldSlimScroll = $.fn.slimScroll;
    $.fn.slimScroll = function( options ){
        //options.wheelStep = 150;
        options.touchScrollStep  = 60;
        return oldSlimScroll.apply(this, [options] );
    };

    $('#fullpage').fullpage({
        //anchors:['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6'],
        css3: true,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        scrollingSpeed: 500,
        autoScrolling: true,
        sectionsColor: [],
        navigation: true,
        navigationPosition: 'right',
        loopBottom: true,
        loopTop: true,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
        scrollOverflow: true,
        controlArrows: false,
        afterLoad: function(anchorLink, index){

        },
        onLeave: function(index, nextIndex, direction){
            if(nextIndex == 1) {

            }
            if(nextIndex == 2 ) {
                $window.addClass('scale-up-15 fill-color');
                $('.window-content').show();
            }
            if( index == 2 ) {
                $window.removeClass('scale-up-15 fill-color');
                $('.window-content').hide();
            }
            if(nextIndex == 3) {

            }
            if ( index == 3 ) {

            }
            if( nextIndex == 1 || nextIndex == 2 ) {
                $('.window').show();
            } else {
                $('.window').hide();
            }
            /*if( nextIndex == 3 || nextIndex == 4 || nextIndex == 6 ) {
                $('#logo').hide();
            } else {
                $('#logo').show();
            }*/
            if( nextIndex == 7 ) {
                $footer.show().addClass('slide');
                if( $(window).width() > 768 ) {
                    var w = $('.section7-box-1').width();
                    $('.section7-box-1, .section7-box-2').css('height', w);
                } else {
                    $('.section7-box-1, .section7-box-2').css('height', '');
                }
                $global.on('resize', function() {
                    if( $(window).width() > 768 ) {
                        var w = $('.section7-box-1').width();
                        $('.section7-box-1, .section7-box-2').css('height', w);
                    } else {
                        $('.section7-box-1, .section7-box-2').css('height', '');
                    }
                });
            } else {
                $footer.removeClass('slide');
                $global.off('resize');
            }
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){

        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {

        }
    });



    /*function doOnOrientationChange()
    {

        var documentWidth = $( document ).width();
        var documentHeight = $( document ).height();

        switch(window.orientation)
        {
            case -90:
            case 90:
                var w = documentWidth/4;
                var h = documentHeight/2;
                $('#instafeed .item').css({'width': w+'px', 'height': h+'px'});
                break;
            default:
                var w = documentWidth/2;
                var h = documentHeight/3
                $('#instafeed .item').css({'width': w+'px', 'height': h+'px'});
                break;
        }
    }

    window.addEventListener('orientationchange', doOnOrientationChange);

    // Initial execution if needed
    doOnOrientationChange();*/

    init();

    $('#logo').on('click', function() {
        //console.log(window.location);
        var url = window.location.pathname;
        window.location.href = url;
    });

    $('body').on('click', '#join', function() {
        $('#joinModal').modal();
    });

    $('.slidePrev').on('click', function() {
        $.fn.fullpage.moveSlideLeft();
    });
    $('.slideNext').on('click', function() {
        $.fn.fullpage.moveSlideRight();
    });

});
