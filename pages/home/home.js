// pages/news/news.js
import Promise from '../../utils/es6-promise.min';
let api = require('../../utils/api.js').api
const url = require('../../utils/url.js');
Page({
  data: {
    list: [], //新闻列表
    page: 1,  //滚动加载时，请求的参数,第一次滚动加载加载page值为为2...
    per_page: 10,//每次加载的条数
    isLoading: false,  //是否正在加载数据
    isComplete: false //是否所有列表都加载完
  },
  //加载数据 time表示定时器的设置时间，初始化为为0，滚动加载为为500
  request: function (time) {
    //加载数据
    api.getList({
      url: url.POSTS + "posts/",
      time: time,
      param: {
        page: this.data.page++,
        per_page: this.data.per_page
      }
    }, this).then(data => {
      if (!data.list) {
        return;
      }
      //格式化时间
      data.list.forEach(item => {
        item.date = item.date.replace("T", " ")
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
      }
      this.setData({
        list: newList
      });
    });
  },
  onLoad: function () {
    this.request(0);
  },
  //滚动加载
  nextPage: function (e) {
    this.request(500);
  }
})