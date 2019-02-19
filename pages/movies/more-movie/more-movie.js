webpackJsonp([3],{

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = __webpack_require__(0);
Page({
  data: {
    movies: [],
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    hiddenLoading: false,
    disabledRemind: false
  },
  onLoad: function onLoad(options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    wx.setNavigationBar({
      title: category,
      color: "#fff",
      backgroundColor: '#314C6D'
    });
    this.data.requestUrl = dataUrl;
    console.log(this.data.requestUrl);
    // util.http(dataUrl, this.processDoubanData)
    var that = this;
    var url = dataUrl;
    wx.httpRequest({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function success(res) {
        that.processDoubanData(res.data);
        // console.log(res.data)
      },
      fail: function fail(error) {
        // fail
        console.log(error);
      }
    });
  },
  onPullDownRefresh: function onPullDownRefresh(event) {
    var refreshUrl = this.data.requestUrl + "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    // console.log(refreshUrl)
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onReachBottom: function onReachBottom(event) {
    // 上滑加载
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    console.log(123);
    var that = this;
    wx.httpRequest({
      url: nextUrl,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function success(res) {
        that.processDoubanData(res.data);
        // console.log(res.data)
      },
      fail: function fail(error) {
        // fail
        console.log(error);
      }
    });
    wx.showNavigationBarLoading();
  },
  processDoubanData: function processDoubanData(moviesDouban) {
    var movies = [];
    //没有更多啦
    if (moviesDouban.subjects.length <= 0) {
      var _this = this;
      if (!_this.data.disabledRemind) {
        _this.setData({
          disabledRemind: true
        });
        setTimeout(function () {
          _this.setData({
            disabledRemind: false
          });
        }, 2000);
      }
    }
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
    var totalMovies = {};

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.setData({
      hiddenLoading: true
    });
  },

  onReady: function onReady(event) {
    wx.setNavigationBar({
      title: this.data.navigateTitle
    });
  },

  onMovieTap: function onMovieTap(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    });
  }
});

/***/ })

},[9]); function webpackJsonp() { require("./../../../common.js"); wx.webpackJsonp.apply(null, arguments); };
//# sourceMappingURL=more-movie.js.map