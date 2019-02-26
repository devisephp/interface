webpackHotUpdate("main",{

/***/ "./src/directives/tuck.js":
/*!********************************!*\
  !*** ./src/directives/tuck.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs2/core-js/parse-int */ \"./node_modules/@babel/runtime-corejs2/core-js/parse-int.js\");\n/* harmony import */ var _Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ \"./node_modules/gsap/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  inserted: function inserted(el) {\n    var offset = 5;\n    var style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;\n    var marginLeft = _Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(style.marginLeft, 0) || 0;\n    var marginRight = _Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(style.marginRight, 0) || 0;\n    var marginTop = _Users_garywilliams_Code_devise_interface_cli_node_modules_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(style.marginTop, 0) || 0;\n    var elX = el.offsetLeft - marginLeft;\n    var elY = el.offsetTop - marginTop;\n    var initTimeout = null;\n    var elWidth = el.offsetWidth;\n    var elHeight = el.offsetHeight;\n    var blocker = document.createElement('div');\n    blocker.classList.add('dvs-blocker');\n    document.body.appendChild(blocker);\n\n    function calculateTuckX() {\n      var rightSide = elX + elWidth + marginLeft + marginRight;\n      var leftSide = elX;\n      var halfWindow = window.innerWidth / 2;\n\n      if (rightSide - halfWindow > halfWindow - leftSide) {\n        return window.innerWidth - offset - marginLeft;\n      }\n\n      return -elWidth + offset;\n    }\n\n    function hide() {\n      elWidth = el.offsetWidth;\n      elHeight = el.offsetHeight;\n      var timeline = new gsap__WEBPACK_IMPORTED_MODULE_1__[\"TimelineLite\"]();\n      var tuckX = calculateTuckX();\n      gsap__WEBPACK_IMPORTED_MODULE_1__[\"TweenMax\"].to(el, 1, {\n        left: \"\".concat(tuckX, \"px\"),\n        width: \"\".concat(elWidth, \"px\"),\n        height: \"\".concat(elHeight, \"px\"),\n        ease: Elastic.easeOut.config(0.5, 0.5) // eslint-disable-line\n\n      });\n      timeline.to(blocker, 0.5, {\n        opacity: 0,\n        ease: Power3.easeIn // eslint-disable-line\n\n      }).to(blocker, 0, {\n        top: \"\".concat(window.innerHeight, \"px\")\n      });\n      window.deviseSettings.$bus.$emit('devise-close-sidebar');\n    }\n\n    function show() {\n      var timeline = new gsap__WEBPACK_IMPORTED_MODULE_1__[\"TimelineLite\"](); // Kill the initial page hide if I mouse over\n\n      clearTimeout(initTimeout);\n      gsap__WEBPACK_IMPORTED_MODULE_1__[\"TweenMax\"].to(el, 1, {\n        top: \"\".concat(elY, \"px\"),\n        left: \"\".concat(elX, \"px\"),\n        ease: Elastic.easeOut.config(0.5, 0.5) // eslint-disable-line\n\n      });\n      timeline.to(blocker, 0, {\n        top: '0px'\n      }).to(blocker, 0.5, {\n        opacity: 0.3,\n        ease: Power3.easeOut // eslint-disable-line\n\n      });\n    }\n\n    initTimeout = setTimeout(function () {\n      hide();\n    }, 1500);\n    el.addEventListener('mouseenter', show);\n    blocker.addEventListener('click', hide);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGlyZWN0aXZlcy90dWNrLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2RpcmVjdGl2ZXMvdHVjay5qcz8zMzc0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR3ZWVuTWF4LCBUaW1lbGluZUxpdGUgfSBmcm9tICdnc2FwJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbnNlcnRlZChlbCkge1xuICAgIGNvbnN0IG9mZnNldCA9IDU7XG5cbiAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkgOiBlbC5jdXJyZW50U3R5bGU7XG5cbiAgICBjb25zdCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMCkgfHwgMDtcbiAgICBjb25zdCBtYXJnaW5SaWdodCA9IHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAwKSB8fCAwO1xuICAgIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMCkgfHwgMDtcblxuICAgIGNvbnN0IGVsWCA9IGVsLm9mZnNldExlZnQgLSBtYXJnaW5MZWZ0O1xuICAgIGNvbnN0IGVsWSA9IGVsLm9mZnNldFRvcCAtIG1hcmdpblRvcDtcblxuICAgIGxldCBpbml0VGltZW91dCA9IG51bGw7XG4gICAgbGV0IGVsV2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgZWxIZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICBjb25zdCBibG9ja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmxvY2tlci5jbGFzc0xpc3QuYWRkKCdkdnMtYmxvY2tlcicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmxvY2tlcik7XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVUdWNrWCgpIHtcbiAgICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGVsWCArIGVsV2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgICBjb25zdCBsZWZ0U2lkZSA9IGVsWDtcbiAgICAgIGNvbnN0IGhhbGZXaW5kb3cgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5cbiAgICAgIGlmIChyaWdodFNpZGUgLSBoYWxmV2luZG93ID4gaGFsZldpbmRvdyAtIGxlZnRTaWRlKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAtIG9mZnNldCAtIG1hcmdpbkxlZnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAtZWxXaWR0aCArIG9mZnNldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgZWxXaWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgZWxIZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuICAgICAgY29uc3QgdHVja1ggPSBjYWxjdWxhdGVUdWNrWCgpO1xuXG4gICAgICBUd2Vlbk1heC50byhlbCwgMSwge1xuICAgICAgICBsZWZ0OiBgJHt0dWNrWH1weGAsXG4gICAgICAgIHdpZHRoOiBgJHtlbFdpZHRofXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHtlbEhlaWdodH1weGAsXG4gICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMC41LCAwLjUpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9KTtcblxuICAgICAgdGltZWxpbmVcbiAgICAgICAgLnRvKGJsb2NrZXIsIDAuNSwge1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgZWFzZTogUG93ZXIzLmVhc2VJbiwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICB9KVxuICAgICAgICAudG8oYmxvY2tlciwgMCwge1xuICAgICAgICAgIHRvcDogYCR7d2luZG93LmlubmVySGVpZ2h0fXB4YCxcbiAgICAgICAgfSk7XG5cbiAgICAgIHdpbmRvdy5kZXZpc2VTZXR0aW5ncy4kYnVzLiRlbWl0KCdkZXZpc2UtY2xvc2Utc2lkZWJhcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICBjb25zdCB0aW1lbGluZSA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgICAgLy8gS2lsbCB0aGUgaW5pdGlhbCBwYWdlIGhpZGUgaWYgSSBtb3VzZSBvdmVyXG4gICAgICBjbGVhclRpbWVvdXQoaW5pdFRpbWVvdXQpO1xuXG4gICAgICBUd2Vlbk1heC50byhlbCwgMSwge1xuICAgICAgICB0b3A6IGAke2VsWX1weGAsXG4gICAgICAgIGxlZnQ6IGAke2VsWH1weGAsXG4gICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMC41LCAwLjUpLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9KTtcblxuICAgICAgdGltZWxpbmVcbiAgICAgICAgLnRvKGJsb2NrZXIsIDAsIHtcbiAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICB9KVxuICAgICAgICAudG8oYmxvY2tlciwgMC41LCB7XG4gICAgICAgICAgb3BhY2l0eTogMC4zLFxuICAgICAgICAgIGVhc2U6IFBvd2VyMy5lYXNlT3V0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBoaWRlKCk7XG4gICAgfSwgMTUwMCk7XG5cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgc2hvdyk7XG4gICAgYmxvY2tlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGUpO1xuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBRUE7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQXZGQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/directives/tuck.js\n");

/***/ })

})