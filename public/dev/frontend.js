/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"frontend": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dev";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./2App/frontend.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./0Template/Components/00Default/06Carousel/00demoCarousel.jsx":
/*!**********************************************************************!*\
  !*** ./0Template/Components/00Default/06Carousel/00demoCarousel.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-responsive-carousel/lib/styles/carousel.min.css */ "./node_modules/react-responsive-carousel/lib/styles/carousel.min.css");
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-responsive-carousel */ "./node_modules/react-responsive-carousel/lib/index.js");
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var DemoCarousel =
/*#__PURE__*/
function (_Component) {
  _inherits(DemoCarousel, _Component);

  function DemoCarousel() {
    _classCallCheck(this, DemoCarousel);

    return _possibleConstructorReturn(this, _getPrototypeOf(DemoCarousel).apply(this, arguments));
  }

  _createClass(DemoCarousel, [{
    key: "sliderData",
    value: function sliderData(item, index) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: index
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: item.image,
        style: {
          height: "100vh",
          objectFit: "cover"
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "legend"
      }, item.title));
    }
  }, {
    key: "onChange",
    value: function onChange() {
      console.log("ON CHANGE");
    }
  }, {
    key: "onClickItem",
    value: function onClickItem() {
      console.log("ON CLICK ITEM");
    }
  }, {
    key: "onClickThumb",
    value: function onClickThumb() {
      console.log("ON CLICK THUMB");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var index = 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_3__["Carousel"], {
        autoPlay: this.props.autoPlay,
        showArrows: this.props.showArrows,
        showStatus: this.props.showStatus,
        showIndicators: this.props.showIndicators,
        showThumbs: this.props.showThumbs,
        infiniteLoop: this.props.infiniteLoop,
        axis: this.props.axis,
        verticalSwipe: this.props.verticalSwipe,
        onChange: this.onChange,
        onClickThumb: this.onClickThumb,
        onClickItem: this.onClickItem
      }, this.props.data.map(function (item) {
        index = index + 1;
        return _this.sliderData(item, index);
      }));
    }
  }]);

  return DemoCarousel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

DemoCarousel.propTypes = {
  autoPlay: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  showArrows: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  showStatus: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  showIndicators: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  showThumbs: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  infiniteLoop: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
  axis: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  //horizontal / vertical
  verticalSwipe: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  //standard / natural
  data: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.array.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onClickItem: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  onClickThumb: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
};
DemoCarousel.defaultProps = {
  autoPlay: true,
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  showThumbs: true,
  infiniteLoop: true,
  axis: 'horizontal',
  verticalSwipe: 'standard',
  data: [{
    id: 1,
    image: 'https://media.wired.com/photos/5b11706136ad230cb43f0d3c/master/w_799,c_limit/FB-Trending.png',
    title: 'Title 1'
  }, {
    id: 2,
    image: 'https://media.wired.com/photos/5b11706136ad230cb43f0d3c/master/w_799,c_limit/FB-Trending.png',
    title: 'Title 3'
  }]
};
/* harmony default export */ __webpack_exports__["default"] = (DemoCarousel);

/***/ }),

/***/ "./0Template/Module/04News/FrontEnd/index.scss":
/*!*****************************************************!*\
  !*** ./0Template/Module/04News/FrontEnd/index.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/04News/FrontEnd/newsDetailContainer.jsx":
/*!******************************************************************!*\
  !*** ./0Template/Module/04News/FrontEnd/newsDetailContainer.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewsDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/04News/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/0Template/Components/00Default/06Carousel/00demoCarousel.jsx */ "./0Template/Components/00Default/06Carousel/00demoCarousel.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var NewsDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewsDetailContainer, _React$Component);

  function NewsDetailContainer() {
    var _this;

    _classCallCheck(this, NewsDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewsDetailContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        console.log(_this.state.baseUrl);
        var id = _this.state.news_detail_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET'
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              newsData: response.data.data.data
            });
          });
        }
      }
    };

    var news_detail_id = window.news_detail_id ? window.news_detail_id : 0;
    var element = document.getElementById('newsDetailContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      slideData: [{
        id: 1,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }],
      componentStatus: 'ready',
      // Data
      newsData: {},
      news_detail_id: news_detail_id,
      baseUrl: "api/news/view/" + news_detail_id
    };

    _this.loadData();

    return _this;
  }

  _createClass(NewsDetailContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "newsDetail"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "text-white headerBG"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "newsTitle"
      }, this.state.newsData.Title))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail-news"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "banner-detail-news",
        style: {
          backgroundImage: "url(/" + this.state.newsData.URL + ")",
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-detail-news col-md-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.newsData.Description))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return NewsDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

NewsDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/news/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/04News/FrontEnd/newsListContainer.jsx":
/*!****************************************************************!*\
  !*** ./0Template/Module/04News/FrontEnd/newsListContainer.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewsListContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/04News/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowData = function DefaultShowData(props) {
  var item = props.item;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-4"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "card card-clickable",
    href: "/news/detail/" + item.ID
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item.Title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, item.Description.length > 200 ? item.Description.substr(0, 200) + "..." : item.Description))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
};

var NewsListContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewsListContainer, _React$Component);

  function NewsListContainer() {
    var _this;

    _classCallCheck(this, NewsListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewsListContainer).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var page = window.page ? window.page : 1;
    var searchText = window.search ? window.search : "";
    _this.state = {
      type: 'card',
      data: [],
      searchText: searchText,
      componentStatus: 'ready',
      // Data
      baseUrl: "api/news/list",
      ajaxCall: "api/news/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 5,
      // 00pagination related
      page: page,
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(NewsListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "newsList"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "CatalogCard row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.data,
        callMoreData: this.callMoreData
      }, this.state)))));
    }
  }]);

  return NewsListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

NewsListContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/news/list",
  isShowHidden: true,
  isInfiniteScroll: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.callMoreData = function (resetData) {
    if (_this2.state.componentStatus != 'loading') {
      console.log("CALL MORE DATA");
      var page = _this2.state.page;
      var result = _this2.state.data;
      var dataPerPage = _this2.state.limitPage;

      if (resetData) {
        page = resetData - 1;
        result = [];

        _this2.setState({
          componentStatus: 'ready'
        });
      }

      if (_this2.state.componentStatus != 'done') {
        _this2.setState({
          componentStatus: 'loading'
        });

        Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: _this2.state.ajaxCall,
          method: 'GET',
          params: {
            'search[value]': _this2.state.searchText,
            'search[regex]': false,
            'start': page * dataPerPage,
            'length': dataPerPage
          }
        }).then(function (response) {
          if (result.length < response.data.data.total) {
            var _result;

            if (page == 0) {
              var urlPath = _this2.state.baseUrl;
            } else {
              var urlPath = _this2.state.baseUrl + '/' + (page + 1);
            }

            if (_this2.state.searchText) {
              urlPath += "?search=" + _this2.state.searchText;
            }

            (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

            _this2.setState({
              data: result,
              page: page + 1,
              componentStatus: 'ready',
              totalData: response.data.data.length
            });
          } else {
            _this2.setState({
              componentStatus: 'done'
            });
          }
        });
      }
    }
  };
};



/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/GoogleMapStyles.json":
/*!**********************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/GoogleMapStyles.json ***!
  \**********************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, default */
