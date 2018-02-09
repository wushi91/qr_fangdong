// pages/beanDetail/beanDetail.js
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: 
      {bill_detail_haspay:'账单详情',
        bill_detail_nopay: '账单详情',
       rent_detail: '收租详情' ,
       get_cash_detail: '提现详情' ,
       outdate_detail: '逾期详情'} ,
    type:'outdate_detail',
    address:'',
    outdateDetail:null,
    rentDetail:null,
    getCashDetail: null,
    billDetail:null,
    payId:'',
  },


  getRentDetail: function (userId,payId){
    request.requestRecordDetail(userId, payId, res=>{
      let rentDetail = res.data.list
      rentDetail.trading_time = util.getFormateDateWithTime(rentDetail.trading_time)
      rentDetail.end_time = util.getFormateDate(rentDetail.end_time)
      rentDetail.start_time = util.getFormateDate(rentDetail.start_time)
      rentDetail.balance = rentDetail.balance 
      this.setData({
        address: res.data.list.address,
        rentDetail: res.data.list
      })
    },res=>{
      console.log(res.data)
    })
  },
  
  getGetCashDetail: function (userId,payId) {

    request.requestRecordDetail(userId, payId, res => { 
      console.log('getGetCashDetail')
      console.log(res.data) 

      let getCashDetail =  res.data.tixian
      getCashDetail.trading_time = util.getFormateDateWithTime(getCashDetail.trading_time)
      
      this.setData({
        address: '提现',
        getCashDetail: getCashDetail
      })
    }, res => {
      console.log(res.data)
    })
  },

  getBillDetail(userId, billId){
    request.requestBillDetail(userId, billId,res=>{
      console.log(res)

      let billDetail = res.data.list[0]
      billDetail.start_time = util.getFormateDate(billDetail.start_time)
      billDetail.end_time = util.getFormateDate(billDetail.end_time)
      billDetail.rent = billDetail.rent 
      this.setData({
        address: res.data.list[0].address,
        billDetail: billDetail
      })
    }, res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
    })
    
    wx.setNavigationBarTitle({
      title: this.data.types[options.type]
    })


    if (options.type ==='outdate_detail'){
      let outdateDetail = {}
      
      outdateDetail.overdueNum = options.overdueNum
      outdateDetail.name = options.name
      outdateDetail.phone = options.phone
      outdateDetail.pay_time = options.pay_time
      outdateDetail.rent = options.rent

      console.log(options)
      this.setData({
        address : options.address,
        outdateDetail: outdateDetail,
      })
    }

    if (options.type === 'rent_detail') {
      console.log('rent_detail')
      this.setData({
        payId: options.payId,
      })
      let userId = util.getMyUserId()
      this.getRentDetail(userId,options.payId)
    }

    if (options.type === 'get_cash_detail') {
      console.log('get_cash_detail')
      this.setData({
        payId: options.payId,
      })
      let userId = util.getMyUserId()
      this.getGetCashDetail(userId,options.payId)
    }


    if (options.type === 'bill_detail_haspay' || options.type === 'bill_detail_nopay') {
      console.log('getBillDetail')
      this.setData({
        billId: options.billId,
      })
      let userId = util.getMyUserId()
      this.getBillDetail(userId, options.billId)
    }
    

    // if(){
    //   bill_detail_haspay: '账单详情',
    //     bill_detail_nopay: '账单详情',
    // }
    
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