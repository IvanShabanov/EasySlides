# EasySlides

# Jquery plugin slides

Usage

1) Include the jQuery and plugin

```
<script link="/path_to_jquery/jquery.js "></script>
<script link="/path_to_plugin/jquery.easy_slides.js "></script>
```


2) Init the slider in your JS

```
$('.slider').EasySlides({
   'autoplay': true,
   'loop': true,
   'timeout': 3000,
   'show': 5,
   'vertical': false,
   'reverse': false,
   'touchevents': true,
   'delayaftershow': 300,
   'stepbystep': true,
   'startslide': 0,
   'beforeshow': function () {},
   'aftershow': function () {},
   'onclick': function (slide) {},
   'disabledefaultclick': false,
});
```


# Pure JS

Usage

1) Include the plugin

```
<script link="/path_to_plugin/easy_slides.js "></script>
```


2) Init the slider in your JS

```
EasySlides('.slider', {
   'autoplay': true,
   'loop': true,
   'timeout': 3000,
   'show': 5,
   'vertical': false,
   'reverse': false,
   'touchevents': true,
   'delayaftershow': 300,
   'stepbystep': true,
   'startslide': 0,
   'beforeshow': function () {},
   'aftershow': function () {},
   'onclick': function (slide) {},
   'disabledefaultclick': false,
});
```

# Params


autoplay - if "true" slides will change automaticly. Default - true.

loop - if "true" slides will change looped. Default - true.

timeout - if "autoplay" is "true" this is delay time. Default - 3000.

show - how many slides showed. Default is 5: 2 - previos (have class "prev"), 1 - active (have class "active"), 2 - next slides (have class "next"), another slides is hidden (have class "hidden").

vertical -  if "true" slider will be vertical (touch evens to change slide is up and down move). Default - false.

reverse - if "true" slider will be reversed. Default - false.

touchevents - if "true" touch events is work (change slides by touch/mouse move). Default - true.

delayaftershow - time after change slide when slides not change. Default - 300.

stepbystep - if "true" when user click on slide not next or prev - slides will be changes step by step while not showed clicked slide. Default - true.

startslide - number of started slide (first slide is 0). Default - 0.

beforeshow - function before change slide

aftershow - function after change slide

onclick - function on click on ,
   'disabledefaultclick': false,