/***/ (function(module) {

module.exports = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#838383"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#aaaaaa"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#151516"},{"lightness":"0"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#6e6e6e"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#c3c3c3"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#5f5f5f"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#717171"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/index.scss":
/*!************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/landingPageNewsContainer.jsx":
/*!******************************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/landingPageNewsContainer.jsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LandingPagePromoContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/05LandingPage/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];
  var firstData = [];

  if (!(item.props[0] === undefined)) {
    firstData.push({
      image: item.props[0].URL,
      date: item.props[0].EventDate,
      title: item.props[0].Title,
      content: item.props[0].Description,
      ID: item.props[0].ID
    });
  }

  for (var i = 1; i < item.props.length; i++) {
    allData.push({
      image: item.props[i].URL,
      date: item.props[i].EventDate,
      title: item.props[i].Title,
      content: item.props[i].Description,
      ID: item.props[i].ID
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "landingPageNews row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, firstData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "newsContainer row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: data.image
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "dateNews"
    }, data.date), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, data.content, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: "/news/detail/" + data.ID,
      className: "linkButton",
      variant: "contained",
      size: "small",
      color: "primary"
    }, "Read More"))));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "newsContainerTable row"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "newsContainerItem row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/news/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: data.image
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "dateNews"
    }, data.date), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "contentNews"
    }, data.content)))));
  }))));
};

var LandingPagePromoContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LandingPagePromoContainer, _React$Component);

  function LandingPagePromoContainer() {
    var _this;

    _classCallCheck(this, LandingPagePromoContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LandingPagePromoContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var page = _this.state.page;
        var result = _this.state.data;
        var dataPerPage = _this.state.limitPage;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              if (page == 0) {
                var urlPath = _this.state.baseUrl;
              } else {
                var urlPath = _this.state.baseUrl + '/' + (page + 1);
              }

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('landingPagePromoContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "api/news/list",
      ajaxCall: "api/news/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999
    };

    _this.callMoreData(true); // this.state = {
    //     data:[{
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/79.jpg',
    //         title : 'Promo 1'
    //     }, {
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/47.jpg',
    //         title : 'Promo 2'
    //     },{
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/79.jpg',
    //         title : 'Promo 3'
    //     }, {
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/47.jpg',
    //         title : 'Promo 4'
    //     }],
    //     componentStatus:'ready',
    // }


    return _this;
  }

  _createClass(LandingPagePromoContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      });
    }
  }]);

  return LandingPagePromoContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

LandingPagePromoContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/news/list",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/landingPageOutletContainer.jsx":
/*!********************************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/landingPageOutletContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/05LandingPage/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var google_maps_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! google-maps-react */ "./node_modules/google-maps-react/dist/index.js");
/* harmony import */ var google_maps_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(google_maps_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_geolocated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-geolocated */ "./node_modules/react-geolocated/dist-modules/index.js");
/* harmony import */ var react_geolocated__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_geolocated__WEBPACK_IMPORTED_MODULE_5__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var styles = __webpack_require__(/*! ./GoogleMapStyles.json */ "./0Template/Module/05LandingPage/FrontEnd/GoogleMapStyles.json");

var style = {
  width: '100%',
  height: '400px',
  position: 'relative'
};
var allCoords = [];

var LandingPageOutletContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LandingPageOutletContainer, _React$Component);

  function LandingPageOutletContainer() {
    var _this;

    _classCallCheck(this, LandingPageOutletContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LandingPageOutletContainer).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var element = document.getElementById('landingPagePromoContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      isLoaded: 0,
      loadList: 0,
      componentStatus: 'ready',
      // Data
      baseUrl: "api/outlet/list",
      ajaxCall: "api/outlet/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999,
      latitude: '',
      longitude: '',
      mapPosition: {
        lat: '',
        lng: ''
      },
      zoom: 14,
      selectedTab: -1,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    return _this;
  }

  _createClass(LandingPageOutletContainer, [{
    key: "getLatLng",
    value: function getLatLng() {
      if (!(this.props.coords === null)) {
        this.state.latitude = this.props.coords.latitude;
        this.state.longitude = this.props.coords.longitude;
        this.state.mapPosition.lat = this.props.coords.latitude;
        this.state.mapPosition.lng = this.props.coords.longitude;
        this.callMoreData(true);
      }
    }
  }, {
    key: "getOutletListCoords",
    value: function getOutletListCoords() {
      allCoords = [];

      for (var i = 0; i < this.state.data.length; i++) {
        allCoords.push({
          name: this.state.data[i].Name,
          lat: this.state.data[i].outletLat,
          lng: this.state.data[i].outletLong
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!(this.state.latitude && this.state.longitude)) {
        this.getLatLng();
      }

      this.getOutletListCoords();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "nearestOutlet"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "outletData nav nav-tabs"
      }, allCoords.map(function (data, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "nav-item"
        }, console.log('data'), console.log(data.selected), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: _this2.state.selectedTab == index ? "text-white nav-link active" : "text-white nav-link",
          onClick: function onClick() {
            return _this2.goToLocation(index);
          }
        }, data.name));
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(google_maps_react__WEBPACK_IMPORTED_MODULE_4__["Map"], {
        google: this.props.google,
        zoom: 14,
        initialCenter: {
          lat: this.state.mapPosition.lat,
          lng: this.state.mapPosition.lng
        },
        center: {
          lat: this.state.mapPosition.lat,
          lng: this.state.mapPosition.lng
        },
        styles: styles
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(google_maps_react__WEBPACK_IMPORTED_MODULE_4__["Marker"], {
        onClick: this.onMarkerClick,
        name: 'Current location'
      }), allCoords.map(function (data, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(google_maps_react__WEBPACK_IMPORTED_MODULE_4__["Marker"], {
          onClick: _this2.onMarkerClick,
          name: data.name,
          position: {
            lat: data.lat,
            lng: data.lng
          }
        });
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(google_maps_react__WEBPACK_IMPORTED_MODULE_4__["InfoWindow"], {
        marker: this.state.activeMarker,
        visible: this.state.showingInfoWindow
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.selectedPlace.name)))));
    }
  }]);

  return LandingPageOutletContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

LandingPageOutletContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/outlet/list",
  isShowHidden: true,
  isInfiniteScroll: true
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.callMoreData = function (resetData) {
    if (_this3.state.isLoaded == 0) {
      if (_this3.state.componentStatus != 'loading') {
        console.log("CALL OUTLET DATA");
        var page = _this3.state.page;
        var result = _this3.state.data;
        var dataPerPage = _this3.state.limitPage;
        var latitude = _this3.state.latitude;
        var longitude = _this3.state.longitude;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this3.setState({
            componentStatus: 'ready'
          });
        }

        if (_this3.state.componentStatus != 'done') {
          _this3.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this3.state.ajaxCall,
            method: 'GET',
            params: {
              'latitude': latitude,
              'longitude': longitude,
              'length': 3
            }
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              console.log(latitude + " " + longitude);
              var urlPath = _this3.state.baseUrl;

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this3.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this3.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }

      _this3.setState({
        isLoaded: 1
      });
    }
  };

  this.onMarkerClick = function (props, marker, e) {
    return _this3.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  this.goToLocation = function (index) {
    _this3.setState({
      mapPosition: {
        lat: allCoords[index].lat,
        lng: allCoords[index].lng
      },
      selectedTab: index
    });
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_geolocated__WEBPACK_IMPORTED_MODULE_5__["geolocated"])({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Object(google_maps_react__WEBPACK_IMPORTED_MODULE_4__["GoogleApiWrapper"])({
  apiKey: "AIzaSyCscymp_ef8JBSfCvQTS9I3lleT2oELRTc"
})(LandingPageOutletContainer)));

/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/landingPagePromoContainer.jsx":
/*!*******************************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/landingPagePromoContainer.jsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LandingPagePromoContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/05LandingPage/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];

  for (var i = 0; i < item.props.length; i++) {
    allData.push({
      image: item.props[i].Photo,
      title: item.props[i].Name,
      ID: item.props[i].ID
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "landingPagePromo row"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "hvrbox"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: data.image
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "title"
    }, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "overlay"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, " Read More "))));
  }));
};

var LandingPagePromoContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LandingPagePromoContainer, _React$Component);

  function LandingPagePromoContainer() {
    var _this;

    _classCallCheck(this, LandingPagePromoContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LandingPagePromoContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var page = _this.state.page;
        var result = _this.state.data;
        var dataPerPage = _this.state.limitPage;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              if (page == 0) {
                var urlPath = _this.state.baseUrl;
              } else {
                var urlPath = _this.state.baseUrl + '/' + (page + 1);
              }

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('landingPagePromoContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "api/promo/globalPromos",
      ajaxCall: "api/promo/globalPromos",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999
    };

    _this.callMoreData(true); // this.state = {
    //     data:[{
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/79.jpg',
    //         title : 'Promo 1'
    //     }, {
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/47.jpg',
    //         title : 'Promo 2'
    //     },{
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/79.jpg',
    //         title : 'Promo 3'
    //     }, {
    //         id: 1,
    //         image: 'https://mdbootstrap.com/img/Photos/Others/images/47.jpg',
    //         title : 'Promo 4'
    //     }],
    //     componentStatus:'ready',
    // }


    return _this;
  }

  _createClass(LandingPagePromoContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      });
    }
  }]);

  return LandingPagePromoContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

LandingPagePromoContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/promo/globalPromos",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/05LandingPage/FrontEnd/landingPageSliderContainer.jsx":
/*!********************************************************************************!*\
  !*** ./0Template/Module/05LandingPage/FrontEnd/landingPageSliderContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LandingPageSliderContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/05LandingPage/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/0Template/Components/00Default/06Carousel/00demoCarousel.jsx */ "./0Template/Components/00Default/06Carousel/00demoCarousel.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var LandingPageSliderContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LandingPageSliderContainer, _React$Component);

  function LandingPageSliderContainer() {
    var _this;

    _classCallCheck(this, LandingPageSliderContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LandingPageSliderContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        console.log(_this.state.baseUrl);

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET'
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              newsData: response.data.data.data
            });
          });
        }
      }
    };

    var element = document.getElementById('landingPageSliderContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      slideData: [{
        id: 1,
        image: 'https://mdbootstrap.com/img/Photos/Others/images/79.jpg',
        title: 'Title 1'
      }, {
        id: 1,
        image: 'https://mdbootstrap.com/img/Photos/Others/images/47.jpg',
        title: 'Title 2'
      }],
      componentStatus: 'ready'
    };
    return _this;
  }

  _createClass(LandingPageSliderContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "landingPageSlider"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        data: this.state.slideData,
        showStatus: false,
        showThumbs: false
      }));
    }
  }]);

  return LandingPageSliderContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

LandingPageSliderContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/news/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/06Outlets/FrontEnd/index.scss":
/*!********************************************************!*\
  !*** ./0Template/Module/06Outlets/FrontEnd/index.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/06Outlets/FrontEnd/outletDetailContainer.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Module/06Outlets/FrontEnd/outletDetailContainer.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OutletDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/06Outlets/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowRoomType = function DefaultShowRoomType(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "roomCard"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/outlet/" + item.Code + "/room/" + item.ID
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.RoomType, " (", item.Pax, ")"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "buttonRoom"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/reservations/booking"
  }, " Book "))));
};

var DefaultShowPromo = function DefaultShowPromo(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hvrbox"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/promo/detail/" + item.ID
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.Name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "overlay"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/promo/detail/" + item.ID
  }, " Read More "))));
};

var OutletDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OutletDetailContainer, _React$Component);

  function OutletDetailContainer() {
    var _this;

    _classCallCheck(this, OutletDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OutletDetailContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        var id = _this.state.outlet_detail_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET'
          }).then(function (response) {
            _this.setState({
              componentStatus: 'ready',
              outletData: response.data.data.data
            });

            _this.loadPromo();
          });
        }
      }
    };

    _this.loadRoomTypes = function () {
      if (_this.state.componentStatus != 'loading') {
        var outlet = _this.state.outletData.Code;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/roomtype/findByOutlet',
            method: 'GET',
            params: {
              'outlet': outlet
            }
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              roomTypeData: response.data.data.data
            });
          });
        }
      }
    };

    _this.loadPromo = function () {
      if (_this.state.componentStatus != 'loading') {
        var outlet = _this.state.outletData.Code;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/promo/findByOutlet',
            method: 'GET',
            params: {
              'outlet': outlet
            }
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              promoData: response.data.data.data
            });

            _this.loadRoomTypes();
          });
        }
      }
    };

    var element = document.getElementById('outletDetailContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      slideData: [{
        id: 1,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }],
      componentStatus: 'ready',
      // Data
      outletData: {},
      foodData: [],
      roomTypeData: [],
      promoData: [],
      type: 'card',
      outlet_detail_id: outlet_detail_id,
      baseUrl: "api/outlet/view/" + outlet_detail_id
    };

    _this.loadData();

    return _this;
  }

  _createClass(OutletDetailContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "outletDetail"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "text-white headerBG"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "outletName"
      }, this.state.outletData.Name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail-outlet container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "banner-detail-outlet",
        style: {
          backgroundImage: "url(/" + this.state.outletData.Photo + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "promo",
        className: "wow fadeIn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "text-black"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      }), "Promos On This Outlet "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "promoInOutlet"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowPromo, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.promoData,
        callMoreData: this.loadPromo
      }, this.state, {
        footer: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "room",
        className: "wow fadeIn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "text-black"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      }), "Available Room "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "roomInOutlet"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowRoomType, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.roomTypeData,
        callMoreData: this.loadRoomTypes
      }, this.state, {
        footer: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return OutletDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

OutletDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/outlet/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/06Outlets/FrontEnd/outletListContainer.jsx":
/*!*********************************************************************!*\
  !*** ./0Template/Module/06Outlets/FrontEnd/outletListContainer.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OutletListContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/06Outlets/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Card */ "./node_modules/@material-ui/core/Card/index.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardHeader */ "./node_modules/@material-ui/core/CardHeader/index.js");
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "./node_modules/@material-ui/core/CardMedia/index.js");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CardContent */ "./node_modules/@material-ui/core/CardContent/index.js");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/CardActions */ "./node_modules/@material-ui/core/CardActions/index.js");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Grow */ "./node_modules/@material-ui/core/Grow/index.js");
/* harmony import */ var _material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }















