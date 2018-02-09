// pages/renter/addRenter/addRenter.js
const app = getApp()
const request = require('../../../utils/request.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    houseid:'',

    renterName: '',
    renterPhone: '',
    rentStartDate: '',
    // new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    rentLength: '',
    rentOverDate: '',
    rentPayWay: '',//默认1月一付
    rentPayDate: '',
    yaJinMoney: '',
    rentMoney: '',

    rentLengthArrayIndex: 11,//默认为12个月
    payDayArrayIndex: new Date().getDate() - 1,//默认为当天号
    payWayArrayIndex: 0,//默认为1月1付

    rentLengthArray: util.generaRentLengthArray(''),//1月到24月
    payDayArray: util.generaPayDayArray(''),//1号到31号
    payWayArray: [1, 2, 3, 4, 5, 6, 12],//1月1付

    //彻底晕，这里是为了弹出框设置单位
    rentLengthArrayToWxss: util.generaRentLengthArray('个月'),//1月到24月
    payDayArrayToWxss: util.generaPayDayArray('号'),//1号到31号
    payWayArrayToWxss: ['1月/付', '2月/付', '3月/付', '4月/付', '5月/付', '6月/付', '12月/付'],//1月1付
    
    //这个为了显示138 2233 4445 这样的手机号码
    mabiLength:11,
  },

  clearKongge:function(){
    console.log('clearKongge')

    let renterPhone = this.data.renterPhone.split(' ').join('')
    console.log(renterPhone)
    this.setData({
      mabiLength:11,
      renterPhone: renterPhone
    })

  },
  regularPhone:function(e){
    console.log(e.detail.value)
    console.log('regularPhone')
    let renterPhone = e.detail.value

    if (renterPhone.length<3){
      return
    }
    let mabi = renterPhone.split('')
    mabi.splice(3,0,' ')
    mabi.splice(8, 0, ' ')
    renterPhone = mabi.join('')
    this.setData({
      mabiLength: 13,
      renterPhone: renterPhone
    })
  },
  
  bindRenterNameInput: function (e) {
    this.setData({
      renterName: e.detail.value
    })
  },
  bindRenterPhoneInput: function (e) {
    this.setData({
      renterPhone: e.detail.value
    })
  },
  bindYaJinMoneyInput: function (e) {
    this.setData({
      yaJinMoney: e.detail.value
    })
  },
  bindRentMoneyInput: function (e) {
    this.setData({
      rentMoney: e.detail.value
    })
  },
  //起租日期
  bindRentStartDateChange: function (e) {
    this.setData({
      rentStartDate: e.detail.value
    })

    
  },
  //租期时长
  bindRentLengthChange: function (e) {
    this.setData({
      rentLengthArrayIndex: e.detail.value
    })
    console.log(e)


    this.setData({
      rentLength: this.data.rentLengthArray[e.detail.value],
    })
    
  },
  //交租方式
  bindPayWayChange: function (e) {
    this.setData({
      payWayArrayIndex: e.detail.value
    })

    this.setData({
      rentPayWay: this.data.payWayArray[e.detail.value],
    })   
    
  },
  //交租日期
  bindPayDayChange: function (e) {
    this.setData({
      payDayArrayIndex: e.detail.value
    })

    this.setData({
      rentPayDate: this.data.payDayArray[e.detail.value],
    })
  },

  toAddRenter:function(){
    let rentOverDate = util.getNextMonth(new Date(this.data.rentStartDate), parseInt(this.data.rentLengthArray[this.data.rentLengthArrayIndex]) )
    console.log('起租日期-------------------')
    console.log(this.data.rentStartDate)
    console.log('-------------------')
    console.log(this.data.rentLengthArray[this.data.rentLengthArrayIndex]+'个月以后')
    console.log('截止日期-------------------')
    console.log(rentOverDate.getFullYear() + '-' + (rentOverDate.getMonth() + 1) + '-' + rentOverDate.getDate())
    

    if (this.data.renterPhone.split(' ').join('').length<11){
      this.renterHasSameTips("请输入正确格式的手机号")
      return
    }
    let renterDetail = {
      renterName: this.data.renterName,
      renterPhone: this.data.renterPhone.split(' ').join(''),
      rentStartDate: this.data.rentStartDate,
      rentLength: this.data.rentLengthArray[this.data.rentLengthArrayIndex],
    
      rentPayDate: this.data.payDayArray[this.data.payDayArrayIndex],
      rentPayWay: this.data.payWayArray[this.data.payWayArrayIndex],
      yaJinMoney: this.data.yaJinMoney*100,
      rentMoney: this.data.rentMoney*100,
      rentOverDate: rentOverDate.getFullYear() + '-' + (rentOverDate.getMonth() + 1) + '-' + rentOverDate.getDate(),
    }

    console.log(renterDetail)
    let userId = util.getMyUserId()
    request.requestToAddRenter(userId,this.data.houseid, renterDetail, res=>{
      app.updateMyBookPage()
      wx.navigateBack({
        delta: 1
      })
    },res=>{
      this.renterHasSameTips(res.data.msg)
    })

    
  },

  renterHasSameTips: function (msg) {
    wx.showModal({
      title: '',
      content: msg,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#2E8AE6',
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: options.address,
      houseid: options.houseid,
     
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})