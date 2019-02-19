webpackJsonp([1],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(0);
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '光与影',
      desc: '进入搜索电影吧',
      path: '/pages/movies/movies'
    };
  },
  onLoad: function onLoad(event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=6";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=6";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=6";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    wx.setNavigationBar({
      title: '光与影',
      color: "#fff",
      backgroundColor: '#314C6D'
    });
  },

  onMoreTap: function onMoreTap(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    });
  },

  onMovieTap: function onMovieTap(event) {
    var movieId = event.currentTarget.dataset.movieId;
    // console.log(event.currentTarget)
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    });
  },

  getMovieListData: function getMovieListData(url, settedKey, categoryTitle) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.httpRequest({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function success(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function fail(error) {
        // fail
        console.log(error);
      }
    });
  },

  onCancelImgTap: function onCancelImgTap(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    });
  },

  onBindFocus: function onBindFocus(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    });
  },

  onBindBlur: function onBindBlur(event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  processDoubanData: function processDoubanData(moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
    console.log(readyData);
    wx.hideNavigationBarLoading();
  }
});

/***/ })

},[5]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };
//# sourceMappingURL=movies.js.map