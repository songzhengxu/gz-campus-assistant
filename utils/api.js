import Promise from 'es6-promise.min';
class Api {
    //获取列表, _this只传入的页面对象，因为需要更改isLoading
    getList(obj, _this) {
        return new Promise((resolve, reject) => {

            //如果正在加载中或者数据已加载完，则直接返回，目前无效，scroll-view组的bindscrolltolower存在wenw在bug
            if (_this.data.isComplete || _this.data.isLoading) {
                return;
            }
            _this.setData({
                isLoading: true
            });
            //设置默认参数
            
            // let options = Object.assign({
            //     isShowToast: true,
            //     time: 0,
            //     param: {}
            // }, obj);
            var options = {};
            options.isShowToast = obj.isShowToast?obj.isShowToast:true;
            options.time = obj.time?obj.time:0;
            options.param = obj.param?obj.param:{};
            options.url = obj.url;            
            if (options.isShowToast) {
                wx.showToast({
                    title: "加载中...",
                    icon: "loading",
                    duration: 10000
                });
            }
            
            setTimeout(function () {
                wx.request({
                    url: options.url,
                    data: options.param,
                    header: {
                        'content-type': 'application/json'
                    },
                    success: res => {
                        wx.hideToast();
                        resolve(res.data);
                        _this.setData({
                            isLoading: false
                        });
                    },
                    fail: err => reject(err)
                })
            }, options.time)
        })

    }
    //获取新闻列表 
    getPage(id) {

    }
}


module.exports.api = new Api();