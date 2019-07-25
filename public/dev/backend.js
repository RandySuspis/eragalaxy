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
/******/ 		"backend": 0
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
/******/ 	deferredModules.push(["./2App/backend.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./0Template/Components/00Default/04Toast/00baseToast.jsx":
/*!****************************************************************!*\
  !*** ./0Template/Components/00Default/04Toast/00baseToast.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _00baseToast_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./00baseToast.scss */ "./0Template/Components/00Default/04Toast/00baseToast.scss");
/* harmony import */ var _00baseToast_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_00baseToast_scss__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 // if you are wondering why, so many level of Class
// it's because, i need to stop propagation
// and one component is considered as 1 big button
// you won't able to stop propagation if it's 1 element
// https://stackoverflow.com/questions/38619981/react-prevent-event-bubbling-in-nested-components-on-click

var DefaultCloseButton = function DefaultCloseButton() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "closeButton"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "/EraTheme/img/close.png",
    width: "30px"
  }));
};

var BaseToast =
/*#__PURE__*/
function (_Component) {
  _inherits(BaseToast, _Component);

  function BaseToast() {
    _classCallCheck(this, BaseToast);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseToast).apply(this, arguments));
  }

  _createClass(BaseToast, [{
    key: "render",
    value: function render() {
      var classPop = 'BaseToast';

      if (this.props.isOpen) {
        classPop = 'BaseToast show';
        this.props.closeToast(Math.random());
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classPop
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InnerPopup, {
        closeToast: this.props.closeToast,
        position: this.props.position,
        closeButton: this.props.closeButton
      }, this.props.content));
    }
  }]);

  return BaseToast;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

BaseToast.propTypes = {
  content: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element.isRequired
};

var InnerPopup =
/*#__PURE__*/
function (_Component2) {
  _inherits(InnerPopup, _Component2);

  function InnerPopup() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, InnerPopup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InnerPopup)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.stopBubblingEvent = function (e) {
      // e.stopPropagation();
      _this.props.closeToast(0);
    }, _temp));
  }

  _createClass(InnerPopup, [{
    key: "getPosition",
    value: function getPosition(position) {
      var style = {};

      switch (position) {
        case "bottom":
          style = {
            bottom: '20px'
          };
          break;

        case "top":
          style = {
            top: '20px'
          };
          break;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.getPosition("bottom");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "innerPopup",
        onClick: this.stopBubblingEvent,
        style: style
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CloseButton, {
        closeToast: this.props.closeToast,
        closeButton: this.props.closeButton
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "popupContentHolder"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "popupContent"
      }, this.props.children)));
    }
  }]);

  return InnerPopup;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var CloseButton =
/*#__PURE__*/
function (_Component3) {
  _inherits(CloseButton, _Component3);

  function CloseButton() {
    var _getPrototypeOf3;

    var _temp2, _this2;

    _classCallCheck(this, CloseButton);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _possibleConstructorReturn(_this2, (_temp2 = _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(CloseButton)).call.apply(_getPrototypeOf3, [this].concat(args))), _this2.handleCloseUp = function (e) {
      e.stopPropagation();

      _this2.props.closeToast(0);
    }, _temp2));
  }

  _createClass(CloseButton, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        onClick: this.handleCloseUp
      }, this.props.closeButton ? this.props.closeButton : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultCloseButton, null));
    }
  }]);

  return CloseButton;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (BaseToast);

/***/ }),

/***/ "./0Template/Components/00Default/04Toast/00baseToast.scss":
/*!*****************************************************************!*\
  !*** ./0Template/Components/00Default/04Toast/00baseToast.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Components/00Default/04Toast/00defaultBaseToast.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Components/00Default/04Toast/00defaultBaseToast.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _00baseToast_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./00baseToast.jsx */ "./0Template/Components/00Default/04Toast/00baseToast.jsx");
/* harmony import */ var _00baseToast_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./00baseToast.scss */ "./0Template/Components/00Default/04Toast/00baseToast.scss");
/* harmony import */ var _00baseToast_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_00baseToast_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _03Popup_close_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../03Popup/close.png */ "./0Template/Components/00Default/03Popup/close.png");
/* harmony import */ var _03Popup_close_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_03Popup_close_png__WEBPACK_IMPORTED_MODULE_4__);
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







var DefaultContent = function DefaultContent() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-12',
    style: {
      textAlign: 'center'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Hi this is testing toast, Need to create some animation though"));
};

var DefaultCloseButton = function DefaultCloseButton() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "closeButton"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _03Popup_close_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    width: "30px"
  }));
};

var DefaultBaseToast =
/*#__PURE__*/
function (_Component) {
  _inherits(DefaultBaseToast, _Component);

  function DefaultBaseToast() {
    var _this;

    _classCallCheck(this, DefaultBaseToast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DefaultBaseToast).call(this));

    _this.closeToast = function (number) {
      if (number == 0) {
        _this.setState({
          isOpen: false
        });
      } else {
        setTimeout(function () {
          _this.setState({
            isOpen: false
          });
        }, 2000);
      }
    };

    _this.openToast = function () {
      _this.setState({
        isOpen: true
      });
    };

    _this.state = {
      isOpen: false,
      zIndex: 1500,
      position: 'top'
    };
    return _this;
  }

  _createClass(DefaultBaseToast, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "DefaultBasePopup"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.openToast
      }, "Click Here To Test"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_00baseToast_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
        closeToast: this.closeToast,
        modalState: this.state.isOpen,
        closeButton: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultCloseButton, null),
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultContent, null)
      }, this.state)));
    }
  }]);

  return DefaultBaseToast;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DefaultBaseToast);

/***/ }),

/***/ "./0Template/Components/01Table/01defaultCatalogCard.jsx":
/*!***************************************************************!*\
  !*** ./0Template/Components/01Table/01defaultCatalogCard.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _00Default_02News_News_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../00Default/02News/News.jsx */ "./0Template/Components/00Default/02News/News.jsx");
/* harmony import */ var _01defaultCatalogCard_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./01defaultCatalogCard.scss */ "./0Template/Components/01Table/01defaultCatalogCard.scss");
/* harmony import */ var _01defaultCatalogCard_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_01defaultCatalogCard_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Assets_img_template_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~Assets/img/template/logo.png */ "./1Assets/img/template/logo.png");
/* harmony import */ var _Assets_img_template_logo_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Assets_img_template_logo_png__WEBPACK_IMPORTED_MODULE_4__);
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







var DefaultShowData = function DefaultShowData(props) {
  var columnStructure = props.columnStructure,
      item = props.item,
      index = props.index;
  var paragraph = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Randy Testing Paragraph HereRandy Testing Paragraph Here Randy Testing Paragraph HereRandy Testing Paragraph Here Randy Testing Paragraph HereRandy Testing Paragraph Here Randy Testing Paragraph HereRandy Testing Paragraph Here Randy Testing Paragraph HereRandy Testing Paragraph Here");
  var topClass = index % 2 == 0 ? "col-md-5" : "col-md-offset-1 col-md-5";
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: topClass
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'randyCard wow'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_00Default_02News_News_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Headline"),
    image: _Assets_img_template_logo_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    paragraph: paragraph,
    author: "randy"
  }), columnStructure.map(function (headColumn, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: 'CatalogCard' + index
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: 'col-xs-6',
      style: {
        textAlign: 'right',
        fontWeight: 'bold'
      }
    }, headColumn['label']), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: 'col-xs-6',
      style: {
        textAlign: 'left'
      }
    }, item[headColumn['id']]));
  })));
};

var DefaultCatalogCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DefaultCatalogCard, _React$Component);

  function DefaultCatalogCard() {
    _classCallCheck(this, DefaultCatalogCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultCatalogCard).apply(this, arguments));
  }

  _createClass(DefaultCatalogCard, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var listStructure = window.show ? window.show : [];
      var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
      var page = window.page ? window.page : 1;

      if (listStructure.length <= 0) {
        console.error(" !! NEED THE SHOW COLUMN TO USE THIS ONE !!");
      }

      this.state = {
        // Data
        columnStructure: listStructure,
        baseUrl: baseUrl,
        'ajaxCall': this.props.ajaxCall ? this.props.ajaxCall : this.props.baseUrl + "/list/ajax",
        page: page,
        searchText: this.props.searchText,
        // Option
        isShowHidden: false,
        isInfiniteScroll: true,
        limitPage: 5
      };
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "CatalogCard"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)
      }, this.state)));
    }
  }]);

  return DefaultCatalogCard;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (DefaultCatalogCard);

/***/ }),

/***/ "./0Template/Components/01Table/01defaultCatalogCard.scss":
/*!****************************************************************!*\
  !*** ./0Template/Components/01Table/01defaultCatalogCard.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Components/02Detail/00defaultDetailView.jsx":
/*!***************************************************************!*\
  !*** ./0Template/Components/02Detail/00defaultDetailView.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _00defaultDetailView_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./00defaultDetailView.scss */ "./0Template/Components/02Detail/00defaultDetailView.scss");
/* harmony import */ var _00defaultDetailView_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_00defaultDetailView_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
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






var DefaultHeader = function DefaultHeader(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'header row'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-9'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6'
  }, "Admin : Randy S"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6',
    style: {
      textAlign: 'right'
    }
  }, "Monday, 12 April 2019")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-xs-12 col-sm-3'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: props.baseUrl + "/create"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'btn btn-primary',
    style: {
      width: '100%'
    }
  }, "Create")))));
};

var DefaultShowData = function DefaultShowData(props) {
  var listStructure = props.listStructure,
      item = props.item;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "allContentSection"
  }, listStructure.map(function (column) {
    if (column.id != "action") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'col-sm-6 col-md-4 col-lg-4 col-xl-3',
        key: column.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'row contentSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-6 columnSection'
      }, column.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-6 valueSection'
      }, item[column.id])));
    }
  }));
};

var DefaultFooter = function DefaultFooter(_ref) {
  var baseUrl = _ref.baseUrl,
      item = _ref.item;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row footer"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-offset-8 col-sm-4"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: baseUrl + '/update/' + item.id
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-6 btn btn-primary"
  }, " Edit ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: baseUrl + '/delete/' + item.id
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-6 btn btn-primary"
  }, " Delete "))));
};

var DefaultDetailView =
/*#__PURE__*/
function (_Component) {
  _inherits(DefaultDetailView, _Component);

  function DefaultDetailView() {
    var _this;

    _classCallCheck(this, DefaultDetailView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DefaultDetailView).call(this));

    _this.callData = function () {
      if (_this.state.componentStatus != 'loading') {
        _this.setState({
          componentStatus: 'loading'
        });

        Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
          url: _this.props.ajaxCall,
          method: 'GET',
          params: {
            'id': _this.props.dataId
          }
        }).then(function (response) {
          _this.setState({
            item: response.data.data,
            componentStatus: 'ready'
          });
        });
      }
    };

    _this.state = {
      item: {},
      componentStatus: 'ready'
    };
    return _this;
  }

  _createClass(DefaultDetailView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.callData();
    }
  }, {
    key: "render",
    value: function render() {
      var passingItem = {
        baseUrl: this.props.baseUrl,
        item: this.state.item
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'DefaultDetailView'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'col-xs-12'
      }, window.pickPropsOrDefault(this.props, 'header', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultHeader, _extends({
        item: this.state.item
      }, this.props)), passingItem)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'col-xs-12'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, _extends({
        item: this.state.item
      }, this.props))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'col-xs-12'
      }, window.pickPropsOrDefault(this.props, 'footer', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultFooter, _extends({
        item: this.state.item
      }, this.props)), passingItem)));
    }
  }]);

  return DefaultDetailView;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DefaultDetailView);

/***/ }),

/***/ "./0Template/Components/02Detail/00defaultDetailView.scss":
/*!****************************************************************!*\
  !*** ./0Template/Components/02Detail/00defaultDetailView.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseCrudCreate.scss */ "./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.scss");
/* harmony import */ var _BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






 // First, you need to create the `numberMask` with your desired configurations

