/*
https://github.com/IvanShabanov/EasySlides

EasySlides - слидер
Autor 2017-2021 Shabanov Ivan (Шабанов Иван)
Usage:

   EasySlides(
       '.slider',  // Селектор слайдера
    {
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

*/


EasySlides = function (selector, options) {
    let settings = {
        'autoplay': false,
        'timeout': 3000,
        'show': 5,
        'vertical': false,
        'reverse': false,
        'touchevents': true,
        'delayaftershow': 300,
        'stepbystep': true,
        'loop': true,
        'startslide': 0,
        'distancetochange': 10,
        'beforeshow': function () { },
        'aftershow': function () { },
    };

    for (var key in options)
        if (options.hasOwnProperty(key))
            settings[key] = options[key];


    let Sliders = document.querySelectorAll(selector);
    Sliders.forEach(function (element, index) {
        let this_slider = element;
        let EasySlidesTimer;
        let EasySlidesCanChange = true;

        let count = this_slider.querySelectorAll(':scope>*:not(.next_button, .prev_button, .nav_indicators)').length;
        let cur_slide = 0;
        let mousedowned = false;
        let need_slide = 0;
        let slides;
        let have_nav_indicators = false;

        if (settings['show'] == 'all') {
            settings['show'] = count;
        };

        if (count > 0) {
            if (count < settings['show']) {
                let addChild = this_slider.innerHTML;
                while (count < settings['show']) {
                    this_slider.insertAdjacentHTML("beforeend", addChild);

                    if (this_slider.querySelector('.next_button')) {
                        this_slider.querySelector('.next_button').remove();
                    };
                    if (this_slider.querySelector('.prev_button')) {
                        this_slider.querySelector('.prev_button').remove();
                    };
                    if (this_slider.querySelector('.nav_indicators')) {
                        this_slider.querySelector('.nav_indicators').remove();
                    };
                    slides = this_slider.querySelectorAll(':scope>*:not(.next_button, .prev_button, .nav_indicators)');
                    count = slides.length;
                }
            }
            slides = this_slider.querySelectorAll(':scope>*:not(.next_button, .prev_button, .nav_indicators)');
            count = slides.length;

            if (this_slider.querySelectorAll('.nav_indicators').length > 0) {
                have_nav_indicators = true;
                let nav_indicators = '<ul>';
                while (need_slide < count) {
                    need_slide++;
                    nav_indicators = nav_indicators + '<li>' + need_slide + '</li>';
                };
                nav_indicators = nav_indicators + '</ul>';
                this_slider.querySelector('.nav_indicators').innerHTML = nav_indicators;
                need_slide = 0;
            }
            const EasySlidesLoopToNeeded = function () {
                let next;
                let left = need_slide - cur_slide;
                let right = cur_slide - need_slide
                if (settings['loop'] == true) {
                    if (left < 0) {
                        left = left + count;
                    }
                    if (right < 0) {
                        right = right + count;
                    }
                }
                if (cur_slide != need_slide) {
                    if (settings['loop'] == true) {
                        if ((left) < (right)) {
                            next = cur_slide + 1;
                        } else {
                            next = cur_slide - 1;
                        }
                    } else {
                        if (left > 0) {
                            next = cur_slide + 1;
                        } else {
                            next = cur_slide - 1;
                        }
                    }
                    EasySlidesNext(next);
                    setTimeout(EasySlidesLoopToNeeded, settings['delayaftershow']);
                }
            }
            const EasySlidesNext = function (nextslide) {
                if (EasySlidesCanChange) {
                    EasySlidesCanChange = false;
                    setTimeout(function () {
                        EasySlidesCanChange = true;
                    }, settings['delayaftershow']);
                    clearTimeout(EasySlidesTimer);
                    if (typeof settings['beforeshow'] == 'function') {
                        settings['beforeshow'](this_slider);
                    }
                    let i = 0;
                    if (count > 0) {
                        if (typeof nextslide == 'number') {
                            cur_slide = nextslide;
                        } else {
                            cur_slide++;
                            nextslide = cur_slide;
                        }
                        if (settings['loop'] == true) {
                            while (cur_slide < 0) {
                                cur_slide = cur_slide + count;
                            };
                            while (cur_slide >= count) {
                                cur_slide = cur_slide - count;
                            };
                            while (nextslide < 0) {
                                nextslide = nextslide + count;
                            };
                            while (nextslide >= count) {
                                nextslide = nextslide - count;
                            };

                        } else {
                            if (cur_slide < 0) {
                                cur_slide = 0;
                            }
                            if (cur_slide >= count) {
                                cur_slide = count - 1;
                            }
                            if (nextslide < 0) {
                                nextslide = 0;
                            }
                            if (nextslide >= count) {
                                nextslide = count - 1;
                            }
                        }
                        if (have_nav_indicators) {
                            let navindicators = this_slider.querySelectorAll('.nav_indicators ul li');
                            navindicators.forEach(function (element, index) {
                                if (index == nextslide) {
                                    element.className += ' active';

                                } else {
                                    element.classList.remove("active");
                                };
                            });
                        };

                        i = 0;
                        slides.forEach(function (element, index) {
                            let cssclass = '';
                            let icount = 0;
                            icount = index - nextslide;
                            while (icount < 0) {
                                icount = icount + count;
                            }

                            while (icount > count) {
                                icount = icount - count;
                            }
                            if (icount == 0) {
                                cssclass = 'active';
                                try {
                                    this_slider.querySelector('.' + cssclass + ':not(.nav_indicators ul li)').classList.remove(cssclass);
                                } catch { };
                                element.classList.remove('hidden');
                                element.classList.add(cssclass);
                            } else if (icount < settings['show'] / 2) {
                                cssclass = 'next' + icount;
                                try {
                                    this_slider.querySelector('.' + cssclass).classList.remove(cssclass);
                                } catch { };
                                element.classList.remove('hidden');
                                element.classList.add(cssclass);
                            } else if (icount > count - (settings['show'] / 2)) {
                                cssclass = 'prev' + (count - icount);
                                try {
                                    this_slider.querySelector('.' + cssclass).classList.remove(cssclass);
                                } catch { };
                                element.classList.remove('hidden');
                                element.classList.add(cssclass);
                            } else {
                                cssclass = 'hidden';
                                element.classList.add(cssclass);
                            }

                            if ((Math.abs(index - nextslide) > (settings['show'] / 2)) && (settings['loop'] == false)) {
                                let icnt = 1;
                                while (icnt < settings['show'] / 2) {
                                    cssclass = 'next' + icnt;
                                    if (element.classList.contains(cssclass)) {
                                        element.classList.remove(cssclass)
                                    };
                                    cssclass = 'prev' + icnt;
                                    if (element.classList.contains(cssclass)) {
                                        element.classList.remove(cssclass)
                                    };
                                    icnt++;
                                };
                                cssclass = 'hidden';
                                element.classList.add(cssclass);
                            }
                        });

                        if (settings['autoplay']) {
                            clearTimeout(EasySlidesTimer);
                            EasySlidesTimer = setTimeout(function () {
                                EasySlidesNext();
                            }, settings['timeout']);
                        }
                    }
                    if (typeof settings['aftershow'] == 'function') {
                        settings['aftershow'](this_slider);
                    }

                }
            }
            EasySlidesNext(settings['startslide']);

            slides.forEach(function (element, index) {
                element.addEventListener('click', function (event) {
                    if (settings['stepbystep']) {
                        need_slide = index;
                        EasySlidesLoopToNeeded()
                    } else {
                        EasySlidesNext(index);
                    }
                })
            });
            if (have_nav_indicators) {
                const indicators_li = this_slider.querySelectorAll('.nav_indicators ul li');
                indicators_li.forEach(function (element, index) {
                    element.addEventListener('click', function (event) {
                        if (settings['stepbystep']) {
                            need_slide = index;
                            EasySlidesLoopToNeeded()
                        } else {
                            EasySlidesNext(index);
                        }
                    });
                });
            };

            if (this_slider.querySelectorAll('.next_button').length) {
                const nextbutton = this_slider.querySelectorAll('.next_button');
                nextbutton.forEach(function (element, index) {
                    element.addEventListener('click', function (event) {
                        EasySlidesCanChange = true;
                        EasySlidesNext();
                    });
                });
            };

            if (this_slider.querySelectorAll('.prev_button').length) {
                const prevbutton = this_slider.querySelectorAll('.prev_button');
                prevbutton.forEach(function (element, index) {
                    element.addEventListener('click', function (event) {
                        EasySlidesCanChange = true;
                        cur_slide--;
                        EasySlidesNext(cur_slide);
                    });
                });
            };

            if (settings['touchevents']) {

                const EasySliderMoved = function (xcur, ycur) {
                    let left = 0;
                    let top = 0;
                    if (this_slider.querySelector('.active:not(.next_button, .prev_button, .nav_indicators ul li)')) {
                        const rect = this_slider.querySelector('.active:not(.next_button, .prev_button, .nav_indicators ul li)').getBoundingClientRect();
                        top = rect.top + window.scrollY;
                        left = rect.left + window.scrollX;
                    };

                    let posstart = this_slider.dataset.posstart,
                        p0 = {},
                        p1 = {
                            x: xcur,
                            y: ycur,
                            l: left,
                            t: top,
                        },
                        d = 0;
                    if ((typeof posstart === 'undefined') || (posstart == '')) {
                        p0 = p1;
                        this_slider.dataset.posstart = JSON.stringify(p1);
                    } else {
                        p0 = JSON.parse(posstart);;
                    }

                    if (settings['vertical']) {
                        d = p1.y - p0.y;
                        top = p0.t + d;
                    } else {
                        d = p1.x - p0.x;
                        left = p0.l + d;
                    }
                    if (settings['reverse']) {
                        d = -d;
                    }
                    if ((Math.abs(d) > settings['distancetochange']) && (EasySlidesCanChange)) {
                        this_slider.dataset.posstart = JSON.stringify(p1);

                        if (d > 0) {
                            cur_slide--;
                        } else {
                            cur_slide++;
                        };
                        EasySlidesNext(cur_slide);
                    }
                }

                this_slider.addEventListener('mousemove', function (e) {
                    e.preventDefault();
                    if (e.buttons > 0) {
                        EasySliderMoved(e.pageX, e.pageY);
                        mousedowned = true;
                    } else {
                        if (mousedowned) {
                            EasySliderMoved(e.pageX, e.pageY);
                            this_slider.dataset.posstart = '';
                            mousedowned = false;
                        }
                    }
                });

                this_slider.addEventListener('mouseup', function (e) {
                    e.preventDefault();
                    if (mousedowned) {
                        EasySliderMoved(e.pageX, e.pageY);
                        this_slider.dataset.posstart = '';
                        mousedowned = false;
                    }
                })

                this_slider.addEventListener('touchmove', function (e) {
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    EasySliderMoved(touch.pageX, touch.pageY);
                });

                this_slider.addEventListener('touchend', function (e) {
                    this_slider.dataset.posstart = '';
                });

            }
        }
    });
}

