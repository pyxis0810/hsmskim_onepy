var $ = jQuery = require('jquery');
var Instafeed = require('instafeed.js');
require('./jquery.easings.min');
require('./jquery.slimscroll.min');
require('./jquery.fullPage');
require('bootstrap-sass');

$(function(){

    var $global = $(window),
        $logo = $("#logo"),
        $window = $(".window"),
        $footer = $(".footer");

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

    var userFeed = new Instafeed({
        get: 'user',
        userId: 2084305522,
        accessToken: '2084305522.467ede5.ca16029b92974e428ba0770abd9e4a4d',
        resolution: 'standard_resolution',
        limit: 12,
        template: '<div class="item"><a href="{{link}}"><img class="image" src="{{image}}" /><div class="caption"><span class="instagram"></span> 1py_dream<br>{{caption}}"</div></a></div>',
        after: function() {
            /*var documentWidth = $( document ).width();
            var documentHeight = $( document ).height();
            if(documentWidth > 980) {
                var w = documentWidth/4;
                var h = documentHeight/2;
                $('#instafeed .item').css({'width': w+'px', 'height': h+'px'});
            } else {
                var w = documentWidth/2;
                var h = documentHeight/3
                $('#instafeed .item').css({'width': w+'px', 'height': h+'px'});
            }*/
        }
    });
    userFeed.run();

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
