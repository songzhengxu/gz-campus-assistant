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
  getComments: function (data) {
    let arr = this.data.comments;
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
    //加载数据
    api.getList({
      url: url.POSTS + "posts/" + id
    }, this).then((data) => {
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
      api.getList({
        url: url.POSTS + "comments",
        param: {
          post: id
        },
        isShowTost: false
      }, this).then(data2 => {
        if (data2 && data2.length > 0) {
          let comments = this.getComments(data2);
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
      });
    });
  },
  //滚动加载评论
  nextPage: function () {
    api.getList({
      url: url.POSTS + "comments",
      time: 500,
      param: {
        page: ++this.data.page,
        per_page: this.data.per_page
      }
    }, this).then(data => {
      if (data && data.length > 0) {
          let comments = this.getComments(data);
          this.setData({
            comments: comments,
            tips: comments.length + "条回复"
          })
        } else {
          this.setData({
            isComplete: true
          })
        }
    })
  },
  inputComment: function (e) {
    this.setData({
      comment_text: e.detail.value
    });
  },
  sendComment: function() {
		var _this = this;
    console.log( _this.data.comment_text)
    if(!app.globalData.userInfo){
        	wx.showToast({
						title: "请登陆后再评论",
						icon: 'success',
						duration: 2000
					})
        return false; 
    }
		//
		wx.request({
			url: url.POSTS + "comments",
			data: {
				content: _this.data.comment_text,
				post: _this.data.article.id,
			},
			method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			header: {
				'content-type': 'application/json',
				'Authorization': "Basic " + app.globalData.userInfo.Basic,
			},
			success: function(res) {
				console.log()
				if(!res.data.id) {
					wx.showToast({
						title: res.data.message,
						icon: 'loading',
						duration: 2000
					})
				} else {
					wx.showToast({
						title: "评论成功,审核后显示",
						icon: 'success',
						duration: 2000
					})
          _this.setData({
            comment_text: ""
          })
				}
			}
		})
	}
})