var RandyValidation = function RandyValidation(key, value, validationRule, label) {
  // Start to check the Validation
  if (key && validationRule) {
    var validations = validationRule.split("|");

    for (var j = 0; j < validations.length; j++) {
      var validation = validations[j]; // Check validation 1 by 1

      if (validation.includes("require")) {
        if (!value || value === "" || value === null) {
          return label + " is required";
        }
      }

      if (validation.includes("min:")) {
        var minNumber = validation.replace("min:", "");
        var number = parseInt(minNumber);
        var strValue = value + "";

        if (strValue.length < number) {
          {
            return label + " have minimal of " + number + " characters";
          }
        }
      }

      if (validation.includes("max:")) {
        var maxNumber = validation.replace("max:", "");
        var number = parseInt(maxNumber);
        var strValue = value + "";

        if (strValue.length > number) {
          {
            return label + " have maximal of " + number + " characters";
          }
        }
      }

      if (validation.includes("numeric")) {
        var isnum = /^\d+$/.test(value);

        if (!isnum) {
          {
            return label + " is numeric only";
          }
        }
      }
    }
  }

  return undefined;
};

var BaseCrudCreate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseCrudCreate, _React$Component);

  function BaseCrudCreate() {
    var _this;

    _classCallCheck(this, BaseCrudCreate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseCrudCreate).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};
      var columnStructure = _this.state.inputStructure;
      var keys = Object.keys(values);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = values[key];

        if (columnStructure[key]) {
          var validationRule = columnStructure[key].validation;

          if (key in columnStructure) {
            var label = columnStructure[key].label;
            var errorString = RandyValidation(key, value, validationRule, label);

            if (errorString) {
              errors[key] = errorString;
            }
          }
        }
      }

      console.log(errors);
      return errors;
    };

    _this.doHtmlFormPost = function (values) {
      document.getElementById("formReference").submit();
    };

    _this.doAjaxFormPost = function (values) {
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url: _this.state.ajaxCall,
        method: 'POST',
        params: values
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {
          window.location.href = "/" + _this.state.baseUrl;
        } else {}
      });
    };

    _this.debugSubmitting = function (values, setSubmitting) {
      setTimeout(function () {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 4000);
    };

    _this.submitForm = function (values, actions) {
      // Check if there's any error
      // this.doAjaxFormPost(values);
      // this.debugSubmitting(values, actions.setSubmitting)
      _this.doAjaxFormPost(values); // return true;

    };

    var inputStructure = window.inputStructure ? window.inputStructure : [];
    var inputStructureKey = Object.keys(inputStructure);
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    _this.myForm = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef(); // Generate Initial Value from InputStructure

    var initialValue = {};
    inputStructureKey.map(function (inputColumnKey) {
      var inputColumn = inputStructure[inputColumnKey];
      var theField = null;
      initialValue[inputColumnKey] = '';
    });
    var ajaxCall = "/" + baseUrl + "/create";
    _this.state = {
      // Data
      inputStructure: inputStructure,
      inputStructureKey: inputStructureKey,
      baseUrl: baseUrl,
      ajaxCall: ajaxCall,
      initialValue: initialValue
    };
    return _this;
  }

  _createClass(BaseCrudCreate, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputColumnTest = this.state.inputStructure["Name"];
      var groupSize = 2;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "baseCrudCreate"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_1__["Formik"], {
        initialValues: this.state.initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        structure: this.state.inputStructure,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form,
              handleChange = _ref.handleChange,
              handleBlur = _ref.handleBlur;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_1__["Form"], {
            action: _this2.state.ajaxCall,
            method: "POST",
            id: "formReference"
          }, _this2.state.inputStructureKey.map(function (inputColumnKey) {
            var inputColumn = _this2.state.inputStructure[inputColumnKey];
            var theField = null;

            switch (inputColumn.type) {
              case "text":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "number":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  separator: ""
                });
                break;

              case "decimal":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "date":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  form: form
                });
                break;

              case "email":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldEmail"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "select":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  ajaxUrl: inputColumn.optionAjax,
                  initialValue: _this2.state.initialValue[inputColumn.name]
                });
                break;

              case "textarea":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldTextArea"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              default:
                break;
            }

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "col-xs-12 col-md-8 col-md-6 col-lg-6",
              style: {
                display: "inline-block"
              },
              key: inputColumnKey
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "input-group form-group col-xs-12"
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-3 labelSection'
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, inputColumn.label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-9 inputSection'
            }, theField), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
            }, touched[inputColumnKey] && errors[inputColumnKey] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: "errorMessage"
            }, errors[inputColumnKey]) : null)));
          }).reduce(function (r, element, index) {
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
          }, []).map(function (rowContent) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: "row",
              style: {
                marginBottom: "10px"
              }
            }, rowContent);
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: window.csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            className: "btn btn-primary btn-submit-randy",
            value: "Submit"
          }))));
        }
      }));
    }
  }]);

  return BaseCrudCreate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (BaseCrudCreate);

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.scss":
/*!************************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudDelete/BaseCrudDelete.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudDelete/BaseCrudDelete.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_02Detail_00defaultDetailView_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~Components/02Detail/00defaultDetailView.jsx */ "./0Template/Components/02Detail/00defaultDetailView.jsx");
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
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





var DefaultFooter = function DefaultFooter(_ref) {
  var baseUrl = _ref.baseUrl,
      item = _ref.item,
      openModal = _ref.openModal;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row footer"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-offset-9 col-sm-3",
    onClick: openModal
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 btn btn-danger"
  }, " Delete ")));
};

var DefaultContent = function DefaultContent(_ref2) {
  var baseUrl = _ref2.baseUrl,
      dataId = _ref2.dataId,
      csrf_token = _ref2.csrf_token;
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
    method: "POST",
    action: "/" + baseUrl + "/delete/" + dataId
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    value: csrf_token,
    name: "_token"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "submit",
    className: "btn btn-danger",
    value: "DELETE"
  }))));
};

var BaseCrudDelete =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseCrudDelete, _React$Component);

  function BaseCrudDelete() {
    var _this;

    _classCallCheck(this, BaseCrudDelete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseCrudDelete).call(this));

    _this.toggleModal = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    var listStructure = window.show ? window.show : [];
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    var dataId = window.dataId ? parseInt(window.dataId) : null;

    if (listStructure.length <= 0) {
      console.error("don't use this without show column header");
    }

    _this.state = {
      // Data
      listStructure: listStructure,
      baseUrl: baseUrl,
      ajaxCall: "/" + baseUrl + "/detail/ajax",
      dataId: dataId,
      csrf_token: window.csrf_token
    };
    return _this;
  }

  _createClass(BaseCrudDelete, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_02Detail_00defaultDetailView_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, this.state, {
        footer: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultFooter, {
          openModal: this.toggleModal
        })
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isOpen: this.state.isOpen,
        closeModal: this.toggleModal.bind(this),
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultContent, {
          baseUrl: this.state.baseUrl,
          dataId: this.state.dataId,
          csrf_token: this.state.csrf_token
        })
      }));
    }
  }]);

  return BaseCrudDelete;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (BaseCrudDelete);

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudDetail/BaseCrudDetail.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudDetail/BaseCrudDetail.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_02Detail_00defaultDetailView_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~Components/02Detail/00defaultDetailView.jsx */ "./0Template/Components/02Detail/00defaultDetailView.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var BaseCrudDetail =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseCrudDetail, _React$Component);

  function BaseCrudDetail() {
    var _this;

    _classCallCheck(this, BaseCrudDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseCrudDetail).call(this));
    var listStructure = window.show ? window.show : [];
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    var searchText = window.search ? window.search : "";
    var dataId = window.dataId ? parseInt(window.dataId) : null;

    if (listStructure.length <= 0) {
      console.error("don't use this without show column header");
    }

    _this.state = {
      // Data
      listStructure: listStructure,
      baseUrl: baseUrl,
      ajaxCall: "/" + baseUrl + "/detail/ajax",
      dataId: dataId
    };
    return _this;
  }

  _createClass(BaseCrudDetail, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_02Detail_00defaultDetailView_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], this.state));
    }
  }]);

  return BaseCrudDetail;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (BaseCrudDetail);

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudList/BaseCrudList.jsx":
/*!*******************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudList/BaseCrudList.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseCrudList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
/* harmony import */ var _Components_01Table_01defaultCatalogCard_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/01Table/01defaultCatalogCard.jsx */ "./0Template/Components/01Table/01defaultCatalogCard.jsx");
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






var BaseCrudList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseCrudList, _React$Component);

  function BaseCrudList() {
    var _this;

    _classCallCheck(this, BaseCrudList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseCrudList).call(this));
    var listStructure = window.show ? window.show : [];
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    var page = window.page ? window.page : 1;
    var searchText = window.search ? window.search : ""; // Start to count the width

    var showColumnWidth = [];
    var classSM = 'col-sm-12';

    if (listStructure.length == 2) {
      showColumnWidth = ['col-sm-6', 'col-sm-6'];
    } else if (listStructure.length == 3) {
      showColumnWidth = ['col-sm-4', 'col-sm-4', 'col-sm-4'];
    } else if (listStructure.length == 4) {
      showColumnWidth = ['col-sm-3', 'col-sm-3', 'col-sm-3', 'col-sm-3'];
    } else if (listStructure.length == 5) {
      showColumnWidth = ['col-sm-1', 'col-sm-3', 'col-sm-3', 'col-sm-3', 'col-sm-2'];
    } else if (listStructure.length == 6) {
      showColumnWidth = ['col-sm-1', 'col-sm-3', 'col-sm-3', 'col-sm-2', 'col-sm-2', 'col-sm-1'];
    } else if (listStructure.length == 7) {
      showColumnWidth = ['col-sm-1', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-1'];
    } else if (listStructure.length == 8) {
      showColumnWidth = ['col-sm-1', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-1', 'col-sm-1', 'col-sm-1'];
    } else if (listStructure.length == 9) {
      showColumnWidth = ['col-sm-1', 'col-sm-2', 'col-sm-2', 'col-sm-2', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1'];
    } else if (listStructure.length == 10) {
      showColumnWidth = ['col-sm-1', 'col-sm-2', 'col-sm-2', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1'];
    } else if (listStructure.length == 11) {
      showColumnWidth = ['col-sm-1', 'col-sm-2', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1'];
    } else if (listStructure.length == 12) {
      showColumnWidth = ['col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1', 'col-sm-1'];
    }

    for (var i = 0; i < showColumnWidth.length; i++) {
      if (!listStructure[i].width) {
        listStructure[i].width = showColumnWidth[i];
      }
    }

    _this.state = {
      // Data
      columnStructure: listStructure,
      // headerColumn:showColumn,
      headerWidth: showColumnWidth,
      baseUrl: baseUrl,
      page: page,
      searchText: searchText,
      // Option
      isShowHidden: false,
      isInfiniteScroll: false,
      isPagination: true,
      limitPage: 5
    };
    return _this;
  }

  _createClass(BaseCrudList, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null)
      }, this.state, this.props)));
    }
  }]);

  return BaseCrudList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



var DefaultShowData =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DefaultShowData, _React$Component2);

  function DefaultShowData() {
    var _getPrototypeOf2;

    var _temp, _this2;

    _classCallCheck(this, DefaultShowData);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this2, (_temp = _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DefaultShowData)).call.apply(_getPrototypeOf2, [this].concat(args))), _this2.state = {
      isOpen: false
    }, _this2.toggleModal = function () {
      _this2.setState({
        isOpen: !_this2.state.isOpen
      });
    }, _temp));
  }

  _createClass(DefaultShowData, [{
    key: "actionProperty",
    value: function actionProperty(props) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/" + props.baseUrl + "/update/" + props.item.id
      }, " Edit "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.toggleModal
      }, " Delete "));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          columnStructure = _this$props.columnStructure,
          item = _this$props.item,
          visible = _this$props.visible;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'row col-xs-12 randyRow'
      }, columnStructure.map(function (headColumn, index) {
        if (headColumn.id == 'action') {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: headColumn.width + " columnContent"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-xs-6 visible-xs-block'
          }, " \xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-sm-12'
          }, _this3.actionProperty(_this3.props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            isOpen: _this3.state.isOpen,
            closeModal: _this3.toggleModal.bind(_this3),
            content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultDeleteModal, {
              item: item,
              baseUrl: "/" + _this3.props.baseUrl + "/delete/" + item.id,
              method: "post"
            })
          }));
        } else {
          var value = item[headColumn.id];
          var index = 0; // If this is name

          if (headColumn.id === "name") {
            value = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item[headColumn.id]);
          } // If this is MGM or SPV


          if (headColumn.id === "mgm" || headColumn.id === "spv") {
            value = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, item[headColumn.id].map(function (mgm) {
              index++;
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
                key: index + mgm
              }, "(", index, ") ", mgm, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
            }));
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: headColumn.width + " columnContent"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-xs-6 visible-xs-block'
          }, [headColumn.label]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-sm-12'
          }, value));
        }
      }));
    }
  }]);

  return DefaultShowData;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var DefaultDeleteModal =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DefaultDeleteModal, _React$Component3);

  function DefaultDeleteModal() {
    _classCallCheck(this, DefaultDeleteModal);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultDeleteModal).apply(this, arguments));
  }

  _createClass(DefaultDeleteModal, [{
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
        type: "hidden",
        value: csrf_token,
        name: "_token"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        className: "btn btn-danger",
        value: "DELETE"
      }))));
    }
  }]);

  return DefaultDeleteModal;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/***/ }),

