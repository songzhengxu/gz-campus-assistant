class Api {
    //获取列表 
    getList(url, params) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url, //仅为示例，并非真实的接口地址
                data: params,
                header: {
                    'content-type': 'application/json'
                },
                success: res => resolve(res.data),
                fail: err => reject(err)
            })
        })
    }
    //提取公共加载数据函数：初始设置loading为为false,显示加载中的的logo, 开定时器加载数据数据，执行回调函数
    request(obj, _this) {
        if (_this.data.isComplete || _this.data.isLoading) {
            return
        }
        _this.setData({
            isLoading: true
        });
        let options = Object.assign({
            isShowTost: true,
            time: 0,
            param: {}
        }, obj);
        if (options.isShowToast) {
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                duration: 10000
            });
        }
        console.log(options.fn);
        setTimeout(function () {
            this.getList(options.url, options.param).then(data => {
                wx.hideToast();
                options.fn(data,this);
                _this.setData({
                    isLoading: false
                })
            });
        }.bind(this), options.time);
    }
    //获取新闻列表 
    getPage(id) {

    }
}


module.exports.api = new Api();