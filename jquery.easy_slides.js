/*
EasySlides - слидер
Autor 2017 Shabanov Ivan (Шабанов Иван)
Usage:
   

   $('.slider').EasySlides({
      'autoplay': true, 
      'timeout': 3000,
      'show': 5, //how many items not hidden
      'vertical': false,  //is vertical slider. If true slides changing by up/down mouse move
      'reverse': false, //Reverse slideк control 
      'mouseevents': true,
      'beforeshow': function () {},
      'aftershow': function () {},      
      });

*/
(function( $ ){

  $.fn.EasySlides = function( options ) {  
    var settings = $.extend( {
      'autoplay': false,
      'timeout': 3000,
      'show': 5,
      'vertical': false,
      'reverse': false,
      'mouseevents': true,
      'beforeshow': function () {},
      'aftershow': function () {},
    }, options);
    return this.each(function() {        
      var this_slider = this;
      var EasySlidesTimer;
      var count = $(this_slider).children('*:not(.next_button, .prev_button)').length;
      var cur_slider = 0;
      var mousedowned = false;
      while (count < settings['show']) {
        var html = $(this_slider).html();
        $(html).appendTo(this_slider);
        $(this_slider).children('.next_button:eq(0), .prev_button:eq(0)').remove();
        count = $(this_slider).children('*:not(.next_button, .prev_button)').length;
      }

      var EasySlidesNext = function (nextslide) {
        clearTimeout(EasySlidesTimer);
        if (typeof settings['beforeshow'] == 'function') {
          settings['beforeshow'];
        };
        var i = 0;
        if (count > 0) {
          if (typeof nextslide == 'number') {
            cur_slider = nextslide;
          } else {
            cur_slider ++;
            nextslide = cur_slider;
          }
          while (cur_slider < 0) {cur_slider = cur_slider + count;}
          while (cur_slider > count) {cur_slider = cur_slider - count;}
          while (nextslide < 0) {nextslide = nextslide + count;}
          while (nextslide > count) {nextslide = nextslide - count;}
     
          i = 0;
          $(this_slider).children('*:not(.next_button, .prev_button)').each(function() {
            var cssclass = '';
            var icount = 0;
            icount = i - nextslide ;
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
        if (typeof settings['aftershow'] == 'function') {
          settings['aftershow'];
        };

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
      if (settings['mouseevents']) {
        $(this_slider).bind('mousemove', function(e) {
          if (e.buttons > 0) {
            if (!mousedowned) {
              //Первое нажатие на кнопку мыши 
              var w = $(this).find('.active').width();
              if (settings['vertical']) {
                w = $(this).find('.active').height();
              }  
              $(this).data('posstart', { 
                              x: e.pageX, 
                              y: e.pageY, 
                              width: w
                              });
              mousedowned = true;
            } else {
              // Двигаеммышью с зажатой кнопкой 
              var p0 = $(this).data('posstart'),
                  p1 = { x: e.pageX, y: e.pageY },
                  d = p1.x - p0.x;
              if (settings['vertical']) {
                d = p1.y - p0.y;
              }
              if (settings['reverse']) {
                d = -d;
              }    
              if (Math.abs(d) > (0.5 * p0.width)) {
                $(this).data('posstart' , { 
                              x: e.pageX, 
                              y: e.pageY, 
                              width:  p0.width
                              });

                if (d > 0) {
                  cur_slider --;
                } else {
                  cur_slider ++;
                }
                EasySlidesNext(cur_slider);
              }              
            }
          } else {
            if (mousedowned) {
              // Отжали кнопку мыши
              mousedowned = false;
              var p0 = $(this).data('posstart'),
                  p1 = { x: e.pageX, y: e.pageY },
                  d = p1.x - p0.x;
              if (settings['vertical']) {
                d = p1.y - p0.y;
              } 
              if (settings['reverse']) {
                d = -d;
              }    
              $(this).removeData('posstart');              
              if (Math.abs(d) > (0.5 * p0.width)) {
                if (d > 0) {
                  cur_slider --;
                } else {
                  cur_slider ++;
                }
                EasySlidesNext(cur_slider);
              }
            }
          }
        });

      }       
    });
  }
})( jQuery );


