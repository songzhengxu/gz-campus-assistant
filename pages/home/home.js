// pages/news/news.js
import Promise from '../../utils/es6-promise.min';
let api = require('../../utils/api.js').api
const url = require('../../utils/url.js');
Page({
  data: {
    list: [],
    page: 1,  //滚动加载时，请求的参数,第一次滚动加载加载page值为为1...
    per_page:10,//每次加载的条数
    isRequest: false  //是否正在加载数据
  },
  //加载数据
  request: function (data, isRefresh,time) {
    if(isRefresh) return
    isRefresh = true;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    setTimeout(function () {
      let options = Object.assign({},data);
      api.getList(options.url, options.param).then(data => {
        if (data.list && data.list.length > 0) {
          let newList = isRefresh ? data.list.concat(this.data.list) : this.data.list.concat(data.list);
          this.setData({ list: newList });
        } else {
          api.getList(url, options.param).then(data => {
            this.setData({ list: data.list });
          });
        }
        if (data.page) {
          this.setData({ page: data.page++ });
        }
        isRefresh = false;
      });
      wx.hideToast();
    }.bind(this), time)
  },
  onLoad: function (options) {
    this.request({ url: url.NEWS_POSTS+"posts/" },0);
  },
  //滚动加载
  nextPage: function (e) { 
    this.request({
      param: {
        page: this.data.page
      },
      url: url.NEWS_SCROLL
    },500, false);
  },
  //下拉刷新
  refresh: function () {
    this.request({ url: url.NEWS_REFRESH+"posts/" },500, true);
  }
})