/***/ "./0Template/Module/00BaseCrud/BaseCrudUpdate/BaseCrudUpdate.jsx":
/*!***********************************************************************!*\
  !*** ./0Template/Module/00BaseCrud/BaseCrudUpdate/BaseCrudUpdate.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _BaseCrudCreate_BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseCrudCreate/BaseCrudCreate.scss */ "./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.scss");
/* harmony import */ var _BaseCrudCreate_BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_BaseCrudCreate_BaseCrudCreate_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





 // First, you need to create the `numberMask` with your desired configurations

var testOptions = [{
  value: 'Choco',
  label: 'Chocolate'
}, {
  value: 'Strawberry',
  label: 'Strawberry'
}, {
  value: 'Vanilla',
  label: 'Vanilla'
}];

var RandyValidation = function RandyValidation(key, value, validationRule, label) {
  // Start to check the Validation
  if (key && validationRule) {
    var validations = validationRule.split("|");

    for (var j = 0; j < validations.length; j++) {
      var validation = validations[j]; // Check validation 1 by 1

      if (validation.includes("require")) {
        if (!value) {
          return label + " is required";
        }
      }

      if (validation.includes("min:")) {
        var minNumber = validation.replace("min:", "");
        var number = parseInt(minNumber);

        if (value.length < number) {
          {
            return label + " have minimal of " + number + " characters";
          }
        }
      }

      if (validation.includes("max:")) {
        var maxNumber = validation.replace("max:", "");
        var number = parseInt(maxNumber);

        if (value.length > number) {
          {
            return label + " have maximal of " + number + " characters";
          }
        }
      }
    }
  }

  return undefined;
};

var BaseCrudUpdate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BaseCrudUpdate, _React$Component);

  function BaseCrudUpdate() {
    var _this;

    _classCallCheck(this, BaseCrudUpdate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseCrudUpdate).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var inputStructure = window.inputStructure ? window.inputStructure : [];
    var inputStructureKey = Object.keys(inputStructure);
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    var dataId = window.dataId ? window.dataId : null;
    _this.myForm = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef(); // Generate Initial Value from InputStructure

    var initialValue = {};
    inputStructureKey.map(function (inputColumnKey) {
      var inputColumn = inputStructure[inputColumnKey];
      var theField = null;
      initialValue[inputColumnKey] = '';
    });
    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    var updateAjaxCall = "/" + baseUrl + "/update/" + dataId;

    _this.callInitialData(ajaxCall, dataId);

    _this.state = {
      // Data
      inputStructure: inputStructure,
      inputStructureKey: inputStructureKey,
      baseUrl: baseUrl,
      ajaxCall: ajaxCall,
      updateAjaxCall: updateAjaxCall,
      initialValue: null,
      dataId: dataId
    };
    return _this;
  }

  _createClass(BaseCrudUpdate, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputColumnTest = this.state.inputStructure["Name"];
      var groupSize = 2;

      if (!this.state.initialValue) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "baseCrudUpdate"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_1__["Formik"], {
        initialValues: this.state.initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        structure: this.state.inputStructure,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_1__["Form"], {
            action: "/" + _this2.state.baseUrl + "/create",
            method: "POST",
            id: "formReference",
            key: 'asdf'
          }, _this2.state.inputStructureKey.map(function (inputColumnKey) {
            var inputColumn = _this2.state.inputStructure[inputColumnKey];
            var theField = null;

            switch (inputColumn.type) {
              case "text":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "number":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  separator: ""
                });
                break;

              case "decimal":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "date":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  form: form
                });
                break;

              case "email":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldEmail"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              case "select":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder,
                  options: testOptions,
                  ajaxUrl: inputColumn.optionAjax,
                  initialValue: _this2.state.initialValue[inputColumn.name]
                });
                break;

              case "textarea":
                theField = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldTextArea"], {
                  name: inputColumn.name,
                  placeholder: inputColumn.placeholder
                });
                break;

              default:
                break;
            }

            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "col-xs-12 col-md-8 col-md-6 col-lg-6",
              style: {
                display: "inline-block"
              },
              key: inputColumnKey
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "input-group form-group col-xs-12"
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-3 labelSection'
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, inputColumn.label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-9 inputSection'
            }, theField), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
            }, touched[inputColumnKey] && errors[inputColumnKey] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: "errorMessage"
            }, errors[inputColumnKey]) : null)));
          }).reduce(function (r, element, index) {
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
          }, []).map(function (rowContent) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: "row",
              style: {
                marginBottom: "10px"
              }
            }, rowContent);
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: window.csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            className: "btn btn-primary btn-submit-randy",
            value: "Submit"
          }))));
        }
      }));
    }
  }]);

  return BaseCrudUpdate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.callInitialData = function (ajaxCall, dataId) {
    Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])({
      url: ajaxCall,
      method: 'GET',
      params: {
        'id': dataId
      }
    }).then(function (response) {
      _this3.setState({
        initialValue: response.data.data
      });
    });
  };

  this.fieldValidation = function (values) {
    var errors = {};
    var columnStructure = _this3.state.inputStructure;
    var keys = Object.keys(values);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = values[key];

      if (columnStructure[key]) {
        var validationRule = columnStructure[key].validation;

        if (key in columnStructure) {
          var label = columnStructure[key].label;
          var errorString = RandyValidation(key, value, validationRule, label);

          if (errorString) {
            errors[key] = errorString;
          }
        }
      }
    }

    console.log(errors);
    return errors;
  };

  this.doAjaxFormPost = function (values) {
    Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])({
      url: _this3.state.updateAjaxCall,
      method: 'POST',
      params: values
    }).then(function (response) {
      console.log(response);

      if (response.status === 200 && response.statusText === "OK") {
        window.location.href = "/" + _this3.state.baseUrl + "/list";
      } else {
        window.location.href = "/" + _this3.state.baseUrl + "/list";
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  this.submitForm = function (values, actions) {
    // Check if there's any error
    // this.doAjaxFormPost(values);
    // this.debugSubmitting(values, actions.setSubmitting)
    _this3.doAjaxFormPost(values); // return true;

  };
};

/* harmony default export */ __webpack_exports__["default"] = (BaseCrudUpdate);

/***/ }),

/***/ "./0Template/Module/00BaseCrud/baseCrudModule.jsx":
/*!********************************************************!*\
  !*** ./0Template/Module/00BaseCrud/baseCrudModule.jsx ***!
  \********************************************************/
/*! exports provided: BaseCrudDelete, BaseCrudList, BaseCrudDetail, BaseCrudCreate, BaseCrudUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseCrudDelete_BaseCrudDelete_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCrudDelete/BaseCrudDelete.jsx */ "./0Template/Module/00BaseCrud/BaseCrudDelete/BaseCrudDelete.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCrudDelete", function() { return _BaseCrudDelete_BaseCrudDelete_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _BaseCrudList_BaseCrudList_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseCrudList/BaseCrudList.jsx */ "./0Template/Module/00BaseCrud/BaseCrudList/BaseCrudList.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCrudList", function() { return _BaseCrudList_BaseCrudList_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _BaseCrudDetail_BaseCrudDetail_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseCrudDetail/BaseCrudDetail.jsx */ "./0Template/Module/00BaseCrud/BaseCrudDetail/BaseCrudDetail.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCrudDetail", function() { return _BaseCrudDetail_BaseCrudDetail_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _BaseCrudCreate_BaseCrudCreate_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseCrudCreate/BaseCrudCreate.jsx */ "./0Template/Module/00BaseCrud/BaseCrudCreate/BaseCrudCreate.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCrudCreate", function() { return _BaseCrudCreate_BaseCrudCreate_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _BaseCrudUpdate_BaseCrudUpdate_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BaseCrudUpdate/BaseCrudUpdate.jsx */ "./0Template/Module/00BaseCrud/BaseCrudUpdate/BaseCrudUpdate.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCrudUpdate", function() { return _BaseCrudUpdate_BaseCrudUpdate_jsx__WEBPACK_IMPORTED_MODULE_4__["default"]; });








/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/index.scss":
/*!***************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/index.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx":
/*!******************************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrimaryPropertyCreate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var FormCol1Layout = function FormCol1Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-12"
  }, props.field1));
};

var FormCol2Layout = function FormCol2Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field2));
};

var PrimaryPropertyCreate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PrimaryPropertyCreate, _React$Component);

  function PrimaryPropertyCreate() {
    var _this;

    _classCallCheck(this, PrimaryPropertyCreate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrimaryPropertyCreate).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};

      if (!values.project_name) {
        errors.project_name = "Project is required";
      }

      if (!values.agent_lister_id) {
        errors.agent_lister_id = "Agent is required";
      }

      return errors;
    };

    _this.submitForm = function (values, actions) {
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])({
        url: _this.state.submitAjaxCall,
        method: 'post',
        params: values
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {// window.location.href = "/"+this.state.baseUrl;
        } else {}
      });
    };

    _this.createBasicLayout = function (keyname, label, field, errors, touched) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "col-xs-12 col-md-12 col-md-12 col-lg-12",
        style: {
          display: "inline-block"
        },
        key: keyname
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "input-group form-group col-xs-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-3 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-9 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null)));
    };

    _this.basicLayout = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-3 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-9 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall,
      initialValue: {
        project_name: "",
        agent_lister_id: "",
        note: "",
        agent: []
      }
    };
    return _this;
  }

  _createClass(PrimaryPropertyCreate, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var createAjaxCall = "/" + baseUrl + "/create/";
      var submitAjaxCall = this.props.submitAjaxCall ? this.props.submitAjaxCall : createAjaxCall;
      this.setState({
        submitAjaxCall: submitAjaxCall
      });
    } // FORM RELATED

  }, {
    key: "render",
    // RENDER
    value: function render() {
      var _this2 = this;

      var initialValue = this.props.initialValue ? this.props.initialValue : this.state.initialValue;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
        initialValues: initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Form"], {
            action: _this2.state.urlLogin,
            method: "post"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("project_name", "Project Name", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
              name: "project_name",
              placeholder: "Project Name"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("note", "Notes", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldTextArea"], {
              name: "note",
              placeholder: "Notes"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("agent_id", "Pelisting", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
              name: "agent_lister_id",
              placeholder: "Pelisting",
              ajaxUrl: "/agent/getAgent"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("komisi_pelisting", "Komisi Pelisting", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "percent_listing_commission",
              placeholder: "Komisi"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 "
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Koordinator "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), [0, 1, 2].map(function (i) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
              className: "col-xs-6",
              style: {
                borderRight: "1px solid  #ccc"
              }
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
              field1: _this2.basicLayout("agent[" + i + "].id", "Agent Name", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
                name: "agent[" + i + "].id",
                placeholder: "Agent",
                ajaxUrl: "/agent/getAgent"
              }))
            }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
              field1: _this2.basicLayout("agent[" + i + "].no_id", "No Id", errors, touched, "Nomor Id")
            }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
              field1: _this2.basicLayout("agent[" + i + "].percent_commission", "Komisi", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
                name: "agent[" + i + "].percent_commission",
                placeholder: "Komisi"
              }))
            }));
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "form-group"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "LOGIN",
            className: "btn float-right login_btn btn-primary form-control"
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            className: "btn btn-primary btn-submit-randy",
            value: "Submit"
          }))));
        }
      });
    }
  }]);

  return PrimaryPropertyCreate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyUpdate.jsx":
/*!******************************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyUpdate.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrimaryPropertyUpdate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var _primaryPropertyCreate_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./primaryPropertyCreate.jsx */ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var PrimaryPropertyUpdate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PrimaryPropertyUpdate, _React$Component);

  function PrimaryPropertyUpdate() {
    var _this;

    _classCallCheck(this, PrimaryPropertyUpdate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrimaryPropertyUpdate).call(this));

    _initialiseProps.call(_assertThisInitialized(_this));

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    var submitAjaxCall = "/" + baseUrl + "/update/" + dataId;

    _this.callInitialData(ajaxCall, dataId);

    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall,
      submitAjaxCall: submitAjaxCall
    };
    return _this;
  } // Call Initial Data


  _createClass(PrimaryPropertyUpdate, [{
    key: "render",
    // RENDER
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.state.initialValue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_primaryPropertyCreate_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        initialValue: this.state.initialValue,
        isEdit: true,
        submitAjaxCall: this.state.submitAjaxCall
      }));
    }
  }]);

  return PrimaryPropertyUpdate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.callInitialData = function (ajaxCall, dataId) {
    Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_2__["default"])({
      url: ajaxCall,
      method: 'GET',
      params: {
        'id': dataId
      }
    }).then(function (response) {
      _this2.setState({
        initialValue: response.data.data
      });
    });
  };
};



