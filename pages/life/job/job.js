let api = require('../../../utils/api.js').api;
//初次加载
const list_url = "https://wx.fanweimei.com/json/job_list.json";
const banner_url = "https://wx.fanweimei.com/json/job_banner.json";
//滚动加载地址
const list_scroll_url = "https://wx.fanweimei.com/json/job_list_scroll.json";
Page({
    data: {
        list: [], //兼职列表
        urls: [], //banner图列表
        isLoading: false,  //是否正在加载数据
        isComplete: false,  //兼职列表是否加载完毕
        page: 1,
        per_page: 2
    },
    //初始化加载数据
    initLoadData: function (data,api) {
        let _this = this;
        if (data.list && data.list.length > 0) {
            _this.setData({
                list: data.list
            });
        } else {
            _this.setData({
                isComplete: true
            });
        }
        //加载banner图地址
        api.request({
            url: banner_url,
            isShowToast: false,
            fn: function (data2) {
                console.log("come in")
                if (data2.banner_urls && data2.banner_urls.length > 0) {
                    _this.setData({
                        urls: data2.banner_urls
                    });
                }
            }
        }, this);
    },
    onLoad: function () {
        //加载数据
        api.request({
            url: list_url,
            fn: this.initLoadData
        }, this)
    },
    nextPage: function () {
        let _this = this;
        let page = ++_this.data.page;
        api.request({
            url: list_scroll_url,
            time: 500,
            param: {
                page: page,
                per_page: _this.data.per_page
            },
            fn: function (data,api) {
                if (data.list && data.list.length > 0) {
                    _this.setData({
                        list: _this.data.list.concat(data.list)
                    });
                } else {
                    _this.setData({
                        isComplete: true
                    });
                    return;
                }
            }
        }, this);
    }
})