var DefaultShowData = function DefaultShowData(props) {
  var item = props.item;
  console.log(item);
  if (item.Photo == "null") item.Photo = "uploads/Empty.jpg";
  if (item.Photo == null) item.Photo = "uploads/Empty.jpg";
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12___default.a, {
    "in": true,
    timeout: 2000
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6___default.a, {
    className: ""
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8___default.a, {
    style: {
      height: "250px"
    },
    className: "media",
    image: "/" + item.Photo,
    title: item.Name
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
    noWrap: true,
    component: "h6"
  }, item.Name, " (", item.Code, ")"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default.a, {
    noWrap: true,
    component: "body"
  }, item.Address, " ", item.City)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10___default.a, {
    style: {
      paddingLeft: "12px",
      paddingRight: "12px"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "linkButton",
    variant: "contained",
    size: "small",
    color: "primary",
    href: "/outlet/detail/" + item.ID
  }, "View More"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
};

var OutletListContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(OutletListContainer, _React$Component);

  function OutletListContainer() {
    var _this;

    _classCallCheck(this, OutletListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OutletListContainer).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var page = window.page ? window.page : 1;
    var searchText = window.search ? window.search : "";
    _this.state = {
      type: 'card',
      data: [],
      searchText: searchText,
      componentStatus: 'ready',
      // Data
      baseUrl: "api/outlet/list",
      ajaxCall: "api/outlet/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      page: page,
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(OutletListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "outletList"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "CatalogCard"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "material-tabs"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        id: "tab1-tab",
        href: "#tab1",
        className: "active"
      }, "Nearby"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        id: "tab2-tab",
        href: "#tab2"
      }, "Surabaya"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        id: "tab3-tab",
        href: "#tab3"
      }, "Malang"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        id: "tab4-tab",
        href: "#tab4"
      }, "Sidoarjo"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        id: "tab5-tab",
        href: "#tab5"
      }, "All"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "yellow-bar"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.data,
        callMoreData: this.callMoreData
      }, this.state)))));
    }
  }]);

  return OutletListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

OutletListContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/outlet/list",
  isShowHidden: true,
  isInfiniteScroll: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.callMoreData = function (resetData) {
    if (_this2.state.componentStatus != 'loading') {
      console.log("CALL MORE DATA");
      var page = _this2.state.page;
      var result = _this2.state.data;
      var dataPerPage = _this2.state.limitPage;

      if (resetData) {
        page = resetData - 1;
        result = [];

        _this2.setState({
          componentStatus: 'ready'
        });
      }

      if (_this2.state.componentStatus != 'done') {
        _this2.setState({
          componentStatus: 'loading'
        });

        Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: _this2.state.baseUrl,
          method: 'GET',
          params: {
            'search[value]': _this2.state.searchText,
            'search[regex]': false,
            'start': page * dataPerPage,
            'length': dataPerPage
          }
        }).then(function (response) {
          if (result.length < response.data.data.total) {
            var _result;

            if (page == 0) {
              var urlPath = _this2.state.baseUrl;
            } else {
              var urlPath = _this2.state.baseUrl + '/' + (page + 1);
            }

            if (_this2.state.searchText) {
              urlPath += "?search=" + _this2.state.searchText;
            }

            (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

            _this2.setState({
              data: result,
              page: page + 1,
              componentStatus: 'ready',
              totalData: response.data.data.length
            });
          } else {
            _this2.setState({
              componentStatus: 'done'
            });
          }
        });
      }
    }
  };
};



/***/ }),

/***/ "./0Template/Module/06Outlets/FrontEnd/roomDetailContainer.jsx":
/*!*********************************************************************!*\
  !*** ./0Template/Module/06Outlets/FrontEnd/roomDetailContainer.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RoomDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/06Outlets/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowRoomType = function DefaultShowRoomType(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "roomCard"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.RoomType, " (", item.Pax, ")"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "buttonRoom"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, " Book "))));
};

var DefaultShowPromo = function DefaultShowPromo(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hvrbox"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.Name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "overlay"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, " Read More "))));
};

var RoomDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RoomDetailContainer, _React$Component);

  function RoomDetailContainer() {
    var _this;

    _classCallCheck(this, RoomDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RoomDetailContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        var code = _this.state.outlet_id;
        var id = _this.state.room_detail_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET',
            params: {
              'code': code,
              'id': id
            }
          }).then(function (response) {
            console.log(response.data.data.data);

            _this.setState({
              componentStatus: 'ready',
              roomData: response.data.data.data
            });

            _this.loadOutlet();
          });
        }
      }
    };

    _this.loadOutlet = function () {
      if (_this.state.componentStatus != 'loading') {
        var code = _this.state.outlet_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/outlet/findByCode',
            method: 'GET',
            params: {
              'code': code
            }
          }).then(function (response) {
            console.log(response.data.data.data);

            _this.setState({
              componentStatus: 'ready',
              outletData: response.data.data.data
            });

            _this.loadRoomTypes();
          });
        }
      }
    };

    _this.loadRoomTypes = function () {
      if (_this.state.componentStatus != 'loading') {
        var outlet = _this.state.outlet_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/roomtype/findByOutlet',
            method: 'GET',
            params: {
              'outlet': outlet
            }
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              roomTypeData: response.data.data.data
            });
          });
        }
      }
    };

    var element = document.getElementById('roomDetailContainer'); // const props = Object.assign({}, element.dataset)

    _this.state = {
      slideData: [{
        id: 1,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }, {
        id: 2,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }, {
        id: 3,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }, {
        id: 4,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }, {
        id: 5,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }, {
        id: 6,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }],
      componentStatus: 'ready',
      // Data
      roomData: [],
      outletData: [],
      roomTypeData: [],
      type: 'card',
      room_detail_id: room_id,
      outlet_id: outlet_id,
      baseUrl: "api/roomtype/getRoom"
    };

    _this.loadData();

    return _this;
  }

  _createClass(RoomDetailContainer, [{
    key: "render",
    value: function render() {
      console.log("isi room");
      console.log(this.state.roomData);
      if (this.state.roomData == "") return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);else return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "roomDetail"
      }, console.log("isi"), console.log(this.state.outletData), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "text-white headerBG top-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "roomName"
      }, this.state.roomData.RoomType), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.outletData.Name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail-room container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "banner-detail-room",
        style: {
          backgroundImage: "url(/" + this.state.roomData.Photo + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-room"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-6 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Deskripsi"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.roomData.Description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Harga")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Rp 45.000 / Jam"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Kapasitas")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5 Orang"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-6 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Fasilitas"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "TV")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.roomData.TVSize, " inch"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Jumlah TV")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.roomData.NumberOfTV, " TV"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Jumlah Mic")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.roomData.NumberOfMic, " Mic"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-4 title-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Toilet")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8 content-desc"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.roomData.Toilet)))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-6 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "buttonBookRoom"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/reservations/booking"
      }, " Book Room "))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        id: "other-room",
        className: "headerBG wow fadeIn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "text-white other-room-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      }), "Available Other Room"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 row"
      }, this.state.roomTypeData.map(function (data, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "roomCard"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "/outlet/" + data.Code + "/room/" + data.ID
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "/" + data.Photo
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "title"
        }, data.RoomType, " (", data.Pax, " Pax)")));
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return RoomDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

RoomDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/outlet/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/07Promo/FrontEnd/index.scss":
/*!******************************************************!*\
  !*** ./0Template/Module/07Promo/FrontEnd/index.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/07Promo/FrontEnd/promoDetailContainer.jsx":
/*!********************************************************************!*\
  !*** ./0Template/Module/07Promo/FrontEnd/promoDetailContainer.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewsDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/07Promo/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/0Template/Components/00Default/06Carousel/00demoCarousel.jsx */ "./0Template/Components/00Default/06Carousel/00demoCarousel.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var NewsDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewsDetailContainer, _React$Component);

  function NewsDetailContainer() {
    var _this;

    _classCallCheck(this, NewsDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewsDetailContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        console.log(_this.state.baseUrl);
        var id = _this.state.promo_detail_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET'
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              promoData: response.data.data.data
            });
          });
        }
      }
    };

    var promo_detail_id = window.promo_detail_id ? window.promo_detail_id : 0;
    var element = document.getElementById('promoDetailContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      slideData: [{
        id: 1,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }],
      componentStatus: 'ready',
      // Data
      promoData: {},
      promo_detail_id: promo_detail_id,
      baseUrl: "api/promo/view/" + promo_detail_id
    };

    _this.loadData();

    return _this;
  }

  _createClass(NewsDetailContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "promoDetail"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "text-white headerBG"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "promoTitle"
      }, this.state.promoData.Name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail-promo container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "banner-detail-promo",
        style: {
          backgroundImage: "url(/" + this.state.promoData.Photo + ")",
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-detail-promo col-md-12 row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-detail-promo col-md-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.state.promoData.Description
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-detail-promo available-promo col-md-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "available-promo-title"
      }, "Available Promo"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.state.promoData.publishDate)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return NewsDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

NewsDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/promo/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/07Promo/FrontEnd/promoListContainer.jsx":
/*!******************************************************************!*\
  !*** ./0Template/Module/07Promo/FrontEnd/promoListContainer.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PromoListContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/07Promo/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];
  var firstData = [];

  if (!(item.props[0] === undefined)) {
    if (item.props[0].Photo == null) item.props[0].Photo = "uploads/Empty.jpg";
    firstData.push({
      image: item.props[0].Photo,
      title: item.props[0].Name,
      desc: item.props[0].Description,
      ID: item.props[0].ID
    });
  }

  for (var i = 1; i < item.props.length; i++) {
    if (item.props[i].Photo == null) item.props[i].Photo = "uploads/Empty.jpg";
    allData.push({
      image: item.props[i].Photo,
      title: item.props[i].Name,
      desc: item.props[i].Description,
      ID: item.props[i].ID
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoList"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoSection col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, firstData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoBanner row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "contentTitle"
    }, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "contentDesc"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: data.desc
      }
    }), " "))));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoCard"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "title"
    }, data.title))));
  })));
};

var PromoListContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PromoListContainer, _React$Component);

  function PromoListContainer() {
    var _this;

    _classCallCheck(this, PromoListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PromoListContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var page = _this.state.page;
        var result = _this.state.data;
        var dataPerPage = _this.state.limitPage;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              if (page == 0) {
                var urlPath = _this.state.baseUrl;
              } else {
                var urlPath = _this.state.baseUrl + '/' + (page + 1);
              }

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('promoListContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "api/promo/list",
      ajaxCall: "api/promo/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(PromoListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      }));
    }
  }]);

  return PromoListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

PromoListContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/promo/list",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/08KritikSaran/FrontEnd/index.scss":
/*!************************************************************!*\
  !*** ./0Template/Module/08KritikSaran/FrontEnd/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/08KritikSaran/FrontEnd/kritikSaranContainer.jsx":
/*!**************************************************************************!*\
  !*** ./0Template/Module/08KritikSaran/FrontEnd/kritikSaranContainer.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/08KritikSaran/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var KritikSaranContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KritikSaranContainer, _React$Component);

  function KritikSaranContainer() {
    var _this;

    _classCallCheck(this, KritikSaranContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KritikSaranContainer).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};
      var re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      if (!values.email) {
        errors.email = "Username is required";
      }

      if (values.email && !re.test(values.email)) {
        errors.email = "Please enter a valid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    };

    _this.submitForm = function (values, actions) {
      document.getElementById("formReference").submit();
    };

    var hours = [];

    for (var i = 0; i < 12; i++) {
      var hour = i + 1;
      var name = "Hour";
      if (hour > 1) name = "Hours";
      hours[i] = {
        "key": hour,
        "value": hour + " " + name
      };
    }

    _this.state = {
      urlRegister: "/reservations/booking",
      initialValue: {
        outlet: outlet,
        roomType: roomType,
        reservationTime: reservationTime,
        reservationDate: reservationDate,
        duration: duration,
        description: desc
      },
      durationValue: hours
    };
    return _this;
  }

  _createClass(KritikSaranContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
        initialValues: this.state.initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
            action: _this2.state.urlRegister,
            method: "post",
            id: "formReference"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-sm-10 col-md-8 offset-md-2 offset-sm-1"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Room Type"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "roomType",
            placeholder: "Room Type",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "roomType",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Date"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationDate",
            placeholder: "reservationDate"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationDate",
            component: "div",
            className: "errorMessage"
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Time"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationTime",
            placeholder: "reservationTime"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationTime",
            component: "div",
            className: "errorMessage"
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Phone"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "duration",
            placeholder: "duration",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "duration",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Description"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "description",
            placeholder: "Note"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "description",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "RESERVE ROOM",
            className: "btn default_btn btn-primary form-control"
          })))));
        }
      });
    }
  }]);

  return KritikSaranContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var KritikSaran =
/*#__PURE__*/
function (_Component) {
  _inherits(KritikSaran, _Component);

  function KritikSaran() {
    var _this3;

    _classCallCheck(this, KritikSaran);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(KritikSaran).call(this));
    _this3.state = {
      isOpen: false
    };
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(KritikSaran, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.id, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var seo_title = this.state.seo_title;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-booking-reservation"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(KritikSaranContainer, null)));
    }
  }]);

  return KritikSaran;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (KritikSaran);

/***/ }),

/***/ "./0Template/Module/08KritikSaran/FrontEnd/requestSongContainer.jsx":
/*!**************************************************************************!*\
  !*** ./0Template/Module/08KritikSaran/FrontEnd/requestSongContainer.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/08KritikSaran/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var RequestSongContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RequestSongContainer, _React$Component);

  function RequestSongContainer() {
    var _this;

    _classCallCheck(this, RequestSongContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestSongContainer).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};
      var re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      if (!values.email) {
        errors.email = "Username is required";
      }

      if (values.email && !re.test(values.email)) {
        errors.email = "Please enter a valid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    };

    _this.submitForm = function (values, actions) {
      document.getElementById("formReference").submit();
    };

    var hours = [];

    for (var i = 0; i < 12; i++) {
      var hour = i + 1;
      var name = "Hour";
      if (hour > 1) name = "Hours";
      hours[i] = {
        "key": hour,
        "value": hour + " " + name
      };
    }

    _this.state = {
      urlRegister: "/reservations/booking",
      initialValue: {
        outlet: outlet,
        roomType: roomType,
        reservationTime: reservationTime,
        reservationDate: reservationDate,
        duration: duration,
        description: desc
      },
      durationValue: hours
    };
    return _this;
  }

  _createClass(RequestSongContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
        initialValues: this.state.initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
            action: _this2.state.urlRegister,
            method: "post",
            id: "formReference"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-sm-10 col-md-8 offset-md-2 offset-sm-1"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Room Type"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "roomType",
            placeholder: "Room Type",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "roomType",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Date"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationDate",
            placeholder: "reservationDate"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationDate",
            component: "div",
            className: "errorMessage"
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Time"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationTime",
            placeholder: "reservationTime"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationTime",
            component: "div",
            className: "errorMessage"
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Phone"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "duration",
            placeholder: "duration",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "duration",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Description"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "description",
            placeholder: "Note"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "description",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "RESERVE ROOM",
            className: "btn default_btn btn-primary form-control"
          })))));
        }
      });
    }
  }]);

  return RequestSongContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var RequestSong =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestSong, _Component);

  function RequestSong() {
    var _this3;

    _classCallCheck(this, RequestSong);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(RequestSong).call(this));
    _this3.state = {
      isOpen: false
    };
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(RequestSong, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.id, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var seo_title = this.state.seo_title;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-booking-reservation"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RequestSongContainer, null)));
    }
  }]);

  return RequestSong;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (RequestSong);

/***/ }),

/***/ "./0Template/Module/08KritikSaran/kritikSaranModule.jsx":
/*!**************************************************************!*\
  !*** ./0Template/Module/08KritikSaran/kritikSaranModule.jsx ***!
  \**************************************************************/
/*! exports provided: RequestSongContainer, KritikSaranContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_requestSongContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/requestSongContainer.jsx */ "./0Template/Module/08KritikSaran/FrontEnd/requestSongContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RequestSongContainer", function() { return _FrontEnd_requestSongContainer_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _FrontEnd_kritikSaranContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FrontEnd/kritikSaranContainer.jsx */ "./0Template/Module/08KritikSaran/FrontEnd/kritikSaranContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KritikSaranContainer", function() { return _FrontEnd_kritikSaranContainer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./0Template/Module/09Notifications/FrontEnd/notificationsContainer.jsx":
/*!******************************************************************************!*\
  !*** ./0Template/Module/09Notifications/FrontEnd/notificationsContainer.jsx ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./0Template/Module/09Notifications/notificationsModule.jsx":
/*!******************************************************************!*\
  !*** ./0Template/Module/09Notifications/notificationsModule.jsx ***!
  \******************************************************************/
/*! exports provided: NotificationsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_notificationsContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/notificationsContainer.jsx */ "./0Template/Module/09Notifications/FrontEnd/notificationsContainer.jsx");
/* harmony import */ var _FrontEnd_notificationsContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_FrontEnd_notificationsContainer_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "NotificationsContainer", function() { return _FrontEnd_notificationsContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default.a; });



/***/ }),

/***/ "./0Template/Module/10MemberPoints/FrontEnd/memberPointsContainer.jsx":
/*!****************************************************************************!*\
  !*** ./0Template/Module/10MemberPoints/FrontEnd/memberPointsContainer.jsx ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./0Template/Module/10MemberPoints/memberPointsModule.jsx":
/*!****************************************************************!*\
  !*** ./0Template/Module/10MemberPoints/memberPointsModule.jsx ***!
  \****************************************************************/
/*! exports provided: MemberPointsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_memberPointsContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/memberPointsContainer.jsx */ "./0Template/Module/10MemberPoints/FrontEnd/memberPointsContainer.jsx");
/* harmony import */ var _FrontEnd_memberPointsContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_FrontEnd_memberPointsContainer_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "MemberPointsContainer", function() { return _FrontEnd_memberPointsContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default.a; });



/***/ }),

/***/ "./0Template/Module/13Vouchers/FrontEnd/vouchersDetailContainer.jsx":
/*!**************************************************************************!*\
  !*** ./0Template/Module/13Vouchers/FrontEnd/vouchersDetailContainer.jsx ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./0Template/Module/13Vouchers/FrontEnd/vouchersListContainer.jsx":
/*!************************************************************************!*\
  !*** ./0Template/Module/13Vouchers/FrontEnd/vouchersListContainer.jsx ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./0Template/Module/13Vouchers/vouchersModule.jsx":
/*!********************************************************!*\
  !*** ./0Template/Module/13Vouchers/vouchersModule.jsx ***!
  \********************************************************/
/*! exports provided: VouchersListContainer, VouchersDetailContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_vouchersListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/vouchersListContainer.jsx */ "./0Template/Module/13Vouchers/FrontEnd/vouchersListContainer.jsx");
/* harmony import */ var _FrontEnd_vouchersListContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_FrontEnd_vouchersListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "VouchersListContainer", function() { return _FrontEnd_vouchersListContainer_jsx__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var _FrontEnd_vouchersDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FrontEnd/vouchersDetailContainer.jsx */ "./0Template/Module/13Vouchers/FrontEnd/vouchersDetailContainer.jsx");
/* harmony import */ var _FrontEnd_vouchersDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_FrontEnd_vouchersDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "VouchersDetailContainer", function() { return _FrontEnd_vouchersDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1___default.a; });




