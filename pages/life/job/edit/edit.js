// pages/life/job/edit/edit.js
Page({
  data: {
    areas: ["越秀区", "海珠区", "荔湾区", "天河区", "白云区", "黄埔区", "花都区", "番禺区", "萝岗区", "南沙区", "从化市", "增城市", "其它区"],
    index: 0,  //工作地区下标
    title: "", //标题
    station: "",  //工作岗位
    salary: "", //工作薪酬
    accounts: "", //结算方式
    count: "",   //人数需求
    detail: "", //地址详情
    start_date: "2017-01-01",  //开始时间
    end_date: "2017-01-01",  //工作结束时间
    name: "",  //联系人姓名
    phone: "", //联系人电话
    requirements: "", //岗位要求
    responsibility: "", //岗位职责
    others: "",   //备注,
    disabled: true,  //是否可以发生提交请求，除备注外，其它均不能为空
    msg: "",   //错误提示信息
    isAgree: false //是否同意协议
  },
  isRequiredNotNull: function () {  //判断必填字段不为空
    if (this.data.title.trim() == "") {
      return "标题";
    }
    if (this.data.station.trim() == "") {
      return "工作岗位";
    }
    if (this.data.salary.trim() == "") {
      return "工作薪酬";
    }
    if (this.data.accounts.trim() == "") {
      return "结算方式";
    }
    if (this.data.count.trim() == "") {
      return "人数需求";
    }
    if (this.data.detail.trim() == "") {
      return "详细地址";
    }
    if (this.data.name.trim() == "") {
      return "联系人姓名";
    }
    if (this.data.phone.trim() == "") {
      return "联系人电话";
    }
    if (this.data.requirements.trim() == "") {
      return "岗位要求";
    }
    if (this.data.responsibility.trim() == "") {
      return "岗位职责";
    }
    return "";
  },
  valueChange: function (e) {
    let name = e.target.id;
    this.setData({
      [name]: e.detail.value,
      msg: ""
    });
    console.log(this.data)
    if (this.isRequiredNotNull() == "") {
      this.setData({
        disabled: false
      })
    }
  },
  formSubmit: function () {
    let info = this.isRequiredNotNull();
    if (info != "") {
      this.setData({
        msg: info + "不能为空"
      });
      return
    }
    if (this.data.start_date > this.data.end_date) {
      this.setData({
        msg: "工作日期不正确，开始日期不能小于结束日期"
      });
      return
    }
    if (!/^\d+$/g.test(this.data.phone)) {
      this.setData({
        msg: "电话号码格式不正确"
      });
      return
    }
    let data = {
      titile: this.data.title.trim(),
      station: this.data.station.trim(),
      salary: this.data.salary.trim(),
      accounts: this.data.accounts.trim(),
      count: this.data.count.trim(),
      area: this.data.areas[this.data.index],
      detail: this.data.detail.trim(),
      start_date: this.data.start_date.trim(),
      end_date: this.data.end_date.trim(),
      name: this.data.name.trim(),
      phone: this.data.phone.trim(),
      requirements: this.data.requirements.trim(),
      responsibility: this.data.responsibility.trim(),
      others: this.data.others.trim()
    };
    //发送请求

    wx.navigateTo({
      url: '../../success/success'
    });
  }
})