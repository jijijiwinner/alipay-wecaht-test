webpackJsonp([4],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 获取应用实例
var app = getApp();

Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onLoad: function onLoad() {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../movies/movies'
    });
  }
});

/***/ })

},[4]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };
//# sourceMappingURL=index.js.map