/***/ }),

/***/ "./0Template/Module/14OutletsReservation/FrontEnd/index.scss":
/*!*******************************************************************!*\
  !*** ./0Template/Module/14OutletsReservation/FrontEnd/index.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/14OutletsReservation/FrontEnd/reservationBookingContainer.jsx":
/*!****************************************************************************************!*\
  !*** ./0Template/Module/14OutletsReservation/FrontEnd/reservationBookingContainer.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/14OutletsReservation/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var ReservationBookingContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReservationBookingContainer, _React$Component);

  function ReservationBookingContainer() {
    var _this;

    _classCallCheck(this, ReservationBookingContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReservationBookingContainer).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};
      var re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      if (!values.email) {
        errors.email = "Username is required";
      }

      if (values.email && !re.test(values.email)) {
        errors.email = "Please enter a valid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    };

    _this.submitForm = function (values, actions) {
      document.getElementById("formReference").submit();
    };

    var hours = [];

    for (var i = 0; i < 12; i++) {
      var hour = i + 1;
      var name = "Hour";
      if (hour > 1) name = "Hours";
      hours[i] = {
        "key": hour,
        "value": hour + " " + name
      };
    }

    _this.state = {
      urlRegister: "/reservations/booking",
      initialValue: {
        outlet: outlet,
        roomType: roomType,
        reservationTime: reservationTime,
        reservationDate: reservationDate,
        duration: duration,
        description: desc
      },
      durationValue: hours
    };
    return _this;
  }

  _createClass(ReservationBookingContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
        initialValues: this.state.initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
            action: _this2.state.urlRegister,
            method: "post",
            id: "formReference"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-sm-10 col-md-8 offset-md-2 offset-sm-1"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Room Type"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "roomType",
            placeholder: "Room Type",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "roomType",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Date"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationDate",
            placeholder: "reservationDate"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationDate",
            component: "div",
            className: "errorMessage"
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Reservation Time"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "reservationTime",
            placeholder: "reservationTime"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "reservationTime",
            component: "div",
            className: "errorMessage"
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Phone"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldSelectOption"], {
            name: "duration",
            placeholder: "duration",
            options: _this2.state.durationValue
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "duration",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "label-login"
          }, "Description"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "input-group form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_2__["FieldText"], {
            name: "description",
            placeholder: "Note"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
            name: "description",
            component: "div",
            className: "errorMessage"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "RESERVE ROOM",
            className: "btn default_btn btn-primary form-control"
          })))));
        }
      });
    }
  }]);

  return ReservationBookingContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var ReservationBooking =
/*#__PURE__*/
function (_Component) {
  _inherits(ReservationBooking, _Component);

  function ReservationBooking() {
    var _this3;

    _classCallCheck(this, ReservationBooking);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ReservationBooking).call(this));
    _this3.state = {
      isOpen: false
    };
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(ReservationBooking, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.id, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var seo_title = this.state.seo_title;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-booking-reservation"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ReservationBookingContainer, null)));
    }
  }]);

  return ReservationBooking;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ReservationBooking);

/***/ }),

/***/ "./0Template/Module/14OutletsReservation/FrontEnd/reservationDetailContainer.jsx":
/*!***************************************************************************************!*\
  !*** ./0Template/Module/14OutletsReservation/FrontEnd/reservationDetailContainer.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReservationDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/14OutletsReservation/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowRoomType = function DefaultShowRoomType(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "roomCard"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.RoomType, " (", item.Pax, ")"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "buttonRoom"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, " Book "))));
};

var DefaultShowPromo = function DefaultShowPromo(props) {
  var item = props.item;
  console.log(item);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4 col-md-4 col-sm-6 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hvrbox"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/" + item.Photo
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "title"
  }, item.Name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "overlay"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, " Read More "))));
};

var ReservationDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReservationDetailContainer, _React$Component);

  function ReservationDetailContainer() {
    var _this;

    _classCallCheck(this, ReservationDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReservationDetailContainer).call(this));

    _this.loadData = function () {
      if (_this.state.componentStatus != 'loading') {
        var id = _this.state.outlet_detail_id;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: _this.state.baseUrl,
            method: 'GET'
          }).then(function (response) {
            _this.setState({
              componentStatus: 'ready',
              outletData: response.data.data.data
            });

            _this.loadPromo();
          });
        }
      }
    };

    _this.loadRoomTypes = function () {
      if (_this.state.componentStatus != 'loading') {
        var outlet = _this.state.outletData.Code;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/roomtype/findByOutlet',
            method: 'GET',
            params: {
              'outlet': outlet
            }
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              roomTypeData: response.data.data.data
            });
          });
        }
      }
    };

    _this.loadPromo = function () {
      if (_this.state.componentStatus != 'loading') {
        var outlet = _this.state.outletData.Code;

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
            url: '/api/promo/findByOutlet',
            method: 'GET',
            params: {
              'outlet': outlet
            }
          }).then(function (response) {
            console.log(response.data.data);

            _this.setState({
              componentStatus: 'ready',
              promoData: response.data.data.data
            });

            _this.loadRoomTypes();
          });
        }
      }
    };

    var outlet_detail_id = window.outlet_detail_id ? window.outlet_detail_id : 0;
    var element = document.getElementById('outletDetailContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      slideData: [{
        id: 1,
        image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
        title: 'Title 1'
      }],
      componentStatus: 'ready',
      // Data
      outletData: {},
      foodData: [],
      roomTypeData: [],
      promoData: [],
      type: 'card',
      outlet_detail_id: outlet_detail_id,
      baseUrl: "api/outlet/view/" + outlet_detail_id
    };

    _this.loadData();

    return _this;
  }

  _createClass(ReservationDetailContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "outletDetail"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "text-white headerBG"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "outletName"
      }, this.state.outletData.Name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail-outlet"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "banner-detail-outlet",
        style: {
          backgroundImage: "url(/" + this.state.outletData.Photo + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "promo",
        className: "wow fadeIn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "text-black"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      }), "Promos On This Outlet "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "promoInOutlet row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowPromo, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.promoData,
        callMoreData: this.loadPromo
      }, this.state, {
        footer: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "room",
        className: "wow fadeIn"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "text-black"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
        className: "lineIndicatorBlue"
      }), "Available Room "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "roomInOutlet row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowRoomType, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.roomTypeData,
        callMoreData: this.loadRoomTypes
      }, this.state, {
        footer: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return ReservationDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ReservationDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/outlet/view",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/14OutletsReservation/FrontEnd/reservationListContainer.jsx":
/*!*************************************************************************************!*\
  !*** ./0Template/Module/14OutletsReservation/FrontEnd/reservationListContainer.jsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReservationListContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/14OutletsReservation/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Card */ "./node_modules/@material-ui/core/Card/index.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardHeader */ "./node_modules/@material-ui/core/CardHeader/index.js");
/* harmony import */ var _material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardHeader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "./node_modules/@material-ui/core/CardMedia/index.js");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CardContent */ "./node_modules/@material-ui/core/CardContent/index.js");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/CardActions */ "./node_modules/@material-ui/core/CardActions/index.js");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Grow */ "./node_modules/@material-ui/core/Grow/index.js");
/* harmony import */ var _material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }















var DefaultShowData = function DefaultShowData(props) {
  var item = props.item;
  console.log(item);
  var color = "#c67019";

  if (item.reservation_status == "pending") {
    color = "#c67019";
  } else if (item.reservation_status == "success") {
    color = "#0c7b2a";
  } else if (item.reservation_status == "expired") {
    color = "#c11054";
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-12 col-md-12 col-lg-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grow__WEBPACK_IMPORTED_MODULE_12___default.a, {
    "in": true,
    timeout: 2000
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card_reservation"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card_header"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-12 col-md-8 col-lg-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      padding: "20px",
      "float": "left"
    }
  }, item.outlet_name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      "float": "right",
      paddingLeft: "20px",
      paddingBottom: "20px",
      paddingTop: "20px"
    }
  }, item.reservation_date_time)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-12 col-md-4 col-lg-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      "float": "right",
      padding: "20px",
      background: color,
      borderRadius: "0 20px 0 0"
    }
  }, item.reservation_status)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card_body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      padding: "20px"
    }
  }, item.room_details.RoomType, ", ", item.room_details.Pax, " pax")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
};

var ReservationListContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReservationListContainer, _React$Component);

  function ReservationListContainer() {
    var _this;

    _classCallCheck(this, ReservationListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReservationListContainer).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var page = window.page ? window.page : 1;
    var searchText = window.search ? window.search : "";
    _this.state = {
      type: 'card',
      data: [],
      searchText: searchText,
      componentStatus: 'ready',
      // Data
      baseUrl: "api/reservation/view",
      ajaxCall: "api/reservation/view",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      page: page,
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(ReservationListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "reservationList"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "CatalogCard"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        data: this.state.data,
        callMoreData: this.callMoreData
      }, this.state)))));
    }
  }]);

  return ReservationListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ReservationListContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/reservation/view",
  isShowHidden: true,
  isInfiniteScroll: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.callMoreData = function (resetData) {
    if (_this2.state.componentStatus != 'loading') {
      console.log("CALL MORE DATA");
      var page = _this2.state.page;
      var result = _this2.state.data;
      var dataPerPage = _this2.state.limitPage;

      if (resetData) {
        page = resetData - 1;
        result = [];

        _this2.setState({
          componentStatus: 'ready'
        });
      }

      if (_this2.state.componentStatus != 'done') {
        _this2.setState({
          componentStatus: 'loading'
        });

        Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: _this2.state.baseUrl,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token
          },
          params: {
            'start': page * dataPerPage,
            'length': dataPerPage
          }
        }).then(function (response) {
          console.log(response);

          if (result.length < response.data.data.total) {
            var _result;

            if (page == 0) {
              var urlPath = _this2.state.baseUrl;
            } else {
              var urlPath = _this2.state.baseUrl + '/' + (page + 1);
            }

            if (_this2.state.searchText) {
              urlPath += "?search=" + _this2.state.searchText;
            }

            (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

            _this2.setState({
              data: result,
              page: page + 1,
              componentStatus: 'ready',
              totalData: response.data.data.length
            });
          } else {
            _this2.setState({
              componentStatus: 'done'
            });
          }
        });
      }
    }
  };
};



