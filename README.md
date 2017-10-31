# EasySlides
Jquery plagin slides

Usage

   
      $('.slider').EasySlides({
      'autoplay': true, 
      'timeout': 3000,
      'show': 5, //Сколь-ко позывать слайдов (по умолчанию 5: 1-активный, 2-предыдущих и 2-следующих)
      'vertical': false,  //Если True то слайдер вертикальный, слайды листаются движением вверх/вниз
      'reverse': false, //Перевернутый слайдер
      'touchevents': true, //Вкючено ли события на прикосновения к сладеру (листания и т.п) 
      'delayaftershow': 300, //Задержка после смены слайдера, в это время слайдер нельзя листать
      'stepbystep': true, //При клике на далекий слайд перейти к нему последовательно, а не сразу
      'startslide': 0,  //Стартовый слайд 
      'beforeshow': function () {},
      'aftershow': function () {},      
      });