/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.jsx":
/*!**********************************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.jsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrimaryPropertyList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
/* harmony import */ var _primaryProjectListContainer_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primaryProjectListContainer.scss */ "./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.scss");
/* harmony import */ var _primaryProjectListContainer_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_primaryProjectListContainer_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/01Table/00defaultBaseInfiniteTable.jsx */ "./0Template/Components/01Table/00defaultBaseInfiniteTable.jsx");
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






var PrimaryPropertyList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PrimaryPropertyList, _React$Component);

  function PrimaryPropertyList() {
    var _this;

    _classCallCheck(this, PrimaryPropertyList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrimaryPropertyList).call(this));
    var listStructure = window.show ? window.show : [];
    var baseUrl = window.baseUrl ? window.baseUrl : 'baseurl/perlu/ada/woy/';
    var page = window.page ? window.page : 1;
    var searchText = window.search ? window.search : "";
    _this.state = {
      // Data
      // columnStructure:listStructure,
      // headerColumn:showColumn,
      // headerWidth:showColumnWidth,
      baseUrl: baseUrl,
      page: page,
      searchText: searchText,
      // Option
      isShowHidden: true,
      isInfiniteScroll: false,
      isPagination: true,
      limitPage: 20
    };
    return _this;
  }

  _createClass(PrimaryPropertyList, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "baseCrudCreate"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_01Table_00defaultBaseInfiniteTable_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultShowData, null),
        contentHidden: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultHiddenData, null),
        header: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DefaultHeader, {
          baseUrl: this.state.baseUrl
        }),
        isShowHidden: true
      }, this.state, this.props)));
    }
  }]);

  return PrimaryPropertyList;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



var DefaultHeader = function DefaultHeader(props) {
  var columnStructure = props.columnStructure;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'header'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'row'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-4",
    style: {
      marginBottom: '20px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: 'form-control',
    onChange: props.changeSearchText,
    value: props.searchText,
    placeholder: "Search Here"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/" + props.baseUrl + "/create"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-12 col-sm-offset-4 col-sm-4 "
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'btn btn-primary',
    style: {
      width: '100%'
    }
  }, "Create")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row hidden-xs"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-3"
  }, " Project Name "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-5"
  }, " Project Koordinator "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-xs-3"
  }, " Project Keterangan ")));
};

var DefaultHiddenData = function DefaultHiddenData(props) {
  var item = props.item;
  var index = 0;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'row col-xs-9 randyHiddenRow'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6'
  }, item.agent.map(function (agen) {
    index++;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'col-sm-12'
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
      className: 'col-sm-8'
    }, "(", index, ") Nama"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
      className: 'col-sm-2'
    }, "Komisi"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
      className: 'col-sm-2'
    }, "id")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'col-sm-12'
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: 'col-sm-8'
    }, agen.agent_name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: 'col-sm-2'
    }, agen.percent_commission, "%"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: 'col-sm-2'
    }, agen.agent_id)));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-12'
  }, item.note && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.note)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-12 row propertyPercent'
  }, item.percent_listing_commission && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Kantor Listing"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item.percent_listing_commission, " %"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), item.percent_listing_commission && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-6'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Komisi Selling"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item.percent_selling_commission, " %")), item.percent_listing_commission && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'col-sm-12'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Kantor Selling"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item.percent_selling_commission, " %")))));
};

var DefaultShowData =
/*#__PURE__*/
function (_Component) {
  _inherits(DefaultShowData, _Component);

  function DefaultShowData() {
    var _getPrototypeOf2;

    var _temp, _this2;

    _classCallCheck(this, DefaultShowData);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this2, (_temp = _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DefaultShowData)).call.apply(_getPrototypeOf2, [this].concat(args))), _this2.state = {
      isOpen: false
    }, _temp));
  }

  _createClass(DefaultShowData, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          columnStructure = _this$props.columnStructure,
          item = _this$props.item,
          visible = _this$props.visible;
      var index = 0;
      console.log(item);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'col-xs-3 randyRow'
      }, item.project_name));
    }
  }]);

  return DefaultShowData;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.scss":
/*!***********************************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PropertyAgentList/index.scss":
/*!***********************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PropertyAgentList/index.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/02PropertyAgent/PropertyAgentList/propertyAgentListContainer.jsx":
/*!*******************************************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/PropertyAgentList/propertyAgentListContainer.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _00BaseCrud_BaseCrudList_BaseCrudList_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../00BaseCrud/BaseCrudList/BaseCrudList.jsx */ "./0Template/Module/00BaseCrud/BaseCrudList/BaseCrudList.jsx");
/* harmony import */ var _Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/02PropertyAgent/PropertyAgentList/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var PropertyAgentListContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(PropertyAgentListContainer, _Component);

  function PropertyAgentListContainer() {
    _classCallCheck(this, PropertyAgentListContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(PropertyAgentListContainer).apply(this, arguments));
  }

  _createClass(PropertyAgentListContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_00BaseCrud_BaseCrudList_BaseCrudList_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        contentShown: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PropertyShowData, null)
      });
    }
  }]);

  return PropertyAgentListContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var PropertyShowData =
/*#__PURE__*/
function (_Component2) {
  _inherits(PropertyShowData, _Component2);

  function PropertyShowData() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, PropertyShowData);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PropertyShowData)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      isOpen: false
    }, _this.toggleModal = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    }, _temp));
  }

  _createClass(PropertyShowData, [{
    key: "actionProperty",
    value: function actionProperty(props) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/" + props.baseUrl + "/update/" + props.item.id
      }, " Edit "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: this.toggleModal
      }, " Delete "));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          columnStructure = _this$props.columnStructure,
          item = _this$props.item,
          visible = _this$props.visible;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: 'row col-xs-12 randyRow'
      }, columnStructure.map(function (headColumn, index) {
        if (headColumn.id == 'action') {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: headColumn.width + " columnContent"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-xs-6 visible-xs-block'
          }, " \xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-sm-12'
          }, _this2.actionProperty(_this2.props)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            isOpen: _this2.state.isOpen,
            closeModal: _this2.toggleModal.bind(_this2),
            content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DeleteModalComponent, {
              item: item,
              baseUrl: "/" + _this2.props.baseUrl + "/delete/" + item.id,
              method: "post"
            })
          }));
        } else {
          var value = item[headColumn.id];
          var index = 0; // If this is name

          if (headColumn.id === "name") {
            value = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, item[headColumn.id]);
          } // If this is MGM or SPV


          if (headColumn.id === "mgm") {
            value = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, item[headColumn.id].map(function (mgm) {
              index++;
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
                key: index + mgm
              }, "(", index, ") ", mgm, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
            }));
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: headColumn.width + " columnContent"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-xs-6 visible-xs-block'
          }, [headColumn.label]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: 'col-xs-6'
          }, value));
        }
      }));
    }
  }]);

  return PropertyShowData;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var DeleteModalComponent =
/*#__PURE__*/
function (_Component3) {
  _inherits(DeleteModalComponent, _Component3);

  function DeleteModalComponent() {
    _classCallCheck(this, DeleteModalComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeleteModalComponent).apply(this, arguments));
  }

  _createClass(DeleteModalComponent, [{
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
        type: "hidden",
        value: csrf_token,
        name: "_token"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        className: "btn btn-danger",
        value: "DELETE"
      }))));
    }
  }]);

  return DeleteModalComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (PropertyAgentListContainer);

/***/ }),

/***/ "./0Template/Module/02PropertyAgent/propertyAgentModule.jsx":
/*!******************************************************************!*\
  !*** ./0Template/Module/02PropertyAgent/propertyAgentModule.jsx ***!
  \******************************************************************/
/*! exports provided: PropertyAgentListContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PropertyAgentList_propertyAgentListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertyAgentList/propertyAgentListContainer.jsx */ "./0Template/Module/02PropertyAgent/PropertyAgentList/propertyAgentListContainer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyAgentListContainer", function() { return _PropertyAgentList_propertyAgentListContainer_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss":
/*!*******************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/index.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate.jsx":
/*!******************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionCreate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _transactionCreate1_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transactionCreate1.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate1.jsx");
/* harmony import */ var _transactionPrimaryCreate2_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactionPrimaryCreate2.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate2.jsx");
/* harmony import */ var _transactionCreate3_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactionCreate3.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate3.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





 // import TransactionPrimaryCreate2 from "./transactionPrimaryCreate2.jsx";



var TransactionCreate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionCreate, _React$Component);

  function TransactionCreate() {
    var _this;

    _classCallCheck(this, TransactionCreate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionCreate).call(this));

    _this.changeStateForm = function (stateForm, formValues) {
      if (stateForm == 2) {
        _this.setState({
          whichForm: stateForm,
          form1: formValues
        });

        _this.callAgentRelatedData();
      } else if (stateForm == 3) {
        _this.setState({
          whichForm: stateForm,
          form2: formValues
        });
      }
    };

    _this.backForm = function () {
      if (_this.state.whichForm == 2) {
        _this.setState({
          whichForm: 1
        });

        _this.callAgentRelatedData();
      } else if (_this.state.whichForm == 3) {
        _this.setState({
          whichForm: 2
        });
      }
    };

    _this.submitAllData = function () {
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/transaction/saveTransaction",
        method: 'post',
        params: {
          form1: _this.state.form1,
          form2: _this.state.form2
        }
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {// window.location.href = "/"+this.state.baseUrl;
        } else {}
      });
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    _this.state = {
      whichForm: 1
    };
    return _this;
  }

  _createClass(TransactionCreate, [{
    key: "callInitialData",
    value: function callInitialData() {
      var _this2 = this;

      // CALLING TRANSACTION NECESSARY DATA
      // 1. Tax Data
      // 2. Mg Fee
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/agent/getTransactionRelatedData",
        method: 'get',
        params: {}
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {
          _this2.setState({
            taxData: response.data.taxData,
            mgfee: response.data.mgfee
          });
        } else {}
      });
    }
  }, {
    key: "callAgentRelatedData",
    value: function callAgentRelatedData() {
      var _this3 = this;

      // CALLING TRANSACTION NECESSARY DATA
      // 1. Agent Commission
      // 2. BM, BD, MD, MGM1, MGM2
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/agent/getTransactionAgentRelatedData",
        method: 'get',
        params: {
          propertyAgentData: this.state.form1.agent_id
        }
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {
          _this3.setState({
            agentData: response.data.agentData,
            bonusData: response.data.bonusData
          });
        } else {}
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.callInitialData();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.whichForm === 1) {
        if (this.state.mgfee) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionCreate1_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onSubmit: this.changeStateForm,
            relatedData: this.state
          });
        }
      } else if (this.state.whichForm === 2) {
        if (this.state.agentData) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionPrimaryCreate2_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onSubmit: this.changeStateForm,
            lastCommission: this.state.form1 ? this.state.form1.last_commission : 0,
            backPrevForm: this.backForm,
            relatedData: this.state
          });
        }
      } else if (this.state.whichForm === 3) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionCreate3_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onSubmit: this.submitAllData,
          form1: this.state.form1,
          form2: this.state.form2,
          backPrevForm: this.backForm
        });
      }

      return "loading";
    }
  }]);

  return TransactionCreate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate1.jsx":
