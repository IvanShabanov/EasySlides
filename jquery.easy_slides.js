/*
(c) 2017 Шабанов Иван
Usage:

   $('.slider').EasySlides({
      'autoplay': true,
      'timeout': 3000,
      'show': 5});

*/
(function( $ ){

  $.fn.EasySlides = function( options ) {  
    var settings = $.extend( {
      'autoplay': false,
      'timeout': 3000,
      'show': 5
    }, options);
    return this.each(function() {        
      var this_slider = this;
      var EasySlidesTimer;
      var count = $(this_slider).children('*:not(.next_button, .prev_button)').length;
      var cur_slider = 0;
      while (count < settings['show']) {
        var html = $(this_slider).html();
        $(html).appendTo(this_slider);
        $(this_slider).children('.next_button:eq(0), .prev_button:eq(0)').remove();
        count = $(this_slider).children('*:not(.next_button, .prev_button)').length;
      }

      var EasySlidesNext = function (nextslide) {
        var i = 0;
        if (count > 0) {
          if (typeof nextslide == 'number') {
            cur_slider = nextslide;
          } else {
            cur_slider ++;
            nextslide = cur_slider;
          }

          while (nextslide < 0) {nextslide = nextslide + count;}
          while (nextslide > count) {nextslide = nextslide - count;}
     
          i = 0;
          $(this_slider).children('*:not(.next_button, .prev_button)').each(function() {
            var cssclass = '';
            var icount = 0;
            console.log(nextslide);
            icount = i - nextslide ;
            console.log(icount);
            while (icount < 0) {
              icount = icount + count;
            };
            
            while (icount > count) {
              icount = icount - count;
            };
                 

            if (icount == 0) {
              cssclass = 'active';
              $(this_slider).find('.' + cssclass).removeClass(cssclass);
              $(this).removeClass('hidden');
              $(this).addClass(cssclass);
            } else if (icount < settings['show'] / 2) {
              cssclass = 'next' + icount;
              $(this_slider).find('.' + cssclass).removeClass(cssclass);
              $(this).removeClass('hidden');
              $(this).addClass(cssclass);
            } else if (icount > count - (settings['show'] / 2)) {
              cssclass = 'prev' + (count - icount);
              $(this_slider).find('.' + cssclass).removeClass(cssclass);        
              $(this).removeClass('hidden');
              $(this).addClass(cssclass);
            } else {
              $(this).addClass('hidden');
            }
            i++;
            
          });
          if (settings['autoplay']) {
            clearTimeout(EasySlidesTimer);
            EasySlidesTimer = setTimeout(function() {
              EasySlidesNext();}, 
              settings['timeout']);
          }
        }

      };

      
      
      EasySlidesNext(0);
      $(this_slider).children(':not(.next_button, .prev_button)').click(function () {
        EasySlidesNext( $(this_slider).children().index(this) );
      });
      $(this_slider).find('.next_button').click(function() {
        EasySlidesNext();
      });
      $(this_slider).find('.prev_button').click(function() {
              cur_slider --;
              EasySlidesNext(cur_slider);

      });
      var mousedowned = false;
      $(this_slider).on('mousedown', function(e) {
          $(this).data('posstart', { x: e.pageX, y: e.pageY });
          mousedowned = true;
      }).on('mouseup, mouseout', function(e) {
        if (mousedowned) {
          var p0 = $(this).data('posstart'),
              p1 = { x: e.pageX, y: e.pageY },
              d = p1.x - p0.x;
          mousedowned = false;
          $(this).removeData('posstart');              
          if (Math.abs(d) > 4) {
            if (d > 0) {
              cur_slider --;
              EasySlidesNext(cur_slider);
            } else if (d < 0) {
              EasySlidesNext();
            }
          }
        }
      }).on('mousemove', function(e) {
        if (mousedowned) {
          var p0 = $(this).data('posstart'),
              p1 = { x: e.pageX, y: e.pageY },
              d = p1.x - p0.x;
          if (Math.abs(d) > 4) {
            if (d > (0.5 * $(this).find('.active').width())) {
              $(this).data('posstart', { x: e.pageX, y: e.pageY });
              cur_slider --;
              EasySlidesNext(cur_slider);
            } else if (d < (-0.5 * $(this).find('.active').width())) {
              $(this).data('posstart', { x: e.pageX, y: e.pageY });
              EasySlidesNext();
            }
          }
        }
      });         
    });
  }
})( jQuery );


