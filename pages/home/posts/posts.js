// pages/home/posts/posts.js
const url = require('../../../utils/url.js');
let api = require('../../../utils/api.js').api;
let WxParse = require('../../../wxParse/wxParse.js');
let app = getApp();

Page({
  data: {
    article: {
      title: "",
      date: "",
      content: ""
    },
    comments: [],
    comments_: [],
    tips: "",
    page: 1,
    comment_text: ""
  },
  onLoad: function (options) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    let params = {};
    if (options && options.id) {
      //params="posts/"+options.id;
     
    }
    //请求文章数据
    api.getList(url.NEWS_POSTS+"posts/"+options.id, params).then(data => {
      wx.hideToast();
      this.setData({
        article: {
          title: data.list.title,
          date: data.list.date,
          content: data.list.content.rendered
        }
      });
      //转换html代码
      WxParse.wxParse('content', 'html', this.data.article.content, this);
      //请求评论
      api.getList(url.NEWS_POSTS+"comments", {}).then(data => {
        if (data.comments && data.comments.length > 0) {
          this.setData({
            comments: data.comments,
            tips: data.comments.length + "条回复"
          })
        } else {
          this.setData({
            tips: "暂时无回复，赶快抢坐沙发吧"
          })
        }
      });
    });

  },
  nextPage: function(){
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    setTimeout(function(){
      api.getList(url.NEWS_COMMENTS_REFRESH,{
        page: this.data.page,
      }).then(data => {
        wx.hideToast();
        if(data.comments && data.comments.length>0){
          this.setData({
            comments: this.data.comments.concat(data.comments),
            tips: (this.data.comments.length+data.comments.length)+"条回复",
            page: this.data.page++
          })
        }else{
          return;
        }
      })
    }.bind(this),500);
  },
  inputComment: function(e){
    this.setData({
      comment_text: e.detail.value
    });
  },
  sendComment: function(){
    //获取用户头像和名字，新建日期，发送给后台，更新comments
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})