/*!*******************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate1.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionCreate1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var FormCol1Layout = function FormCol1Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-12"
  }, props.field1));
};

var FormCol2Layout = function FormCol2Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-6"
  }, props.field2));
};

var LinePlus = function LinePlus(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line-plus"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line"
  }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "plus"
  }, " + "));
};

var TransactionCreate1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionCreate1, _React$Component);

  function TransactionCreate1() {
    var _this;

    _classCallCheck(this, TransactionCreate1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionCreate1).call(this));

    _this.setRandyInitialValue = function (key, value) {
      var keys = key.split(".");
      var a = _this.state.initialValue;

      for (var i = 0; i < keys.length; i++) {
        var strKey = keys[i];

        if (i + 1 == keys.length) {
          a[strKey] = value;
        } else {
          a = a[strKey];
        }
      }
    };

    _this.fieldValidation = function (values) {
      var errors = {};

      if (!values.date) {
        errors.date = "the date required";
      }

      return errors;
    };

    _this.basicLayout = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-3 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-9 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.countKomisi = function (values, setFieldValue) {
      var newStartCommission = 0;

      if (values.property_value && values.percent_commission) {
        var str = values.property_value.replace(/\./g, "");
        var propertyValueInt = parseInt(str);
        var percentCommissionInt = parseFloat(values.percent_commission);
        newStartCommission = propertyValueInt * percentCommissionInt / 100;
        setFieldValue("start_commission", Math.floor(newStartCommission));
      }

      if (newStartCommission && values.mg_fee_percent) {
        var mgFeePercent = parseFloat(values.mg_fee_percent);
        var lastCommission = newStartCommission - newStartCommission * mgFeePercent / 100;
        setFieldValue("last_commission", Math.floor(lastCommission));
      }

      console.log("count count");
    };

    _this.submitForm = function (values, action) {
      _this.props.onSubmit(2, values);
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    console.log("gila a");
    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall //
      // initialValue: {
      //     date:'',
      //     project_name: "",
      //     agent_lister_id: "",
      //     note: "",
      //     agent:[],
      //     mg_fee_percent:this.props.relatedData.mgfee ? this.props.relatedData.mgfee
      // }

    };
    return _this;
  }

  _createClass(TransactionCreate1, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var createAjaxCall = "/" + baseUrl + "/create/";
      var submitAjaxCall = this.props.submitAjaxCall ? this.props.submitAjaxCall : createAjaxCall;
      var mgFee = 9;

      if (this.props.formData.mgfee) {
        mgFee = this.props.formData.mgfee;
      } else if (this.props.relatedData.mgfee) {
        mgFee = this.props.relatedData.mgfee;
      }

      var initialValue = {
        date: this.props.formData.date ? this.props.formData.date : "",
        agent_id: this.props.formData.agent_id,
        agent_id_label: this.props.formData.agent_id_label,
        property_id: this.props.formData.property_id,
        property_id_label: this.props.formData.property_id_label,
        property_value: this.props.formData.property_value,
        percent_commission: this.props.formData.percent_commission,
        mg_fee_percent: mgFee
      };
      this.state.initialValue = initialValue;
      this.countKomisi(initialValue, this.setRandyInitialValue);
      this.setState({
        submitAjaxCall: submitAjaxCall,
        initialValue: initialValue
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.scrollTo(0, 0);
    }
  }, {
    key: "render",
    // RENDER
    value: function render() {
      var _this2 = this;

      var initialValue = this.props.initialValue ? this.props.initialValue : this.state.initialValue;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transaction-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
        initialValues: initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              setFieldValue = _ref.setFieldValue,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Form"], {
            action: _this2.state.urlLogin,
            method: "post"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("date", "Tanggal", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
              name: "date",
              placeholder: "Masukkan Tanggal",
              dateFormat: "dd-MM-yyyy",
              form: form
            })),
            field2: _this2.basicLayout("transaction_number", "number", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
              name: "transaction_number",
              placeholder: "____-___",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("agent_id", "Agent", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
              name: "agent_id",
              placeholder: "Agent Name",
              ajaxUrl: "/agent/getAgent"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_note_name", "Nama Property", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
              name: "property_note_name",
              placeholder: "Property Name"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_note", "Note Property", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldTextArea"], {
              name: "property_note",
              placeholder: "Property Name"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_value", "Property Value", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "property_value",
              placeholder: "masukkan harga bangunan",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("percent_commission", "Transaksi Komisi", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "percent_commission",
              placeholder: "persen Komisi",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "col-xs-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result total-pph-section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("start_commissison", "Komisi Awal", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "start_commission",
              placeholder: "0",
              disabled: true
            }))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("mg_fee_percent", "MF fee", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "mg_fee_percent",
              placeholder: "Biaya Management",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "col-xs-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("last_commission", "Komisi Akhir", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "last_commission",
              placeholder: "0",
              disabled: true
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "NEXT",
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
        }
      }));
    }
  }]);

  return TransactionCreate1;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TransactionCreate1.propTypes = {
  relatedData: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array,
  formData: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
TransactionCreate1.defaultProps = {
  relatedData: [],
  formData: []
};


/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate3.jsx":
/*!*******************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate3.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionCreate3; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var FormCol1Layout = function FormCol1Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-12"
  }, props.field1));
};

var FormCol2Layout = function FormCol2Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field2));
};

var FormCol2Layout2 = function FormCol2Layout2(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-5"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-7"
  }, props.field2));
};

var CardCoorBonusDetail = function CardCoorBonusDetail(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-6 coor-detail-card"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    name: "bm_name",
    className: "col-xs-12"
  }, props.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-5"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: 'col-sm-12 col-lg-5 labelSection'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, props.label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: 'col-sm-12 col-lg-7 contentSection'
  }, props.percent, "%")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-7"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: 'col-sm-12 col-lg-2 labelSection'
  }, props.value)))));
};

var LinePlus = function LinePlus(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line-plus"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line"
  }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "plus"
  }, " + "));
};

var FormCol2Layout3 = function FormCol2Layout3(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-9"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-3"
  }, props.field2));
};

var TransactionCreate3 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionCreate3, _React$Component);

  function TransactionCreate3() {
    var _this;

    _classCallCheck(this, TransactionCreate3);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionCreate3).call(this));

    _this.fieldValidation = function (values) {
      var errors = {};
      return errors;
    };

    _this.basicLayoutGeneralInfo = function (keyname, label, touched, content) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'
      }, content));
    };

    _this.basicLayoutRupiah = function (keyname, label, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-1 col-lg-2 labelSection',
        style: {
          width: "10%",
          paddingRight: "10px",
          paddingLeft: "10px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-11 col-lg-10 inputSection',
        style: {
          width: "90%",
          textAlign: "right"
        }
      }, field));
    };

    _this.basicLayoutPercentField = function (keyname, label, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-5 col-sm-5 col-lg-5 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-7 col-sm-7 col-lg-7 inputSection'
      }, field));
    };

    _this.basicLayout = function (keyname, label, touched, content) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'
      }, content));
    };

    _this.basicLayout2 = function (keyname, label, touched, content) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-5 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-7 contentSection'
      }, content));
    };

    _this.basicLayout3 = function (keyname, label, content) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-2 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-10 contentSection'
      }, content));
    };

    _this.basicLayout4 = function (keyname, touched, content) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-12 inputSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, content)));
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    console.log("gila a");
    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall,
      initialValue: {
        project_name: "",
        agent_lister_id: "",
        note: "",
        pph_1: "20",
        pph_2: "15",
        pph_3: "10",
        pph_4: "5",
        agent: []
      }
    };
    return _this;
  }

  _createClass(TransactionCreate3, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var createAjaxCall = "/" + baseUrl + "/create/";
      var submitAjaxCall = this.props.submitAjaxCall ? this.props.submitAjaxCall : createAjaxCall;
      this.setState({
        submitAjaxCall: submitAjaxCall
      });
    } // FORM RELATED

  }, {
    key: "numberWithCommas",
    value: function numberWithCommas(x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "0";
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.scrollTo(0, 0);
    } // RENDER

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(this.props.form1);
      console.log(this.props.form2);
      var initialValue = this.props.form2;
      var bonusDataKeys = Object.keys(this.props.form2.bonus ? this.props.form2.bonus : []);
      var str = (this.props.form1.start_commission + "").replace(/\./g, "");
      var mgfee = parseInt(str) * (parseFloat(this.props.form1.mg_fee_percent) / 100);
      initialValue['mg_fee'] = Math.floor(mgfee);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transaction-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
        initialValues: initialValue,
        validate: this.fieldValidation,
        onSubmit: this.props.onSubmit,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              setFieldValue = _ref.setFieldValue,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Form"], {
            action: _this2.state.urlLogin,
            method: "post"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12 box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("date", "Tanggal", touched, _this2.props.form1.date)
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("nama_ma", "Nama MA", touched, _this2.props.form1.agent_id_label)
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("nama_property", "Nama Property", touched, _this2.props.form1.property_id_label)
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("property_value", "Property Value", touched, "Rp. " + _this2.numberWithCommas(_this2.props.form1.property_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("komisi", "Komisi", touched, _this2.props.form1.percent_commission)
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("komisi_awal", "Komisi Awal", touched, "Rp. " + _this2.numberWithCommas(_this2.props.form2.input_commission))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("nomor_transaksi", "Nomor Transaksi", touched, "____ ____/______")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 comission-result calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutGeneralInfo("mg_fee", "MG FEE", touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "mg_fee",
              placeholder: "0",
              disabled: true
            }))
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner",
            style: {
              display: "none"
            }
          }, "Koordinator Bonus"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12 box transaction-box",
            style: {
              display: "none"
            }
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("listing", "Listing", touched, "0%")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("listing_value", "Rp", touched, "0")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("koor_1", "Koordinator 1", touched, "0%"),
            field2: _this2.basicLayout("koor_2", "Koordinator 2", touched, "0%")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("koor_1_value", "Rp", touched, "0"),
            field2: _this2.basicLayout("koor_2_value", "Rp", touched, "0")
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("koor_3", "Koordinator 3", touched, "0%"),
            field2: _this2.basicLayout("koor_4", "Koordinator 4", touched, "0%")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("koor_3_value", "Rp", touched, "0"),
            field2: _this2.basicLayout("koor_4_value", "Rp", touched, "0")
          }))), _this2.props.form2.lister_percent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Coordinator Bonus"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12 box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("lister_percent", "Listing", _this2.props.form2.lister_percent),
            field2: _this2.basicLayoutRupiah("lister_value", "Rp", _this2.numberWithCommas(_this2.props.form2.lister_value))
          }), _this2.props.form2.koor[1] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("koor.1.percent", "Koor 1", _this2.props.form2.koor[1].percent),
            field2: _this2.basicLayoutRupiah("koor.1.value", "Rp", _this2.numberWithCommas(_this2.props.form2.koor[1].value))
          }), _this2.props.form2.koor[2] && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("koor.2.percent", "Koor 2", _this2.props.form2.koor[2].percent),
            field2: _this2.basicLayoutRupiah("koor.2.value", "Rp", _this2.props.form2.koor[2].value)
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_commission", "Rp", _this2.numberWithCommas(_this2.props.form2.input_commission - _this2.props.form2.input_commission_wo_coor))
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Agent"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12 box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("commission", "Komisi", _this2.props.form2.agent_percent_commission),
            field2: _this2.basicLayoutRupiah("commission_value", "Rp", _this2.numberWithCommas(_this2.props.form2.commission_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("subsd", "Subsd+", _this2.props.form2.subsd),
            field2: _this2.basicLayoutRupiah("subsd_value", "Rp", _this2.numberWithCommas(_this2.props.form2.subsd_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("agent_x", "X", "0%"),
            field2: _this2.basicLayoutRupiah("agent_x_value", "Rp", "0")
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_commission", "Rp", _this2.numberWithCommas(_this2.props.form2.total_commission))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_pph", "PPh Rp", _this2.numberWithCommas(_this2.props.form2.total_pph))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6 pph-section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("pph_1", "PPH <= 50x", _this2.props.form2.pph_1),
            field2: _this2.basicLayoutRupiah("pph_1_value", "Rp", _this2.numberWithCommas(_this2.props.form2.pph_1_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("pph_2", "50 - <= 250x", _this2.props.form2.pph_2),
            field2: _this2.basicLayoutRupiah("pph_2_value", "Rp", _this2.numberWithCommas(_this2.props.form2.pph_2_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("pph_3", "250 - <= 500x", _this2.props.form2.pph_3),
            field2: _this2.basicLayoutRupiah("pph_3_value", "Rp", _this2.numberWithCommas(_this2.props.form2.pph_3_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("pph_4", "> 500x", _this2.props.form2.pph_4),
            field2: _this2.basicLayoutRupiah("pph_4_value", "Rp", _this2.numberWithCommas(_this2.props.form2.pph_4_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_pph", "Rp", _this2.numberWithCommas(_this2.props.form2.total_pph))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 comission-result calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 col-sm-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total", "Total Rp", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total",
              placeholder: "0",
              disabled: true,
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Office"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12 box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6",
            style: {
              paddingBottom: "20px"
            }
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayout2("office", "Office", touched, _this2.props.form2.office_percent_commission),
            field2: _this2.basicLayoutRupiah("office_value", "Rp", _this2.numberWithCommas(_this2.props.form2.office_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayout2("ppn", "PPN", touched, _this2.props.form2.ppn),
            field2: _this2.basicLayoutRupiah("ppn_value", "Rp", _this2.numberWithCommas(_this2.props.form2.ppn_value))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayout2("subsd", "Subsd-", touched, _this2.props.form2.subsd ? _this2.props.form2.subsd : "0%"),
            field2: _this2.basicLayoutRupiah("subsd_value", "Rp", _this2.numberWithCommas(_this2.props.form2.subsd_value ? _this2.props.form2.subsd_value : "0"))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, bonusDataKeys.map(function (bonusKey) {
            var bonus = _this2.props.form2.bonus[bonusKey];
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CardCoorBonusDetail, {
              name: bonus.name,
              percent: bonus.percent,
              value: _this2.numberWithCommas(bonus.value),
              label: bonusKey
            });
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 comission-result calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 col-sm-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_office", "Total Rp", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total_office",
              placeholder: "0",
              disabled: true,
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12",
            style: {
              padding: "0px 0px"
            }
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout4("", touched, _this2.props.form2.langsungCair == 0 ? "Cair tidak langsung" : "Cair Langsung")
          })), _this2.props.form2.langsungCair == 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, _this2.props.form2.termin_1.date, " - ", _this2.props.form2.termin_1.percent, " - ", _this2.props.form2.termin_1.value, _this2.props.form2.termin_2.date, " - ", _this2.props.form2.termin_2.percent, " - ", _this2.props.form2.termin_2.value))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "NEXT",
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "button",
            value: "prev",
            onClick: _this2.props.backPrevForm,
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
        }
      }));
    }
  }]);

  return TransactionCreate3;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate.jsx":
/*!*************************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate.jsx ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionCreate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _transactionPrimaryCreate1_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transactionPrimaryCreate1.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate1.jsx");
/* harmony import */ var _transactionPrimaryCreate2_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactionPrimaryCreate2.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate2.jsx");
/* harmony import */ var _transactionCreate3_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactionCreate3.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate3.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var TransactionCreate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionCreate, _React$Component);

  function TransactionCreate() {
    var _this;

    _classCallCheck(this, TransactionCreate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionCreate).call(this));

    _this.changeStateForm = function (stateForm, formValues) {
      if (stateForm == 2) {
        _this.setState({
          whichForm: stateForm,
          form1: formValues
        });

        _this.callAgentRelatedData();
      } else if (stateForm == 3) {
        _this.setState({
          whichForm: stateForm,
          form2: formValues
        });
      }
    };

    _this.backForm = function () {
      if (_this.state.whichForm == 2) {
        _this.setState({
          whichForm: 1
        });

        _this.callAgentRelatedData();
      } else if (_this.state.whichForm == 3) {
        _this.setState({
          whichForm: 2
        });
      }
    };

    _this.submitAllData = function () {
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/transaction/saveTransaction",
        method: 'post',
        params: {
          form1: _this.state.form1,
          form2: _this.state.form2
        }
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {// window.location.href = "/"+this.state.baseUrl;
        } else {}
      });
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    _this.state = {
      whichForm: 1
    };
    return _this;
  }

  _createClass(TransactionCreate, [{
    key: "callInitialData",
    value: function callInitialData() {
      var _this2 = this;

      // CALLING TRANSACTION NECESSARY DATA
      // 1. Tax Data
      // 2. Mg Fee
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/agent/getTransactionRelatedData",
        method: 'get',
        params: {}
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {
          _this2.setState({
            taxData: response.data.taxData,
            mgfee: response.data.mgfee
          });
        } else {}
      });
    }
  }, {
    key: "callAgentRelatedData",
    value: function callAgentRelatedData() {
      var _this3 = this;

      // CALLING TRANSACTION NECESSARY DATA
      // 1. Agent Commission
      // 2. BM, BD, MD, MGM1, MGM2
      Object(_Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])({
        url: "/agent/getTransactionAgentRelatedData",
        method: 'get',
        params: {
          propertyAgentData: this.state.form1.agent_id,
          propertyId: this.state.form1.property_id
        }
      }).then(function (response) {
        console.log(response);

        if (response.status === 200 && response.statusText === "OK") {
          _this3.setState({
            agentData: response.data.agentData,
            bonusData: response.data.bonusData,
            lister: response.data.lister,
            coor: response.data.coor
          });
        } else {}
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.callInitialData();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.whichForm === 1) {
        if (this.state.mgfee) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionPrimaryCreate1_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onSubmit: this.changeStateForm,
            formData: this.state.form1,
            relatedData: this.state
          });
        }
      } else if (this.state.whichForm === 2) {
        if (this.state.agentData) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionPrimaryCreate2_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onSubmit: this.changeStateForm,
            lastCommission: this.state.form1 ? this.state.form1.last_commission : 0,
            backPrevForm: this.backForm,
            relatedData: this.state
          });
        }
      } else if (this.state.whichForm === 3) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_transactionCreate3_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onSubmit: this.submitAllData,
          form1: this.state.form1,
          form2: this.state.form2,
          backPrevForm: this.backForm
        });
      }

      return "loading";
    }
  }]);

  return TransactionCreate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate1.jsx":
