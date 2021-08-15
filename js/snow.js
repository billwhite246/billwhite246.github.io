// ======================== 下雪 ========================
/*样式一*/
var globalInterval;
(function ($) {
  $.fn.snow = function (options) {
    var $flake = $('<div id="snowbox" />')
        .css({
          position: "absolute",
          "z-index": "9999",
          top: "-50px",
        })
        .html("❄"),
      // 🍦
      // ❄
      documentHeight = $(document).height(),
      documentWidth = $(document).width(),
      defaults = {
        minSize: 10,
        maxSize: 20,
        newOn: 1000,
        flakeColor:
          "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */,
      },
      options = $.extend({}, defaults, options);
    // var interval = setInterval(function () {
    globalInterval = setInterval(function () {
      var startPositionLeft = Math.random() * documentWidth - 100,
        startOpacity = 0.5 + Math.random(),
        sizeFlake = options.minSize + Math.random() * options.maxSize,
        endPositionTop = documentHeight - 200,
        endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
        durationFall = documentHeight * 10 + Math.random() * 5000;
      $flake
        .clone()
        .appendTo("body")
        .css({
          left: startPositionLeft,
          opacity: startOpacity,
          "font-size": sizeFlake,
          color: options.flakeColor,
        })
        .animate(
          {
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.2,
          },
          durationFall,
          "linear",
          function () {
            $(this).remove();
          }
        );
    }, options.newOn);
  };
})(jQuery);

var screenProtectTime = 2; // 屏幕保护时间为30s
window.setInterval(function () {
  screenProtectTime--;
  if (screenProtectTime <= 0) {
    $(function () {
      $.fn.snow({
        minSize: 5,
        /* 定义雪花最小尺寸 */
        maxSize: 50,
        /* 定义雪花最大尺寸 */
        newOn: 300 /* 定义密集程度，数字越小越密集 */,
      });
    });
  }
}, 1000);

$(document).ready(function () {
  $(window).scroll(function () {
    // if ($(document).scrollTop() <= 0) {
    //   alert("滚动条已经到达顶部为0");
    // }
    // if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
    //   alert("滚动条已经到达底部为" + $(document).scrollTop());
    // }
    clearInterval(globalInterval);
    screenProtectTime = 2;
  });
});
