

const Menu = (() => {
  let s;

  return {
    settings() {
      return {
        body: $('body'),
        hamburger: $('.hamburger'),
        open: 'js-menu-open',
        visible: 'js-menu-visible',
        overflow: 'js-overflow',
        width: $(window).width(),
        prevWidth: $(window).width() };

    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      let menuContainerWidth;

      if (s.width < 864) {
        menuContainerWidth = 100;
      } else if (s.width < 1456) {
        menuContainerWidth = 50;
      } else {
        menuContainerWidth = 45;
      }

      $(window).on('resize', () => {
        s.width = $(window).width();

        if (s.width < 864) {
          menuContainerWidth = 100;
        } else if (s.width < 1456) {
          menuContainerWidth = 50;
        } else {
          menuContainerWidth = 45;
        }
      });

      s.hamburger.on('click', () => {
        Menu.toggleMenu(menuContainerWidth);
      });

      s.body.on('keyup', e => {
        if (s.body.hasClass(s.open) && e.which === 27) {
          Menu.toggleMenu(menuContainerWidth);
        }
      });
    },

    toggleMenu(width) {
      s.hamburger.toggleClass('js-hamburger');
      s.body.toggleClass(s.open);
      s.body.toggleClass(s.overflow);

      // Opening transition
      if (s.body.hasClass(s.open)) {
        s.prevWidth = width;

        anime.timeline({
          easing: 'easeOutQuart',
          duration: 600,
          begin() {
            $('.menu__img').css('left', `${width}%`);
            s.body.addClass(s.visible);
          } }).

        add({
          targets: '.menu__container',
          width: [0, `${width}%`] }).

        add({
          targets: '.menu__img',
          width: [0, `${100 - width}%`] },
        0);
      }

      // Closing transition
      if (!s.body.hasClass(s.open)) {
        anime.timeline({
          easing: 'easeInQuart',
          duration: 600,
          delay: 200,
          complete() {
            s.body.removeClass(s.visible);
          } }).

        add({
          targets: '.menu__container',
          width: [`${s.prevWidth}%`, 0] }).

        add({
          targets: '.menu__img',
          width: [`${100 - s.prevWidth}%`, 0] },
        0);
      }
    } };

})();

// Inits
$(() => {
  // Spanize
  const span = $('.js-span');
  let $ele, words;

  for (let i = 0; i < span.length; i++) {
    $ele = $(span).eq(i);
    words = $ele.html();

    $ele.html(words.replace(/([A-z0-9'@+-<>.,'"“”‘’?!*&/]+)/g, '<span>$&</span>'));
  }

  Menu.init();
});


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 100 - Math.random() * 80;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 100;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #FFF }";
  document.body.appendChild(css);
};

$(window).load(function() {
    $(".loader").fadeOut("slow");
});