/*!**************************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate1.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionCreate1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_RequestWrapper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/RequestWrapper.jsx */ "./0Template/Shared/RequestWrapper.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var FormCol1Layout = function FormCol1Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-12"
  }, props.field1));
};

var FormCol2Layout = function FormCol2Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-6"
  }, props.field2));
};

var LinePlus = function LinePlus(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line-plus"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line"
  }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "plus"
  }, " + "));
};

var TransactionCreate1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionCreate1, _React$Component);

  function TransactionCreate1() {
    var _this;

    _classCallCheck(this, TransactionCreate1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionCreate1).call(this));

    _this.setRandyInitialValue = function (key, value) {
      var keys = key.split(".");
      var a = _this.state.initialValue;

      for (var i = 0; i < keys.length; i++) {
        var strKey = keys[i];

        if (i + 1 == keys.length) {
          a[strKey] = value;
        } else {
          a = a[strKey];
        }
      }
    };

    _this.fieldValidation = function (values) {
      var errors = {};

      if (!values.date) {
        errors.date = "the date required";
      }

      return errors;
    };

    _this.basicLayout = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-3 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-9 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.countKomisi = function (values, setFieldValue) {
      var newStartCommission = 0;

      if (values.property_value && values.percent_commission) {
        var str = values.property_value.replace(/\./g, "");
        var propertyValueInt = parseInt(str);
        var percentCommissionInt = parseFloat(values.percent_commission);
        newStartCommission = propertyValueInt * percentCommissionInt / 100;
        setFieldValue("start_commission", Math.floor(newStartCommission));
      }

      if (newStartCommission && values.mg_fee_percent) {
        var mgFeePercent = parseFloat(values.mg_fee_percent);
        var lastCommission = newStartCommission - newStartCommission * mgFeePercent / 100;
        setFieldValue("last_commission", Math.floor(lastCommission));
      }

      console.log("count count");
    };

    _this.submitForm = function (values, action) {
      _this.props.onSubmit(2, values);
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    console.log("gila a");
    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall //
      // initialValue: {
      //     date:'',
      //     project_name: "",
      //     agent_lister_id: "",
      //     note: "",
      //     agent:[],
      //     mg_fee_percent:this.props.relatedData.mgfee ? this.props.relatedData.mgfee
      // }

    };
    return _this;
  }

  _createClass(TransactionCreate1, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var createAjaxCall = "/" + baseUrl + "/create/";
      var submitAjaxCall = this.props.submitAjaxCall ? this.props.submitAjaxCall : createAjaxCall;
      var mgFee = 9;

      if (this.props.formData.mgfee) {
        mgFee = this.props.formData.mgfee;
      } else if (this.props.relatedData.mgfee) {
        mgFee = this.props.relatedData.mgfee;
      }

      var initialValue = {
        date: this.props.formData.date ? this.props.formData.date : "",
        agent_id: this.props.formData.agent_id,
        agent_id_label: this.props.formData.agent_id_label,
        property_id: this.props.formData.property_id,
        property_id_label: this.props.formData.property_id_label,
        property_value: this.props.formData.property_value,
        percent_commission: this.props.formData.percent_commission,
        mg_fee_percent: mgFee
      };
      this.state.initialValue = initialValue;
      this.countKomisi(initialValue, this.setRandyInitialValue);
      this.setState({
        submitAjaxCall: submitAjaxCall,
        initialValue: initialValue
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.scrollTo(0, 0);
    }
  }, {
    key: "render",
    // RENDER
    value: function render() {
      var _this2 = this;

      var initialValue = this.props.initialValue ? this.props.initialValue : this.state.initialValue;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transaction-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
        initialValues: initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              setFieldValue = _ref.setFieldValue,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Form"], {
            action: _this2.state.urlLogin,
            method: "post"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("date", "Tanggal", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
              name: "date",
              placeholder: "Masukkan Tanggal",
              dateFormat: "dd-MM-yyyy",
              form: form
            })),
            field2: _this2.basicLayout("transaction_number", "number", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
              name: "transaction_number",
              placeholder: "____-___",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("agent_id", "Agent", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
              name: "agent_id",
              placeholder: "Agent Name",
              ajaxUrl: "/agent/getAgent"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_id", "Nama Property", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldAsyncSelect"], {
              name: "property_id",
              placeholder: "Property Name",
              ajaxUrl: "/agent/getPrimaryProject"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_note_name", "Nama Unit", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
              name: "property_note_name",
              placeholder: "Property Name"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_note", "Note Property", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldTextArea"], {
              name: "property_note",
              placeholder: "Property Name"
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("property_value", "Property Value", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "property_value",
              placeholder: "masukkan harga bangunan",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("percent_commission", "Transaksi Komisi", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "percent_commission",
              placeholder: "persen Komisi",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "col-xs-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result total-pph-section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("start_commissison", "Komisi Awal", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "start_commission",
              placeholder: "0",
              disabled: true
            }))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("mg_fee_percent", "MF fee", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "mg_fee_percent",
              placeholder: "Biaya Management",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "col-xs-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout, {
            field1: _this2.basicLayout("last_commission", "Komisi Akhir", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "last_commission",
              placeholder: "0",
              disabled: true
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "NEXT",
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
        }
      }));
    }
  }]);

  return TransactionCreate1;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

TransactionCreate1.propTypes = {
  relatedData: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array,
  formData: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
TransactionCreate1.defaultProps = {
  relatedData: [],
  formData: []
};


/***/ }),

/***/ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate2.jsx":
/*!**************************************************************************************************!*\
  !*** ./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate2.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TransactionPrimaryCreate2; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./0Template/Module/03TransactionCommission/TransactionCreate/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Components/03Form/FieldType.jsx */ "./0Template/Components/03Form/FieldType.jsx");
/* harmony import */ var _Shared_GalaxyHelper_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/GalaxyHelper.jsx */ "./0Template/Shared/GalaxyHelper.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var FormCol1Layout = function FormCol1Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12"
  }, props.field1));
};

var FormCol2Layout = function FormCol2Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-md-6"
  }, props.field2));
};

var FormCol2Layout2 = function FormCol2Layout2(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-5"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-7"
  }, props.field2));
};

var LinePlus = function LinePlus(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line-plus"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line"
  }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "plus"
  }, " + "));
};