/***/ }),

/***/ "./0Template/Module/14OutletsReservation/reservationModule.jsx":
/*!*********************************************************************!*\
  !*** ./0Template/Module/14OutletsReservation/reservationModule.jsx ***!
  \*********************************************************************/
/*! exports provided: ReservationListContainer, ReservationDetailContainer, ReservationBookingContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_reservationListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/reservationListContainer.jsx */ "./0Template/Module/14OutletsReservation/FrontEnd/reservationListContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReservationListContainer", function() { return _FrontEnd_reservationListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _FrontEnd_reservationDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FrontEnd/reservationDetailContainer.jsx */ "./0Template/Module/14OutletsReservation/FrontEnd/reservationDetailContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReservationDetailContainer", function() { return _FrontEnd_reservationDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _FrontEnd_reservationBookingContainer_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FrontEnd/reservationBookingContainer.jsx */ "./0Template/Module/14OutletsReservation/FrontEnd/reservationBookingContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReservationBookingContainer", function() { return _FrontEnd_reservationBookingContainer_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./0Template/Module/15Receipt/FrontEnd/index.scss":
/*!********************************************************!*\
  !*** ./0Template/Module/15Receipt/FrontEnd/index.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/15Receipt/FrontEnd/receiptDetailContainer.jsx":
/*!************************************************************************!*\
  !*** ./0Template/Module/15Receipt/FrontEnd/receiptDetailContainer.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReceiptDetailContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/15Receipt/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var numberWithCommas = function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
};

var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "receiptDetail"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "headerBG text-white"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-center"
  }, item.props[0].receptionInvoice.data[0].Invoice), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Room"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, item.props[0].receptionInvoice.data[0].Status_Kamar)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, item.props[0].receptionInvoice.data[0].Nama)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Date"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, item.props[0].receptionInvoice.data[0].Date))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "receiptSection col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Sewa Ruangan"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(parseInt(item.props[0].receptionInvoice.data[0].Sewa_Kamar_Setelah_Diskon_Non_Member) + parseInt(item.props[0].receptionInvoice.data[0].Total_Extend)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12"
  }, "Rincian Penjualan")), item.props[2].orderPenjualan.data[0].map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12 row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12"
    }, data.Nama)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12 row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, data.Qty, " x ", numberWithCommas(data.Harga_Setelah_Diskon_Promo)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6 receipt-detail-content"
    }, numberWithCommas(parseInt(data.Qty) * parseInt(data.Harga_Setelah_Diskon_Promo)))));
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Jumlah Ruangan"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(parseInt(item.props[0].receptionInvoice.data[0].Sewa_Kamar_Setelah_Diskon_Non_Member) + parseInt(item.props[0].receptionInvoice.data[0].Total_Extend)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Jumlah Penjualan"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[0].receptionInvoice.data[0].Jumlah_Penjualan_Sebelum_Service_Pajak))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Diskon"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, "(", numberWithCommas(item.props[0].receptionInvoice.data[0].Total_Discount_Member), ")")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Jumlah")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, numberWithCommas(parseInt(item.props[0].receptionInvoice.data[0].Sewa_Kamar_Setelah_Diskon_Non_Member) + parseInt(item.props[0].receptionInvoice.data[0].Total_Extend) + parseInt(item.props[0].receptionInvoice.data[0].Jumlah_Penjualan_Sebelum_Service_Pajak) - parseInt(item.props[0].receptionInvoice.data[0].Total_Discount_Member))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Service FnB 5%"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[0].receptionInvoice.data[0].Service_Penjualan))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Service Ruangan 5%"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[0].receptionInvoice.data[0].Service_Kamar))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Pajak FnB 5%"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[0].receptionInvoice.data[0].Tax_Penjualan))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Tax Ruangan 5%"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[0].receptionInvoice.data[0].Tax_Kamar))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "result"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, "Jumlah Bersih"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, numberWithCommas(item.props[1].summaryPayment.data[0].Pay_Value))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "CASH")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6 receipt-detail-content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, numberWithCommas(item.props[1].summaryPayment.data[0].Pay_Value)))))));
};

var ReceiptDetailContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReceiptDetailContainer, _React$Component);

  function ReceiptDetailContainer() {
    var _this;

    _classCallCheck(this, ReceiptDetailContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReceiptDetailContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var result = _this.state.data;

        if (resetData) {
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < 1) {
              var _result;

              console.log(response.data);

              (_result = result).push.apply(_result, _toConsumableArray(response.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: 1
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('receiptDetailContainer'); // const props = Object.assign({}, element.dataset)

    _this.state = {
      type: 'card',
      // data:[{"receptionInvoice":{"state":true,"length":1,"data":[{"Outlet":"HP043","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Transfer":"","Date":"2019-04-13T13:11:27.000Z","Jam_Sewa":2,"Menit_Sewa":0,"Checkin":"2019-04-13T13:11:27.000Z","Checkout":"2019-04-13T15:11:27.000Z","Reservation":"","Shift":1,"Member":"110819031007","Nama":"NI KADEK NINA PRADANI","Kamar":"106","Sewa_Kamar_Sebelum_Diskon_Non_Member":90000,"Diskon_Promo_Sewa_Kamar_Non_Member":0,"Sewa_Kamar_Setelah_Diskon_Non_Member":90000,"Total_Extend":45000,"Overpax":0,"Discount_Kamar_Member":13500,"Surcharge_Kamar":0,"Service_Kamar":6075,"Tax_Kamar":12757.5,"Total_Kamar":140332,"Charge_Penjualan":115000,"Total_Cancelation":0,"Jumlah_Penjualan_Sebelum_Service_Pajak":115000,"Discount_Penjualan_Member":11500,"Service_Penjualan":5175,"Tax_Penjualan":10867.5,"Total_Penjualan":119542,"Charge_Lain":0,"Status_Kamar":"Kamar_Normal ","Uang_Voucher":0,"Total_Discount_Member":25000}]}},{"summaryPayment":{"state":true,"length":1,"data":[{"Outlet":"HP043","Summary":"SUM-1904130011","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Date":"2019-04-13T14:57:28.000Z","Shift":1,"Id_Payment":0,"Payment_Type":"CASH","Member":"110819031007","Input1":"","Input2":"","Input3":"","Input4":"","Pay_Value":259875,"Status":"0","Edc_Machine":"","Pembayaran":0,"Kembalian":0}]}},{"orderPenjualan":{"state":true,"length":1,"data":[[{"Outlet":"HP043","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Transfer":"","Order_Penjualan":"SOA-1904130025","Inventory":"FREE12","Nama":"FREE TEH MANIS","Qty":1,"Harga_Sebelum_Diskon_Non_Member":0,"Promo_Food":"","Diskon_Promo_Total":0,"Diskon_Promo_PerItem":0,"Harga_Setelah_Diskon_Promo":0},{"Outlet":"HP043","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Transfer":"","Order_Penjualan":"SOA-1904130025","Inventory":"MBVC71","Nama":"SMOOTHIES STRAWBERRY","Qty":1,"Harga_Sebelum_Diskon_Non_Member":35000,"Promo_Food":"","Diskon_Promo_Total":0,"Diskon_Promo_PerItem":0,"Harga_Setelah_Diskon_Promo":35000},{"Outlet":"HP043","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Transfer":"","Order_Penjualan":"SOA-1904130027","Inventory":"MKHP16","Nama":"BIHUN GORENG AYAM","Qty":1,"Harga_Sebelum_Diskon_Non_Member":40000,"Promo_Food":"","Diskon_Promo_Total":0,"Diskon_Promo_PerItem":0,"Harga_Setelah_Diskon_Promo":40000},{"Outlet":"HP043","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Transfer":"","Order_Penjualan":"SOA-1904130035","Inventory":"PAKT31","Nama":"PAKET NASI AYAM GRG TERONG CHILI","Qty":1,"Harga_Sebelum_Diskon_Non_Member":40000,"Promo_Food":"","Diskon_Promo_Total":0,"Diskon_Promo_PerItem":0,"Harga_Setelah_Diskon_Promo":40000}]]}},{"penambahanPoint":{"state":true,"length":1,"data":[{"Outlet":"HP043","Add_Reward":"ADR-1904130002","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Member":"110819031007","Date":"13/04/2019 07:00:00","Expired_Date":"13/10/2019 07:00:00","Point":4}]}},{"voucher":{"state":true,"length":1,"data":[{"Outlet":"HP043","Voucher":"V43-1904130009","Invoice":"IVO-1904130012","Reception":"RCP-1904130012","Member":"110819031007","Nama":"NI KADEK NINA PRADANI","Active_Date":"2019-04-13T00:00:00.000Z","Expired_Date":"2019-04-27T00:00:00.000Z","Jenis_Kamar":"SMALL","Jam_Free":1,"Menit_free":0,"Date_Start":0,"Jam_Start":"Hari Ini","Time_Start":"10:00:00","Date_Finish":1,"Jam_Finish":"Besok Dini Hari ","Time_Finish":"04:00:00","Nilai":0,"Jenis_Voucher":0,"Status":1,"Status_Penggunaan":"Belum_Digunakan"}]}},{"infoTotalKlaimPoint":{"state":true,"length":1,"data":[{"Total_Klaim_Point":0}]}},{"infoTotalRewardPoint":{"state":true,"length":1,"data":[{"Total_Point":23}]}},{"infoTotalActiveRewardPoint":{"state":true,"length":1,"data":[{"Total_Point":23}]}}],
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "http://13.76.167.131:3011/ivc/HP043/IVO-1904130012",
      ajaxCall: "http://13.76.167.131:3011/ivc/HP043/IVO-1904130012",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999,
      isOpen: false
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(ReceiptDetailContainer, [{
    key: "render",
    value: function render() {
      if (this.state.data.length == 0) return null;else return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, console.log(this.state.data), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      })));
    }
  }]);

  return ReceiptDetailContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ReceiptDetailContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "http://13.76.167.131:3011/ivc/HP043/IVO-1904130012",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/15Receipt/FrontEnd/receiptListContainer.jsx":
/*!**********************************************************************!*\
  !*** ./0Template/Module/15Receipt/FrontEnd/receiptListContainer.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReceiptListContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/15Receipt/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
/* harmony import */ var _receiptDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./receiptDetailContainer.jsx */ "./0Template/Module/15Receipt/FrontEnd/receiptDetailContainer.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];

  for (var i = 0; i < item.props.length; i++) {
    allData.push({
      invoice: item.props[i].Invoice,
      date: item.props[i].Date,
      outlet: item.props[i].Outlet
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "receiptList"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "receiptSection col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "receiptItem",
      onClick: props.toggleModal
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12 row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, data.invoice)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "outlet-name"
    }, " ", data.outlet))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12"
    }, data.date), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-md-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)));
  })));
};

var ReceiptListContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReceiptListContainer, _React$Component);

  function ReceiptListContainer() {
    var _this;

    _classCallCheck(this, ReceiptListContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReceiptListContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        console.log(_this.state.ajaxCall);
        var result = _this.state.data;

        if (resetData) {
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            headers: {
              'Accept': 'text/plain'
            },
            params: {}
          }).then(function (response) {
            if (result.length < response.data.length) {
              var _result;

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    _this.toggleModal = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    var element = document.getElementById('receiptListContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      // data:[{"Outlet":"HP043","Reception":"RCP-1904130012","Invoice":"IVO-1904130012","Date":"2019-04-13T13:11:27.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"},
      //     {"Outlet":"HP108","Reception":"RCP-1903200011","Invoice":"IVC-1903200011","Date":"2019-03-20T17:26:28.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"},
      //     {"Outlet":"HP108","Reception":"RCP-1903260043","Invoice":"IVC-1903260043","Date":"2019-03-26T20:26:30.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"},
      //     {"Outlet":"HP108","Reception":"RCP-1903290047","Invoice":"IVC-1903290047","Date":"2019-03-29T19:45:53.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"},
      //     {"Outlet":"HP108","Reception":"RCP-1904010050","Invoice":"IVC-1904010050","Date":"2019-04-01T20:27:08.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"},
      //     {"Outlet":"HP108","Reception":"RCP-1905010085","Invoice":"IVC-1905010085","Date":"2019-05-01T21:26:08.000Z","Member":"110819031007","Nama":"NI KADEK NINA PRADANI"}],
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "http://13.76.167.131:3011/mbr/110819031007",
      ajaxCall: "http://13.76.167.131:3011/mbr/110819031007",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999,
      isOpen: false
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(ReceiptListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data,
        toggleModal: this.toggleModal
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isOpen: this.state.isOpen,
        closeModal: this.toggleModal.bind(this),
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_receiptDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
          baseUrl: "/" + this.props.baseUrl + "/delete/",
          method: "post"
        })
      }));
    }
  }]);

  return ReceiptListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ReceiptListContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "http://13.76.167.131:3011/mbr/110819031007",
  isShowHidden: true,
  isInfiniteScroll: true
};


var ReceiptDetail =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ReceiptDetail, _React$Component2);

  function ReceiptDetail() {
    _classCallCheck(this, ReceiptDetail);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReceiptDetail).apply(this, arguments));
  }

  _createClass(ReceiptDetail, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xs-12",
        style: {
          textAlign: 'center'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xs-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "ARE YOU REALLY WANT TO DELETE THIS ONE ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xs-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "btn btn-primary"
      }, " CANCEL ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xs-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        method: this.props.method,
        action: this.props.baseUrl
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        className: "btn btn-danger",
        value: "DELETE"
      }))));
    }
  }]);

  return ReceiptDetail;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/***/ }),

/***/ "./0Template/Module/16KeepingBottle/FrontEnd/index.scss":
/*!**************************************************************!*\
  !*** ./0Template/Module/16KeepingBottle/FrontEnd/index.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/16KeepingBottle/FrontEnd/keepingBottleContainer.jsx":
/*!******************************************************************************!*\
  !*** ./0Template/Module/16KeepingBottle/FrontEnd/keepingBottleContainer.jsx ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeepingBottleContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/16KeepingBottle/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];
  var firstData = [];

  if (!(item.props[0] === undefined)) {
    if (item.props[0].Photo == null) item.props[0].Photo = "uploads/Empty.jpg";
    firstData.push({
      image: item.props[0].Photo,
      title: item.props[0].Name,
      desc: item.props[0].Description,
      ID: item.props[0].ID
    });
  }

  for (var i = 1; i < item.props.length; i++) {
    if (item.props[i].Photo == null) item.props[i].Photo = "uploads/Empty.jpg";
    allData.push({
      image: item.props[i].Photo,
      title: item.props[i].Name,
      desc: item.props[i].Description,
      ID: item.props[i].ID
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoList"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoSection col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, firstData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoBanner row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "contentTitle"
    }, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "contentDesc"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: data.desc
      }
    }), " "))));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoCard"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "title"
    }, data.title))));
  })));
};

var KeepingBottleContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KeepingBottleContainer, _React$Component);

  function KeepingBottleContainer() {
    var _this;

    _classCallCheck(this, KeepingBottleContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KeepingBottleContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var page = _this.state.page;
        var result = _this.state.data;
        var dataPerPage = _this.state.limitPage;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              if (page == 0) {
                var urlPath = _this.state.baseUrl;
              } else {
                var urlPath = _this.state.baseUrl + '/' + (page + 1);
              }

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('helpContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "api/promo/list",
      ajaxCall: "api/promo/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(KeepingBottleContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      }));
    }
  }]);

  return KeepingBottleContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

KeepingBottleContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/promo/list",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/16KeepingBottle/keepingBottleModule.jsx":
/*!******************************************************************!*\
  !*** ./0Template/Module/16KeepingBottle/keepingBottleModule.jsx ***!
  \******************************************************************/
/*! exports provided: KeepingBottleContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_keepingBottleContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/keepingBottleContainer.jsx */ "./0Template/Module/16KeepingBottle/FrontEnd/keepingBottleContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeepingBottleContainer", function() { return _FrontEnd_keepingBottleContainer_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./0Template/Module/17Help/FrontEnd/helpContainer.jsx":
/*!************************************************************!*\
  !*** ./0Template/Module/17Help/FrontEnd/helpContainer.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HelpContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/17Help/FrontEnd/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var DefaultShowData = function DefaultShowData(props) {
  console.log(props);
  var item = props;
  var allData = [];
  var firstData = [];

  if (!(item.props[0] === undefined)) {
    if (item.props[0].Photo == null) item.props[0].Photo = "uploads/Empty.jpg";
    firstData.push({
      image: item.props[0].Photo,
      title: item.props[0].Name,
      desc: item.props[0].Description,
      ID: item.props[0].ID
    });
  }

  for (var i = 1; i < item.props.length; i++) {
    if (item.props[i].Photo == null) item.props[i].Photo = "uploads/Empty.jpg";
    allData.push({
      image: item.props[i].Photo,
      title: item.props[i].Name,
      desc: item.props[i].Description,
      ID: item.props[i].ID
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoList"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "promoSection col-lg-12 col-md-12 col-sm-12 col-xs-12"
  }, firstData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoBanner row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "contentTitle"
    }, data.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "contentDesc"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: data.desc
      }
    }), " "))));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, allData.map(function (data, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "promoCard"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/promo/detail/" + data.ID
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "/" + data.image
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "title"
    }, data.title))));
  })));
};

var HelpContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HelpContainer, _React$Component);

  function HelpContainer() {
    var _this;

    _classCallCheck(this, HelpContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HelpContainer).call(this));

    _this.callMoreData = function (resetData) {
      if (_this.state.componentStatus != 'loading') {
        console.log("CALL MORE DATA");
        var page = _this.state.page;
        var result = _this.state.data;
        var dataPerPage = _this.state.limitPage;

        if (resetData) {
          page = resetData - 1;
          result = [];

          _this.setState({
            componentStatus: 'ready'
          });
        }

        if (_this.state.componentStatus != 'done') {
          _this.setState({
            componentStatus: 'loading'
          });

          console.log(page * dataPerPage);
          Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
            url: _this.state.ajaxCall,
            method: 'GET',
            params: {}
          }).then(function (response) {
            if (result.length < response.data.data.total) {
              var _result;

              if (page == 0) {
                var urlPath = _this.state.baseUrl;
              } else {
                var urlPath = _this.state.baseUrl + '/' + (page + 1);
              }

              (_result = result).push.apply(_result, _toConsumableArray(response.data.data.data));

              _this.setState({
                data: result,
                componentStatus: 'ready',
                totalData: response.data.data.length
              });
            } else {
              _this.setState({
                componentStatus: 'done'
              });
            }
          });
        }
      }
    };

    var element = document.getElementById('helpContainer');
    var props = Object.assign({}, element.dataset);
    _this.state = {
      type: 'card',
      data: [],
      componentStatus: 'ready',
      // Data
      baseUrl: "api/promo/list",
      ajaxCall: "api/promo/list",
      // Option
      isShowHidden: false,
      isInfiniteScroll: true,
      isPagination: true,
      limitPage: 8,
      // 00pagination related
      totalData: 9999
    };

    _this.callMoreData(true);

    return _this;
  }

  _createClass(HelpContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, {
        props: this.state.data
      }));
    }
  }]);

  return HelpContainer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

HelpContainer.defaultProps = {
  limitPage: 5,
  baseUrl: "api/promo/list",
  isShowHidden: true,
  isInfiniteScroll: true
};


/***/ }),

/***/ "./0Template/Module/17Help/FrontEnd/index.scss":
/*!*****************************************************!*\
  !*** ./0Template/Module/17Help/FrontEnd/index.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/17Help/helpModule.jsx":
/*!************************************************!*\
  !*** ./0Template/Module/17Help/helpModule.jsx ***!
  \************************************************/
/*! exports provided: HelpContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrontEnd_helpContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontEnd/helpContainer.jsx */ "./0Template/Module/17Help/FrontEnd/helpContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HelpContainer", function() { return _FrontEnd_helpContainer_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./2App/frontend.jsx":
/*!***************************!*\
  !*** ./2App/frontend.jsx ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frontend.scss */ "./2App/frontend.scss");
