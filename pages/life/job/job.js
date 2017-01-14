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
    initLoadData: function (data, api) {

    },
    onLoad: function () {
        //加载数据
        api.getList({
            url: list_url
        }, this).then((data) => {
            if (data.list && data.list.length > 0) {
                this.setData({
                    list: data.list
                });
            } else {
                this.setData({
                    isComplete: true
                });
            }
            //加载banner图地址
            api.getList({
                url: banner_url,
                isShowTost: false
            },this).then(data2 => {
                if (data2.banner_urls && data2.banner_urls.length > 0) {
                    this.setData({
                        urls: data2.banner_urls
                    });
                }

            })
        })
    },
    nextPage: function () {
        let page = ++this.data.page;
        api.request({
            url: list_scroll_url,
            time: 500,
            param: {
                page: page,
                per_page: this.data.per_page
            }
        }, this).then(data => {
            if (data.list && data.list.length > 0) {
                this.setData({
                    list: _this.data.list.concat(data.list)
                });
            } else {
                this.setData({
                    isComplete: true,
                    isLoading: false
                });
                return;
            }
        })
    }
})