var FormCol2PPHSection = function FormCol2PPHSection(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-7"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-5"
  }, props.field2));
};

var FormCol4BonusSection = function FormCol4BonusSection(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group",
    style: {
      display: "inline-block"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-6"
  }, props.field1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-offset-6 col-md-offset-0 col-xs-6 col-md-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12"
  }, props.field2)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "col-xs-12 col-md-4"
  }, props.field3));
};

var TransactionPrimaryCreate2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransactionPrimaryCreate2, _React$Component);

  function TransactionPrimaryCreate2() {
    var _this;

    _classCallCheck(this, TransactionPrimaryCreate2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionPrimaryCreate2).call(this));

    _this.setRandyInitialValue = function (key, value) {
      var keys = key.split(".");
      var a = _this.state.initialValue;

      for (var i = 0; i < keys.length; i++) {
        var strKey = keys[i];

        if (!a[strKey]) {
          a[strKey] = [];
        }

        if (i + 1 == keys.length) {
          a[strKey] = value;
        } else {
          a = a[strKey];
        }
      }
    };

    _this.fieldValidation = function (values) {
      var errors = {};
      return errors;
    };

    _this.submitForm = function (values, actions) {
      _this.props.onSubmit(3, values);
    };

    _this.basicLayout = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-3 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-9 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.basicLayout2 = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-12 col-sm-12 col-lg-5 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-12 col-sm-12 col-lg-7 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-12 col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.basicLayout4 = function (keyname, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-12 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.basicLayoutRupiah = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-1 col-lg-2 labelSection',
        style: {
          width: "10%",
          paddingRight: "10px",
          paddingLeft: "10px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-11 col-lg-10 inputSection',
        style: {
          width: "90%"
        }
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-12 col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.basicLayoutPercentField = function (keyname, label, errors, touched, field) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-5 col-sm-5 col-lg-5 labelSection'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, label)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-7 col-sm-7 col-lg-7 inputSection'
      }, field), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'col-xs-12 col-sm-12 col-lg-offset-3 col-lg-9 errorSection'
      }, touched && errors && touched[keyname] && errors[keyname] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "errorMessage"
      }, errors[keyname]) : null));
    };

    _this.countKomisi = function (values, setFieldValue) {
      /* - Randy -
      * 0. Start Setting the Values
      * 1. Calculate Lister & Coordinator
      * 2. Calculate Agent Commission
      * 3. Count Office Commission
      */
      var commissionValue = 0;
      var subsdValue = 0;
      var agentXValue = 0;
      var totalCommission = 0;
      var input_commission = values.input_commission + "";
      input_commission = input_commission.replace(/\./g, "");
      input_commission = parseInt(input_commission);
      var input_commission_wo_coor = input_commission; // ==== Calculate the Lister & Koordinator ====

      if (values.lister_percent && values.input_commission) {
        var percentCommissionInt = parseFloat(values.lister_percent);
        setFieldValue("lister_value", Math.floor(input_commission * (percentCommissionInt / 100)));
        input_commission_wo_coor = input_commission_wo_coor - Math.floor(input_commission * (percentCommissionInt / 100));
      }

      if (values.koor && values.input_commission) {
        for (var i = 0; i < values.koor.length; i++) {
          var theValue = values.koor[i + 1];

          if (theValue) {
            var percentCommissionInt = parseFloat(theValue.percent + "");
            var calculation = Math.floor(input_commission * (percentCommissionInt / 100));
            setFieldValue("koor." + (i + 1) + ".value", calculation);
            input_commission_wo_coor = input_commission_wo_coor - calculation;
          }
        }
      }

      if (true) {
        setFieldValue("input_commission_wo_coor", input_commission_wo_coor);
        input_commission = input_commission_wo_coor;
      } // ==== Calculate the Percent Commission ====


      if (values.input_commission) {
        var percentCommissionInt = parseFloat(values.agent_percent_commission);
        commissionValue = input_commission * percentCommissionInt / 100;
        totalCommission = commissionValue + subsdValue + agentXValue;
        setFieldValue("commission_value", Math.floor(commissionValue));
        setFieldValue("total_commission", Math.floor(totalCommission)); // setup the office Value
      }

      if (values.subsd && values.input_commission) {
        var percentCommissionInt = parseFloat(values.subsd);
        subsdValue = input_commission * percentCommissionInt / 100;
        totalCommission = commissionValue + subsdValue + agentXValue;
        setFieldValue("subsd_value", Math.floor(subsdValue));
        setFieldValue("total_commission", totalCommission);
        setFieldValue("office_subsd", values.subsd);
        setFieldValue("office_subsd_value", Math.floor(subsdValue));
      }

      if (values.agent_x && values.input_commission) {
        var percentCommissionInt = parseFloat(values.agent_x);
        agentXValue = input_commission * percentCommissionInt / 100;
        totalCommission = commissionValue + subsdValue + agentXValue;
        setFieldValue("agent_x_value", Math.floor(agentXValue));
        setFieldValue("total_commission", totalCommission);
      } //  ===== CALCULATE PPH ====


      var limitTrue = [50, 250, 500, 9999999];
      var limitSelisih = [50, 200, 250, 9999999];
      var percent = [values.pph_1 ? parseFloat(values.pph_1) : 0, values.pph_2 ? parseFloat(values.pph_2) : 0, values.pph_3 ? parseFloat(values.pph_3) : 0, values.pph_4 ? parseFloat(values.pph_4) : 0];
      var resultPPH = _Shared_GalaxyHelper_jsx__WEBPACK_IMPORTED_MODULE_4__["default"].CalculatePPH(parseInt(values.previous_commission + ""), totalCommission, limitSelisih, percent);
      var totalPPh = 0;

      for (var _i = 0; _i < resultPPH.length; _i++) {
        var pph = resultPPH[_i];
        totalPPh = totalPPh + pph;

        if (_i == 0) {
          setFieldValue("pph_1_value", pph);
        }

        if (_i == 1) {
          setFieldValue("pph_2_value", pph);
        }

        if (_i == 2) {
          setFieldValue("pph_3_value", pph);
        }

        if (_i == 3) {
          setFieldValue("pph_4_value", pph);
        }
      }

      setFieldValue("total_pph", totalPPh);
      setFieldValue("total", totalCommission - totalPPh);

      _this.countKomisiOffice(values, setFieldValue);
    };

    _this.countKomisiOffice = function (values, setFieldValue) {
      /* - Randy -
      * 0. Start Setting initial Office Value
      * 1. Calculate PPN
      * 2. Calculate Subsidy
      * 3. Calculate Bonus
      */
      // var bonusStartCommission = 0;
      var startCommission = values.input_commission_wo_coor ? parseInt(values.input_commission_wo_coor + "") : 0;
      var totalOffice = startCommission * (100 - values.agent_percent_commission) / 100;

      if (true) {
        setFieldValue("office_percent_commission", 100 - values.agent_percent_commission);
        setFieldValue("office_value", totalOffice);
      }

      if (values.ppn && values.input_commission) {
        var input_commission = values.input_commission + "";
        input_commission = input_commission.replace(/\./g, "");
        input_commission = parseInt(input_commission);
        var percentCommissionInt = parseFloat(values.ppn);
        var commissionValue = Math.floor(input_commission * percentCommissionInt / 100);
        setFieldValue("ppn_value", commissionValue);
        totalOffice = totalOffice - commissionValue;
      } else {
        setFieldValue("ppn_value", null);
      }

      if (values.subsd && values.input_commission) {
        var percentCommissionInt = parseFloat(values.subsd);
        setFieldValue("office_subsd", percentCommissionInt);
        setFieldValue("office_subsd_value", percentCommissionInt / 100 * startCommission);
        totalOffice = totalOffice - values.office_subsd_value;
      } else {
        setFieldValue("office_subsd", 0);
        setFieldValue("office_subsd_value", 0);
      }

      var bonusStartCommission = totalOffice; // start to count for the bonus

      if (values.bonus) {
        var bonusDataKeys = Object.keys(values.bonus);

        for (var i = 0; i < bonusDataKeys.length; i++) {
          var key = bonusDataKeys[i];
          var bonusData = values.bonus[key];
          var percent = parseFloat(bonusData.percent + "");
          setFieldValue("bonus." + key + ".value", bonusStartCommission * (percent / 100));
          totalOffice = Math.floor(totalOffice - bonusStartCommission * (percent / 100));
        }
      }

      setFieldValue("total_office", Math.floor(totalOffice));

      _this.countTermin(values, setFieldValue);
    };

    _this.countTermin = function (values, setFieldValue) {
      var termin1 = parseFloat(values.termin_1.percent + '');
      var termin2 = 100 - termin1;
      setFieldValue("termin_1.percent", termin1);
      setFieldValue("termin_2.percent", termin2);
      setFieldValue("termin_1.value", Math.floor(termin1 / 100 * values.total));
      setFieldValue("termin_2.value", Math.floor(termin2 / 100 * values.total));
    };

    var ajaxCall = "/" + baseUrl + "/detail/ajax";
    console.log("gila a");
    _this.state = {
      baseUrl: window.baseUrl,
      ajaxCall: ajaxCall
    };
    return _this;
  }

  _createClass(TransactionPrimaryCreate2, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var createAjaxCall = "/" + baseUrl + "/create/";
      var submitAjaxCall = this.props.submitAjaxCall ? this.props.submitAjaxCall : createAjaxCall;
      var initialValue = {
        langsungCair: 1,
        pph_1: this.props.relatedData.taxData.pph_1,
        pph_2: this.props.relatedData.taxData.pph_2,
        pph_3: this.props.relatedData.taxData.pph_3,
        pph_4: this.props.relatedData.taxData.pph_4,
        ppn: this.props.relatedData.taxData.ppn,
        previous_commission: this.props.relatedData.agentData.commission_gross,
        agent_percent_commission: this.props.relatedData.agentData.percent_commission,
        office_percent_commission: this.props.relatedData.agentData.office_commission,
        input_commission: this.props.lastCommission
      };

      if (this.props.relatedData.lister) {
        initialValue.lister_percent = this.props.relatedData.lister.percent;
        initialValue.lister_name = this.props.relatedData.lister.name;
        initialValue.lister_id = this.props.relatedData.lister.id;
      }

      if (this.props.relatedData.coor) {
        var coord = this.props.relatedData.coor;
        initialValue["koor"] = [];

        for (var i = 0; i < coord.length; i++) {
          var theCoor = coord[i];
          initialValue["koor"][i + 1] = {};
          var theValue = initialValue["koor"][i + 1];
          theValue.percent = theCoor.percent;
          theValue.name = theCoor.name;
          theValue.id = theCoor.id;
        }
      }

      this.state.initialValue = initialValue;
      var bonusDataKeys = Object.keys(this.props.relatedData.bonusData);
      initialValue.bonus = {};

      for (var _i2 = 0; _i2 < bonusDataKeys.length; _i2++) {
        var key = bonusDataKeys[_i2];
        var bonusData = this.props.relatedData.bonusData[key];
        initialValue.bonus[key] = {};
        initialValue.bonus[key]["percent"] = bonusData.bonus;
        initialValue.bonus[key]["name"] = bonusData.name;
        initialValue.bonus[key]["id"] = bonusData.id;
        initialValue.bonus[key]["label"] = key;
      }

      initialValue.termin_1 = {};
      initialValue.termin_1.percent = 50;
      initialValue.termin_2 = {};
      initialValue.termin_2.percent = 50;
      this.countKomisi(initialValue, this.setRandyInitialValue);
      this.setState({
        firstTime: true,
        submitAjaxCall: submitAjaxCall,
        initialValue: initialValue
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.scrollTo(0, 0);
    } // RENDER

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var initialValue = this.props.initialValue ? this.props.initialValue : this.state.initialValue;
      console.log(this.props.relatedData.bonusData);
      var bonusDataKeys = Object.keys(this.state.initialValue ? this.state.initialValue.bonus : []);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transaction-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
        initialValues: initialValue,
        validate: this.fieldValidation,
        onSubmit: this.submitForm,
        render: function render(_ref) {
          var values = _ref.values,
              errors = _ref.errors,
              status = _ref.status,
              touched = _ref.touched,
              isSubmitting = _ref.isSubmitting,
              setFieldValue = _ref.setFieldValue,
              form = _ref.form;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Form"], {
            action: _this2.state.urlLogin,
            method: "post"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "hidden",
            name: "_token",
            value: csrf_token
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-sm-12 col-md-offset-6 col-md-6 calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("input_commission", "Komisi Akhir", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "input_commission",
              placeholder: "komisi",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          })), _this2.state.initialValue.lister && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Pelisting"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("lister_percent", "Listing", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "lister_percent",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("lister_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "lister_value",
              placeholder: "0 RUpiah",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("koor.1.percent", "Koordinator (1)", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "koor.1.percent",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("koor.1.value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "koor.1.value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("koor.2.percent", "Koordinator (2)", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "koor.2.percent",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("koor.2.value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "koor.2.value",
              placeholder: "0",
              disabled: true
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-sm-12 col-md-offset-6 col-md-6 calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayout("input_commission_wo_coor", "Komisi Tanpa Koordinator", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "input_commission_wo_coor",
              placeholder: "komisi",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Agent"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("agent_percent_commission", "Komisi", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "agent_percent_commission",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("commission_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "commission_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("subsd", "Subsd+", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "subsd",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            })),
            field2: _this2.basicLayoutRupiah("subsd_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "subsd_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_commission", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total_commission",
              placeholder: "0",
              disabled: true
            }))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "total-pph-section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_pph", "PPh Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total_pph",
              placeholder: "0",
              disabled: true
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6 pph-section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2PPHSection, {
            field1: _this2.basicLayoutPercentField("pph_1", "PPH <= 50x", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "pph_1",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("pph_1_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "pph_1_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2PPHSection, {
            field1: _this2.basicLayoutPercentField("pph_2", "50 - <= 250x", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "pph_2",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("pph_2_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "pph_2_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2PPHSection, {
            field1: _this2.basicLayoutPercentField("pph_3", "250 - <= 500x", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "pph_3",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("pph_3_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "pph_3_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2PPHSection, {
            field1: _this2.basicLayoutPercentField("pph_4", "> 500x", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "pph_4",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("pph_4_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "pph_4_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_pph", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total_pph",
              placeholder: "0",
              disabled: true,
              style: {
                "float": "right"
              }
            }))
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "prev_komisi_section"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Total Komisi Agent Tahun Ini : 50.000.000 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Total PPH Dibayar Agent Tahun Ini : 5.000.000"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 comission-result calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 col-sm-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total", "Total Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total",
              placeholder: "0",
              disabled: true,
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
            className: "banner"
          }, "Office"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("office_percent_commission", "Office", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "office_percent_commission",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("office_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "office_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("ppn", "PPN", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "ppn",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            })),
            field2: _this2.basicLayoutRupiah("ppn_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "ppn_value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol2Layout2, {
            field1: _this2.basicLayoutPercentField("subsd", "Subsd-", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "office_subsd",
              placeholder: "0%",
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              },
              disabled: true
            })),
            field2: _this2.basicLayoutRupiah("subsd_value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "office_subsd_value",
              placeholder: "0",
              disabled: true
            }))
          }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 col-sm-12 col-lg-9",
            style: {
              padding: "40px auto"
            }
          }, bonusDataKeys && bonusDataKeys.map(function (bonusKey) {
            var bonus = _this2.state.initialValue.bonus[bonusKey];
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol4BonusSection, {
              key: bonusKey + "_insert_section",
              field1: _this2.basicLayoutRupiah("bonus." + bonusKey + ".name", bonus.label, errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldText"], {
                name: "bonus." + bonusKey + ".name",
                placeholder: bonus.label,
                disabled: true
              })),
              field2: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
                name: "bonus." + bonusKey + ".percent",
                placeholder: "0%",
                disabled: true
              }),
              field3: _this2.basicLayoutRupiah("bonus." + bonusKey + ".value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
                name: "bonus." + bonusKey + ".value",
                placeholder: "0",
                disabled: true
              }))
            });
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 comission-result calculation-result"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-xs-12 col-sm-12 col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LinePlus, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol1Layout, {
            field1: _this2.basicLayoutRupiah("total_office", "Total Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "total_office",
              placeholder: "0",
              disabled: true,
              onBlur: function onBlur() {
                return _this2.countKomisi(values, setFieldValue);
              }
            }))
          }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "box transaction-box"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-6"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldRadio"], {
            name: "langsungCair",
            customClass: "col-xs-12",
            options: [{
              id: 1,
              label: "Cair Langsung"
            }, {
              id: 0,
              label: "Cair Tidak Langsung"
            }]
          })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "col-md-12"
          }, values.langsungCair == 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol4BonusSection, {
            key: "termin_1",
            field1: _this2.basicLayoutRupiah("termin_1.date", "termin 1", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
              name: "termin_1.date",
              placeholder: "dd/mm/yyyy"
            })),
            field2: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "termin_1.percent",
              placeholder: "0%"
            }),
            field3: _this2.basicLayoutRupiah("termin_1.value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "termin_1.value",
              placeholder: "0",
              disabled: true
            }))
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormCol4BonusSection, {
            key: "termin_2",
            field1: _this2.basicLayoutRupiah("termin_2.date", "termin 2", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldDateWithDatePicker"], {
              name: "termin_2.date",
              placeholder: "dd/mm/yyyy"
            })),
            field2: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldPercent"], {
              name: "termin_2.percent",
              placeholder: "0%"
            }),
            field3: _this2.basicLayoutRupiah("termin_2.value", "Rp", errors, touched, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_03Form_FieldType_jsx__WEBPACK_IMPORTED_MODULE_3__["FieldNumber"], {
              name: "termin_2.value",
              placeholder: "0",
              disabled: true
            }))
          })))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "submit",
            value: "NEXT",
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
            type: "button",
            value: "prev",
            onClick: _this2.props.backPrevForm,
            className: "btn float-right login_btn btn-primary form-control"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "row"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              display: 'block'
            },
            className: 'col-xs-12'
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Error:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, errors ? JSON.stringify(errors) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Touched:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, touched ? JSON.stringify(touched) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Value:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, values ? JSON.stringify(values.bonus) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
        }
      }));
    }
  }]);

  return TransactionPrimaryCreate2;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./0Template/Shared/GalaxyHelper.jsx":
