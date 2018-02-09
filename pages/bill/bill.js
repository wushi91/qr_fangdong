// pages/bill/bill.js
const util = require('../../utils/util.js')
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_status: [{ prop: 'allBill', label: '全部' },
      { prop: 'unpayBill', label: '未结清' },
      { prop: 'haspayBill', label: '已结清' }],
    currentStatus: 'allBill',
    allBillList: null,
    unpayBillList: null,
    haspayBillList: null,
  },

  payTabClick: function (e) {
    let currentStatus = e.currentTarget.dataset.currentStatus
    this.setData({
      currentStatus: currentStatus
    })

    let userId = util.getMyUserId()
    //点击tab对应的点击事件
    switch (currentStatus) {
      //全部
      case this.data.tab_status[0].prop: 
        if (this.data.allBillList === null) {
          this.getAllBill(userId)
        }
        break
      //闲置
      case this.data.tab_status[1].prop: 
        if (this.data.unpayBillList === null) {
          this.getUnpayBill(userId)
        }
        break
      //逾期
      case this.data.tab_status[2].prop: 
        if (this.data.haspayBillList === null) {
          this.getHaspayBill(userId)
        }
        break
    }
  },


  getAllBill: function (userId){
    request.requestAllBillList(userId,res=>{
      console.log(res.data.list)

      let billList = res.data.list
      for(let i=0;i<billList.length;i++){
        let item = billList[i]
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)
        item.rent = item.rent /100
      }

      this.setData({
        allBillList: billList
      })
    })

    console.log('getAllBill')
  },

  getUnpayBill: function (userId) {
    request.requestNopayBillList(userId, res => {
      console.log(res.data.list)

      let billList = res.data.list
      for (let i = 0; i < billList.length; i++) {
        let item = billList[i]
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)

        item.rent = item.rent / 100
      }
      this.setData({
        unpayBillList: billList
      })
    }) 
    console.log('getUnpayBill')
  },
  getHaspayBill: function (userId) {
    request.requestHaspayBillList(userId, res => {
      console.log(res.data.list)
      let billList = res.data.list
      for (let i = 0; i < billList.length; i++) {
        let item = billList[i]
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)
        item.rent = item.rent / 100
      }

      this.setData({
        haspayBillList: billList
      })
    })
    console.log('getHaspayBill')
  },

  toUnpayBillDetailPage: function (e) {
    let billId = e.currentTarget.dataset.billid
    console.log('billId = ' + billId)
    wx.navigateTo({
      url: '/pages/beanDetail/beanDetail?type=bill_detail_nopay&billId=' + billId
    })
  },

  toHaspayBillDetailPage: function (e) {

    let billId = e.currentTarget.dataset.billid
    console.log('billId = ' + billId)
    wx.navigateTo({
      url: '/pages/beanDetail/beanDetail?type=bill_detail_haspay&billId=' + billId
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
    this.getAllBill(userId)
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
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }
    let currentStatus = this.data.currentStatus
    switch (currentStatus) {
      //全部
      case this.data.tab_status[0].prop:
        this.getAllBill(userId)
        break
      //未结清
      case this.data.tab_status[1].prop:
        this.getUnpayBill(userId)
        break
      //已结清
      case this.data.tab_status[2].prop:
        this.getHaspayBill(userId)
        break
    }
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