// pages/life/success/success.js
Page({
  data:{
    url: ""
  },
  onLoad: function(option){
    this.setData({
      url: "../"+option.page+"/"+option.page
    })
  },
  pageJump: function(){
    wx.redirectTo({
      url: this.data.url
    })
  }
})