/*!*******************************************!*\
  !*** ./0Template/Shared/GalaxyHelper.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GalaxyHelper = {};

GalaxyHelper.CalculatePPH = function (prevTotalCommission, currentCommission, differ, percent) {
  var limitSelisih = [50, 200, 250, 9999999];
  var resultPPH = [];
  var totalPPh = 0;
  var remain = prevTotalCommission;
  var trueRemain = currentCommission;
  var startCountRemain = false;

  for (var i = 0; i < limitSelisih.length; i++) {
    var limitInMil = limitSelisih[i] * 1000000;
    var percentCurrent = percent[i];
    var currentPay = remain - limitInMil;

    if (!startCountRemain) {
      if (currentPay >= 0) {
        resultPPH.push(0);
        remain = currentPay;
      } else {
        limitInMil = currentPay * -1;
        trueRemain = currentCommission;
        currentPay = remain - limitInMil;
        startCountRemain = true;
      }
    }

    if (startCountRemain) {
      if (currentPay > 0) {
        var taxNeedToPay = limitInMil * percentCurrent / 100;
        totalPPh = totalPPh + taxNeedToPay;
        resultPPH.push(taxNeedToPay);
        trueRemain = currentPay;
      } else {
        var taxNeedToPay = trueRemain * percentCurrent / 100;
        totalPPh = totalPPh + taxNeedToPay;
        resultPPH.push(taxNeedToPay);
        trueRemain = 0;
      }
    }
  }

  return resultPPH;
};

GalaxyHelper.numberWithCommas = function (x) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  if (x) {
    var value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return suffix + value + prefix;
  } else {
    return "0";
  }
};

/* harmony default export */ __webpack_exports__["default"] = (GalaxyHelper);

/***/ }),

/***/ "./2App/backend.jsx":
/*!**************************!*\
  !*** ./2App/backend.jsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _backend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.scss */ "./2App/backend.scss");
/* harmony import */ var _backend_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_backend_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../0Template/Module/01Login/loginModule.jsx */ "./0Template/Module/01Login/loginModule.jsx");
/* harmony import */ var _0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../0Template/Module/00BaseCrud/baseCrudModule.jsx */ "./0Template/Module/00BaseCrud/baseCrudModule.jsx");
/* harmony import */ var _0Template_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../0Template/Components/00Default/03Popup/00defaultBaseModal.jsx */ "./0Template/Components/00Default/03Popup/00defaultBaseModal.jsx");
/* harmony import */ var _0Template_Components_00Default_04Toast_00defaultBaseToast_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../0Template/Components/00Default/04Toast/00defaultBaseToast.jsx */ "./0Template/Components/00Default/04Toast/00defaultBaseToast.jsx");
/* harmony import */ var _0Template_Module_02PropertyAgent_propertyAgentModule_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../0Template/Module/02PropertyAgent/propertyAgentModule.jsx */ "./0Template/Module/02PropertyAgent/propertyAgentModule.jsx");
/* harmony import */ var _0Template_Module_02PropertyAgent_PrimaryPropertyCreate_primaryPropertyCreate_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx */ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx");
/* harmony import */ var _0Template_Module_02PropertyAgent_PrimaryPropertyCreate_primaryPropertyUpdate_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyUpdate.jsx */ "./0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyUpdate.jsx");
/* harmony import */ var _0Template_Module_02PropertyAgent_PrimaryPropertyList_primaryProjectListContainer_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.jsx */ "./0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.jsx");
/* harmony import */ var _0Template_Module_03TransactionCommission_TransactionCreate_transactionCreate_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate.jsx");
/* harmony import */ var _0Template_Module_03TransactionCommission_TransactionCreate_transactionPrimaryCreate_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate.jsx */ "./0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// slider, banner, infinite list, catalog, alert
// HOW TO MAKE INFINITE SCROLL, PAGINATION, SEARCH










 // import TransactionPrimaryCreate from "../0Template/Module/02PropertyAgent/TransactionPrimaryCreate/transactionPrimaryCreate.jsx"




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
};

window.ifNotExistThen = function (props, key) {
  var result = props.key;

  if (result) {
    return result;
  }

  alert("props " + key + "is not exist");
};

if ('BASECRUD') {
  callContainer('baseCRUDList', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudList"], null));
  callContainer('baseCRUDDetail', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudDetail"], null));
  callContainer('baseCRUDDelete', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudDelete"], null));
  callContainer('baseCRUDCreate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudCreate"], null));
  callContainer('baseCRUDUpdate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudUpdate"], null));
  callContainer('TestPopup', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Components_00Default_03Popup_00defaultBaseModal_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null));
  callContainer('TestToast', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Components_00Default_04Toast_00defaultBaseToast_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null));
} // Call LoginContainer Module


if ('LOGIN') {
  callContainer("login", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["LoginContainer"], null));
  callContainer("signup", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["SignUp"], null));
  callContainer("forgotPassword", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_01Login_loginModule_jsx__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordContainer"], null));
} // Call Property Agent Module


if ('PROPERTYAGENT') {
  callContainer('propertyAgentList', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_02PropertyAgent_propertyAgentModule_jsx__WEBPACK_IMPORTED_MODULE_7__["PropertyAgentListContainer"], null));
  callContainer('propertyAgentCreate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudCreate"], null));
  callContainer('propertyAgentUpdate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_00BaseCrud_baseCrudModule_jsx__WEBPACK_IMPORTED_MODULE_4__["BaseCrudUpdate"], null));
}

if ('PRIMARYPROJECT') {
  callContainer('primaryPropertyList', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_02PropertyAgent_PrimaryPropertyList_primaryProjectListContainer_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], null));
  callContainer('primaryPropertyCreate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_02PropertyAgent_PrimaryPropertyCreate_primaryPropertyCreate_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null));
  callContainer('primaryPropertyUpdate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_02PropertyAgent_PrimaryPropertyCreate_primaryPropertyUpdate_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null));
}

if ('TRANSACTIONPRIMARY') {
  callContainer('transactionPrimaryCreate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_03TransactionCommission_TransactionCreate_transactionPrimaryCreate_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], null));
  callContainer('transactionCreate', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_0Template_Module_03TransactionCommission_TransactionCreate_transactionCreate_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], null));
}

console.log("gila kamu");

/***/ }),

/***/ "./2App/backend.scss":
/*!***************************!*\
  !*** ./2App/backend.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=backend.js.map