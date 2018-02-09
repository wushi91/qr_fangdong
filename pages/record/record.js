// pages/record/record.js

const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allRecordist: [],
  },

  getAllRecord:function(userId){
    request.requestAllRecordList(userId,res=>{
      console.log(res.data)
      let allRecordist = []
      if (res.data.list){
        allRecordist = allRecordist.concat(res.data.list)
      }
      if (res.data.tixian) {
        allRecordist =  allRecordist.concat(res.data.tixian)
      }
      console.log(allRecordist)
      for (let i = 0; i < allRecordist.length; i++) {
        let item = allRecordist[i]
        item.trading_time = util.getFormateDateWithTime(item.trading_time)
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)
        item.balance = item.balance / 100
      }


      
      this.setData({
        allRecordist: allRecordist
      })

    },res=>{
      console.log(res)
    })
  },
  //收租详情
  toRentDetailPage: function (e) {
    
    let payId = e.currentTarget.dataset.payId

    let recordType = e.currentTarget.dataset.recordType
    wx.navigateTo({
      url: '/pages/beanDetail/beanDetail?type=rent_detail&recordType=' + recordType + '&payId=' + payId
    })
  },
  //提现详情
  toGetCashDetailPage: function (e) {
    let payId = e.currentTarget.dataset.payId
    console.log(payId)
    let recordType = e.currentTarget.dataset.recordType
    wx.navigateTo({
      url: '/pages/beanDetail/beanDetail?type=get_cash_detail&recordType=' + recordType + '&payId=' + payId
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
    this.getAllRecord(userId)
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