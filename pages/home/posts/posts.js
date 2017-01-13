// pages/home/posts/posts.js
const url = require('../../../utils/url.js');
let api = require('../../../utils/api.js').api;
let WxParse = require('../../../wxParse/wxParse.js');
let app = getApp();
Page({
  data: {
    article: {
      id: "",
      title: "",
      date: "",
      content: ""
    },
    comments: [],
    tips: "",
    page: 1,
    per_page: 5,
    article_loaded: false, //文章是否加载完毕,加载后才显示评论输入框
    isLoading: false, //是否正在加载评论'
    isComplete: false  //是否所有评论都加载完
  },
  getComments: function(data){
     let arr= this.data.comments;
     data.forEach(item => {
       var date = item.data.date.replace("T", " ");
       var content = item.data.content.rendered.replace(/<[^>]+>/g, "");
       arr.push({
         portrait: item.data.author_avatar_urls[96],
         name: item.data.author_name,
         date: date,
         content: content,
         praise: 0
       });
     });
     return arr;
  },
  onLoad: function (options) {
    if (!options && !options.id) return
    let id = options.id;
    this.setData({
      isLoading: true
    });
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })

    //请求文章数据
    api.getList(url.POSTS + "posts/" +id, {}).then(data => {
      wx.hideToast();
      let date = data.list.date.replace("T", " ");
      this.setData({
        article: {
          id: id,
          title: data.list.title,
          date: date,
          content: data.list.content.rendered
        },
        article_loaded: true
      });
      //转换html代码
      WxParse.wxParse('content', 'html', this.data.article.content, this);
      //请求评论
      api.getList(url.POSTS + "comments", {
        post: id
      }).then(data => {
        if (data && data.length > 0) {
          let comments = this.getComments(data);  
          this.setData({
            comments: comments,
            tips: comments.length + "条回复"
          })
        } else {
          this.setData({
            tips: "暂时无回复，赶快抢坐沙发吧",
            isComplete: true
          });
        }
        this.setData({
          isLoading: false
        })
      });
    });
  },
  //滚动加载评论
  nextPage: function () {
    if (this.data.isComplete || this.data.isLoading) {
      return
    }
    this.setData({
      isLoading: true
    });
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    setTimeout(function () {
      let page = this.data.page++;
      api.getList(url.POSTS+ "comments", {
        page: page,
        per_page: this.data.per_page,
        post: this.data.article.id
      }).then(data => {
        wx.hideToast();
        if (data && data.length > 0) {
          let comments = this.getComments(data);
          this.setData({
            comments: comments,
            tips: comments.length + "条回复",
            page: page,
            isLoading: false
          })
        } else {
          this.setData({
            isComplete: true
          })
          return
        }
      })
    }.bind(this), 500);
  },
  inputComment: function (e) {
    this.setData({
      comment_text: e.detail.value
    });
  },
  sendComment: function () {
    //获取用户头像和名字，新建日期，发送给后台，更新comments
<<<<<<< HEAD
    wx.request({
      url: NEWS_POSTS_comments,
      data: {
        x: '' ,
        y: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
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
=======
>>>>>>> 433568fbb5d82fb1ede62ae50872047cf30d4e0b
  }
})