// pages/money/getCash/getCash.js

const request = require('../../../utils/request.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'',
    inputMoney:'',
    errorTip:''
  },
  
  bindMoneyInput: function (e) {
    this.setData({
      inputMoney: e.detail.value
    })

    if (e.detail.value>this.data.balance){
      this.setData({
        errorTip:'输入金额超过可提现金额'
      })
    }else{
      this.setData({
        errorTip: ''
      })
    }
  },

  toGetCashOut:function(){
    
    console.log(this.data.inputMoney)
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }

    let cash = this.data.inputMoney
    request.requestGetCashOut(userId, cash*100, res=>{
      wx.redirectTo({
        url: "/pages/operaResult/operaResult?operaType=get_cash_success" + "&cash=" + cash,
      })
    },res=>{
      console.log(res.data.msg)
      wx.redirectTo({
        url: "/pages/operaResult/operaResult?operaType=get_cash_fail",
      })
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }
    request.requestMyAccountDetail(userId, res => {
      console.log(res)
      console.log(res.data.list[0].money)
      let balance =  res.data.list[0].money / 100
      if (balance>20000){
        this.setData({
          balance: 20000
        })
      }else{
        this.setData({
          balance: balance
        })
      }
      
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