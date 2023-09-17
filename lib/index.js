'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".scroll-container {\n    inset: 0;\n    overflow-x: scroll;\n    position: absolute;\n    z-index: 10;\n}\n\n.scroll-content {\n    height: 100%;\n}\n\n.video-scroll-container {\n    border-radius: 8px;\n    position: relative;\n}";
styleInject(css_248z);

var VideoScroll = function (props) {
    var video = props.video, width = props.width, lengthScroll = props.lengthScroll;
    var videoRef = React.useRef(null);
    var scrollContainerRef = React.useRef(null);
    React.useEffect(function () {
        var video = videoRef.current;
        var scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || !video)
            return;
        var handleScroll = function () {
            var maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            var scrollFraction = scrollContainer.scrollLeft / maxScroll;
            var videoDuration = video.duration;
            var targetTime = scrollFraction * videoDuration;
            video.currentTime = targetTime;
        };
        scrollContainer.addEventListener("scroll", handleScroll);
        return function () {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);
    React.useEffect(function () {
        var video = videoRef.current;
        var scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || !video)
            return;
        if (!video)
            return;
        video.addEventListener("loadedmetadata", function () {
            var maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            var targetScroll = (video.currentTime / video.duration) * maxScroll;
            scrollContainer.scrollLeft = targetScroll;
        });
        return function () {
            video.removeEventListener("loadedmetadata", function () { });
        };
    }, []);
    try {
        return (React__default["default"].createElement("div", { className: "video-scroll-container", style: {
                width: width,
            } },
            React__default["default"].createElement("div", { ref: scrollContainerRef, className: "scroll-container" },
                React__default["default"].createElement("div", { className: "scroll-content", style: {
                        minWidth: "".concat(Math.round((lengthScroll || 2) * 100), "%"),
                    } })),
            React__default["default"].createElement("video", { ref: videoRef, width: "100%", height: "auto" },
                React__default["default"].createElement("source", { src: video, type: "video/mp4" }))));
    }
    catch (e) {
        console.log("Error with component: ".concat(e));
        return (React__default["default"].createElement("div", null, "An error occurred while loading the video."));
    }
};

exports.VideoScroll = VideoScroll;
