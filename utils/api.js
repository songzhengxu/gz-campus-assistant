
class Api {
    //获取新闻列表 
    getList(url,params) {
        return new Promise((resolve,reject) => {
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
    //获取新闻列表 
    getPage(id) {

    }
}


module.exports.api = new Api();