/* harmony import */ var _frontend_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_frontend_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/0Template/Module/01Login/loginModule.jsx */ "./0Template/Module/01Login/loginModule.jsx");
/* harmony import */ var _0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/0Template/Components/00Default/06Carousel/00demoCarousel.jsx */ "./0Template/Components/00Default/06Carousel/00demoCarousel.jsx");
/* harmony import */ var _0Template_Module_04News_FrontEnd_newsListContainer_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ~/0Template/Module/04News/FrontEnd/newsListContainer.jsx */ "./0Template/Module/04News/FrontEnd/newsListContainer.jsx");
/* harmony import */ var _0Template_Module_04News_FrontEnd_newsDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ~/0Template/Module/04News/FrontEnd/newsDetailContainer.jsx */ "./0Template/Module/04News/FrontEnd/newsDetailContainer.jsx");
/* harmony import */ var _0Template_Module_06Outlets_FrontEnd_outletListContainer_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ~/0Template/Module/06Outlets/FrontEnd/outletListContainer.jsx */ "./0Template/Module/06Outlets/FrontEnd/outletListContainer.jsx");
/* harmony import */ var _0Template_Module_06Outlets_FrontEnd_outletDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ~/0Template/Module/06Outlets/FrontEnd/outletDetailContainer.jsx */ "./0Template/Module/06Outlets/FrontEnd/outletDetailContainer.jsx");
/* harmony import */ var _0Template_Module_06Outlets_FrontEnd_roomDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../0Template/Module/06Outlets/FrontEnd/roomDetailContainer.jsx */ "./0Template/Module/06Outlets/FrontEnd/roomDetailContainer.jsx");
/* harmony import */ var _0Template_Module_05LandingPage_FrontEnd_landingPageSliderContainer_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ~/0Template/Module/05LandingPage/FrontEnd/landingPageSliderContainer.jsx */ "./0Template/Module/05LandingPage/FrontEnd/landingPageSliderContainer.jsx");
/* harmony import */ var _0Template_Module_05LandingPage_FrontEnd_landingPagePromoContainer_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ~/0Template/Module/05LandingPage/FrontEnd/landingPagePromoContainer.jsx */ "./0Template/Module/05LandingPage/FrontEnd/landingPagePromoContainer.jsx");
/* harmony import */ var _0Template_Module_05LandingPage_FrontEnd_landingPageNewsContainer_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ~/0Template/Module/05LandingPage/FrontEnd/landingPageNewsContainer.jsx */ "./0Template/Module/05LandingPage/FrontEnd/landingPageNewsContainer.jsx");
/* harmony import */ var _0Template_Module_05LandingPage_FrontEnd_landingPageOutletContainer_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ~/0Template/Module/05LandingPage/FrontEnd/landingPageOutletContainer.jsx */ "./0Template/Module/05LandingPage/FrontEnd/landingPageOutletContainer.jsx");
/* harmony import */ var _0Template_Module_07Promo_FrontEnd_promoListContainer_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ~/0Template/Module/07Promo/FrontEnd/promoListContainer.jsx */ "./0Template/Module/07Promo/FrontEnd/promoListContainer.jsx");
/* harmony import */ var _0Template_Module_07Promo_FrontEnd_promoDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ~/0Template/Module/07Promo/FrontEnd/promoDetailContainer.jsx */ "./0Template/Module/07Promo/FrontEnd/promoDetailContainer.jsx");
/* harmony import */ var _0Template_Module_08KritikSaran_kritikSaranModule_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ~/0Template/Module/08KritikSaran/kritikSaranModule.jsx */ "./0Template/Module/08KritikSaran/kritikSaranModule.jsx");
/* harmony import */ var _0Template_Module_09Notifications_notificationsModule_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ~/0Template/Module/09Notifications/notificationsModule.jsx */ "./0Template/Module/09Notifications/notificationsModule.jsx");
/* harmony import */ var _0Template_Module_10MemberPoints_memberPointsModule_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ~/0Template/Module/10MemberPoints/memberPointsModule.jsx */ "./0Template/Module/10MemberPoints/memberPointsModule.jsx");
/* harmony import */ var _0Template_Module_13Vouchers_vouchersModule_jsx__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ~/0Template/Module/13Vouchers/vouchersModule.jsx */ "./0Template/Module/13Vouchers/vouchersModule.jsx");
/* harmony import */ var _0Template_Module_14OutletsReservation_reservationModule_jsx__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ~/0Template/Module/14OutletsReservation/reservationModule.jsx */ "./0Template/Module/14OutletsReservation/reservationModule.jsx");
/* harmony import */ var _0Template_Module_15Receipt_FrontEnd_receiptListContainer_jsx__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ~/0Template/Module/15Receipt/FrontEnd/receiptListContainer.jsx */ "./0Template/Module/15Receipt/FrontEnd/receiptListContainer.jsx");
/* harmony import */ var _0Template_Module_15Receipt_FrontEnd_receiptDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ~/0Template/Module/15Receipt/FrontEnd/receiptDetailContainer.jsx */ "./0Template/Module/15Receipt/FrontEnd/receiptDetailContainer.jsx");
/* harmony import */ var _0Template_Module_16KeepingBottle_keepingBottleModule_jsx__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ~/0Template/Module/16KeepingBottle/keepingBottleModule.jsx */ "./0Template/Module/16KeepingBottle/keepingBottleModule.jsx");
/* harmony import */ var _0Template_Module_17Help_helpModule_jsx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ~/0Template/Module/17Help/helpModule.jsx */ "./0Template/Module/17Help/helpModule.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// slider, banner, infinite list, catalog, alert
// HOW TO MAKE INFINITE SCROLL, PAGINATION, SEARCH


























function callContainer(id, formCall) {
  var element = document.getElementById(id);

  if (element != null) {
    react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(formCall, element);
  }
}

window.pickPropsOrDefault = function (props, id, defaultElement, passingData) {
  var result = defaultElement;

  if (props[id]) {
    if (isFunction(props[id])) {
      console.log('call function' + passingData);
      result = props[id](passingData);
    } else {
      result = props[id];
    }
  }

  if (passingData) {
    var otherProps = _extends({}, result.props);

    for (var key in passingData) {
      var value = passingData[key];
      otherProps[key] = value;
    }

    result = react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(result, otherProps, null);
  }

  return result;
};

window.isFunction = function (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}; // Call LoginContainer Module


if ('LOGIN') {
  callContainer("login", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["LoginContainer"], null));
  callContainer("profileContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["ProfileContainer"], null));
  callContainer("registerStep1", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["RegisterStep1"], null));
  callContainer("registerStep2", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["RegisterStep2"], null));
  callContainer("registerStep3", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["RegisterStep3"], null));
  callContainer("changePasswordContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["ChangePasswordContainer"], null));
  callContainer("editProfileContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["EditProfileContainer"], null));
  callContainer("forgotPasswordContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordContainer"], null));
  callContainer("forgotPasswordFieldContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordFieldContainer"], null));
  callContainer("benefitsContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["BenefitsContainer"], null));
  callContainer("receiptListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_15Receipt_FrontEnd_receiptListContainer_jsx__WEBPACK_IMPORTED_MODULE_21__["default"], null));
  callContainer("receiptDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_15Receipt_FrontEnd_receiptDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_22__["default"], null));
}

callContainer("testCarousel", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Components_00Default_06Carousel_00demoCarousel_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null));
callContainer("newsListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_04News_FrontEnd_newsListContainer_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null));
callContainer("newsDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_04News_FrontEnd_newsDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null));
callContainer("outletListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_06Outlets_FrontEnd_outletListContainer_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null));
callContainer("outletDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_06Outlets_FrontEnd_outletDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null));
callContainer("roomDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_06Outlets_FrontEnd_roomDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null));
callContainer("landingPageSliderContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_05LandingPage_FrontEnd_landingPageSliderContainer_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], null));
callContainer("landingPagePromoContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_05LandingPage_FrontEnd_landingPagePromoContainer_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], null));
callContainer("landingPageNewsContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_05LandingPage_FrontEnd_landingPageNewsContainer_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], null));
callContainer("landingPageOutletContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_05LandingPage_FrontEnd_landingPageOutletContainer_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], null));
callContainer("promoListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_07Promo_FrontEnd_promoListContainer_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], null));
callContainer("promoDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_07Promo_FrontEnd_promoDetailContainer_jsx__WEBPACK_IMPORTED_MODULE_15__["default"], null));
callContainer("requestSongContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_08KritikSaran_kritikSaranModule_jsx__WEBPACK_IMPORTED_MODULE_16__["RequestSongContainer"], null));
callContainer("kritikSaranContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_08KritikSaran_kritikSaranModule_jsx__WEBPACK_IMPORTED_MODULE_16__["KritikSaranContainer"], null));
callContainer("notificationsContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_09Notifications_notificationsModule_jsx__WEBPACK_IMPORTED_MODULE_17__["NotificationsContainer"], null));
callContainer("memberPointsContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_10MemberPoints_memberPointsModule_jsx__WEBPACK_IMPORTED_MODULE_18__["MemberPointsContainer"], null));
callContainer("vouchersListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_13Vouchers_vouchersModule_jsx__WEBPACK_IMPORTED_MODULE_19__["VouchersListContainer"], null));
callContainer("vouchersDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_13Vouchers_vouchersModule_jsx__WEBPACK_IMPORTED_MODULE_19__["VouchersDetailContainer"], null));
callContainer("reservationListContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_14OutletsReservation_reservationModule_jsx__WEBPACK_IMPORTED_MODULE_20__["ReservationListContainer"], null));
callContainer("reservationDetailContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_14OutletsReservation_reservationModule_jsx__WEBPACK_IMPORTED_MODULE_20__["ReservationDetailContainer"], null));
callContainer("reservationBookingContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_14OutletsReservation_reservationModule_jsx__WEBPACK_IMPORTED_MODULE_20__["ReservationBookingContainer"], null));
callContainer("keepingBottleContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_16KeepingBottle_keepingBottleModule_jsx__WEBPACK_IMPORTED_MODULE_23__["KeepingBottleContainer"], null));
callContainer("helpContainer", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_17Help_helpModule_jsx__WEBPACK_IMPORTED_MODULE_24__["HelpContainer"], null));

/***/ }),

/***/ "./2App/frontend.scss":
/*!****************************!*\
  !*** ./2App/frontend.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=frontend.js.map