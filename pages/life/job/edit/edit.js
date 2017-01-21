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
    msg: "",   //错误提示信息
    isAgree: false, //是否同意协议
    isAllowNext: false,  //是否可以进入下一页
    isSubmit: false  //是否可以提交
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
  },
  checkPrevPage: function () {  //判断必填字段不为空
    if (this.data.title.trim() == "") {
      return "标题不能为空";
    }
    if (this.data.station.trim() == "") {
      return "工作岗位不能为空";
    }
    if (this.data.salary.trim() == "") {
      return "工作薪酬不能为空";
    }
    if (this.data.accounts.trim() == "") {
      return "结算方式不能为空";
    }
    if (this.data.count.trim() == "") {
      return "人数需求不能为空";
    }
    if (this.data.detail.trim() == "") {
      return "详细地址不能为空";
    }
    if (this.data.start_date > this.data.end_date) {
      return "工作日期不正确，开始日期不能小于结束日期";
    }
    if (this.data.name.trim() == "") {
      return "联系人姓名不能为空";
    }
    if (this.data.phone.trim() == "") {
      return "联系人电话不能为空";
    }
    if (!/^\d+$/g.test(this.data.phone)) {
      return "联系人电话格式不正确";
    }
    return "";
  },
  checkNextPage: function () {
    if (this.data.requirements.trim() == "") {
      return "岗位要求不能为空";
    }
    if (this.data.responsibility.trim() == "") {
      return "岗位职责不能为空";
    }
    if (!this.data.isAgree) {
      return "是否已阅读广州校园助手发帖人相关授权"
    }
    return "";
  },
  //输入事件
  valueChange: function (e) {
    let name = e.target.id;
    let value = (name != "isAgree" ? e.detail.value : e.detail.value.indexOf(name)!=-1);
    this.setData({
      [name]: value,
      msg: ""
    });
    let isAllowNext = (this.checkPrevPage() == "");
    let isSubmit = (this.checkNextPage() == "");
    this.setData({
      isAllowNext: isAllowNext,
      isSubmit: isAllowNext && isSubmit
    })
  },
  //下一页
  nextPage: function () {
    let msg = this.checkPrevPage();
    if (msg != "") {
      this.setData({
        msg: msg
      })
      return
    }
    this.animation.translate(0, 0).step();
    this.setData({
      show_page: this.animation.export()
    })
    this.animation.translate('-100%', 0).step();
    this.setData({
      hide_page: this.animation.export()
    })
  },
  //提交
  formSubmit: function () {
    let msg = this.checkPrevPage() != "" ? this.checkPrevPage() : this.checkNextPage();
    if (msg != "") {
      this.setData({
        msg: msg
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
      url: "../../success/success?page=job"
    });
  }
})