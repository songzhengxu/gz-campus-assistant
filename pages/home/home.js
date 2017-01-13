// pages/news/news.js
import Promise from '../../utils/es6-promise.min';
let api = require('../../utils/api.js').api
const url = require('../../utils/url.js');
Page({
  data: {
    list: [],
    page: 1,  //滚动加载时，请求的参数,第一次滚动加载加载page值为为2...
    per_page: 10,//每次加载的条数
    isLoading: false,  //是否正在加载数据
    isComplete: false //是否所有列表都加载完
  },
  //加载数据 time表示定时器的设置时间，初始化为为0，滚动加载为为500
  request: function (time) {
    //如果数据加载完或正在加载中中，则直接返回
    if (this.data.isComplete || this.data.isLoading) {
      return
    }
    this.setData({ isLoading: true });
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    setTimeout(function () {
      let page = this.data.page;
      let options = {
        param: {
          page: page
        },
        url: url.POSTS + "posts/"
      };
      if (time > 0) { //是否是滚动加载
        options.param.per_page = this.data.per_page;
      }
      api.getList(options.url, options.param).then(data => {
        wx.hideToast();
        if (!data.list) {
          return;
        }
        //格式化时间
        data.list.forEach(item => {
          item.date=item.date.replace("T"," ")
        });
        let newList;
        if (data.list.length > 0 && this.data.list.length > 0) {
          newList = this.data.list.concat(data.list);
        } else if (data.list.length > 0 && this.data.list.length == 0) {
          newList = data.list;
        } else {
          this.setData({
            isComplete: true
          });
          return;
        }
        this.setData({
          list: newList,
          page: ++page,
          isLoading: false
        });
      });
    }.bind(this), time)
  },
  onLoad: function () {
    this.request(0);
  },
  //滚动加载
  nextPage: function (e) {
    this.request(500);
  }
})