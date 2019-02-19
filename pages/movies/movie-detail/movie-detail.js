webpackJsonp([2],{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Movie = __webpack_require__(7);

var app = getApp();
Page({
    data: {
        movie: {},
        visible: false
    },
    onLoad: function onLoad(options) {
        var _this = this;

        var movieId = options.id;
        var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
        var movie = new _Movie.Movie(url);
        // var movieData = movie.getMovieData();
        // var that = this;
        // movie.getMovieData(function (movie) {
        //   that.setData({
        //     movie: movie
        //   })
        // })
        //C#、Java、Python lambda
        movie.getMovieData(function (movie) {
            _this.setData({
                movie: movie
            });
            _this.setData({
                visible: true
            });
        });
    },

    /*查看图片*/
    viewMoviePostImg: function viewMoviePostImg(e) {
        var src = e.currentTarget.dataset.src;
        console.log(src);
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        });
    }
});

/***/ })

},[6]); function webpackJsonp() { require("./../../../common.js"); wx.webpackJsonp.apply(null, arguments); };
//# sourceMappingURL=movie-detail.js.map