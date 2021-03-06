//app.js
var API_URL = "https://wx.fanweimei.com/wp-content/plugins/PHP_wx_login/login.php";
let utils = require('utils/util.js');
App({
  login: function(code, encryptedData, iv) {
    //创建一个dialog
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    //请求服务器
    wx.request({
      url: API_URL,
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideToast();
        this.globalData.userInfo = res;
        var openId=res.data.openId;
      
        this.globalData.userInfo.Basic = utils.base64_encode( openId+ ':' + '123456');
        if (this.globalData.userInfo.Basic) {
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000
          })
        }
      }.bind(this)
    })
  },
  onLaunch: function () {
    //this.getUserInfo();
  },
  getUserInfo: function(){
    var that=this;
    if (!this.globalData.userInfo) {
      wx.login({//login流程
        success: function (res) {//登录成功
          if (res.code) {
            var code = res.code;
            wx.getUserInfo({//getUserInfo流程
              success: function (res2) {//获取userinfo成功
                var encryptedData = res2.encryptedData;
                var iv = res2.iv;
                //请求自己的服务器
                that.login(code, encryptedData, iv);
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  }

})
