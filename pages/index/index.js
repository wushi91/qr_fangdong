// pages/index/index.js

const app = getApp()
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    billList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    showBookPage:true,
    headerimagesrc: '/images/unlogin-header-image.png',
    username: '微信授权登录',
    current_month:'',
    current_month_total_money:0,
    current_month_hasget_money: 0,
    current_month_noget_money: 0,
  },

  toAddRoomPage:function(){

    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      this.toMyUserLogin()
      return
    }
    wx.navigateTo({
      url: "/pages/book/addRoom/addRoom"
    })
  },
  toMoneyPage: function () {
    wx.navigateTo({
      url: "/pages/money/money"
    })
  },
  toBillPage: function () {
    wx.navigateTo({
      url: "/pages/bill/bill"
    })
  },
  toRecordPage: function () {
    wx.navigateTo({
      url: "/pages/record/record"
    })
  },
  toMyUserLogin: function () {
    if (!util.getMyUserId()) {
      //请求权限，获取微信用户信息
      this.getWxUserInfo()
        .then(userInfo => {
          return this.getWxCode(userInfo)
        })
        .then(data => {
          this.toGetMyUserId(data.code, data.userInfo)
        })
    }
  },

  getWxUserInfo: function () {
    console.log('获取授权')
    return new Promise(function (resolve, reject) {
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          resolve(userInfo)
        }
      })
    })
  },

  getWxCode: function (userInfo) {
    console.log('获取登陆code')
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          let code = res.code
          resolve({ code, userInfo })
        }
      })
    })
  },

  toGetMyUserId: function (code, userInfo) {
    //获取平台的userId
    console.log('获取平台的userId')
    request.requestLoginTogetMyUserId(code, userInfo, (res) => {
      util.saveMyUserId(res.data.user_id)
      console.log('userId：' + res.data.user_id)
      this.setData({
        username: userInfo.nickName,
        headerimagesrc: userInfo.avatarUrl,
      })
      app.updateMyBookPage()
      // app.updateMyIndexPage()

      wx.navigateTo({
        url: "/pages/book/addRoom/addRoom"
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.toMyUserLogin()

    // let userId = util.getMyUserId()
    // if (!userId) {
    //   //未登录
    //   return
    // }

    // request.requestCurrentMonthTotalMoney(userId,res=>{
    //   console.log(res)
    //   this.setData({
    //     current_month_total_money: res.data.money,
    //     current_month: res.data.month + '月'
    //   })
    // })
    // request.requestCurrentMonthHasGetMoney(userId, res => {
    //   this.setData({
    //     current_month_hasget_money: res.data.money
    //   })
    // })
    // request.requestCurrentMonthNoGetMoney(userId, res => {
    //   this.setData({
    //     current_month_noget_money: res.data.money 
    //   })
    // })
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
  
  },

  // 事件
  catchItemTab(e) {
    switch (e.detail.tabItem) {
      case -1://
        console.log('点击了新建账本')
        this.toAddRoomPage()
        break;
      case 0://

        this.setData({
          showBookPage: true
        })
        wx.setNavigationBarTitle({
          title: "租房账本"
        })

        console.log('点击了租房账本')
        break;
      case 1://
        this.setData({
          showBookPage: false
        })
        wx.setNavigationBarTitle({
          title: "我的"
        })
        console.log('点击了我的')
        break;
    }
  },

  //
  toMyUserLogin: function () {
    if (!util.getMyUserId()) {
      //请求权限，获取微信用户信息
      this.getWxUserInfo()
        .then(userInfo => {
          return this.getWxCode(userInfo)
        })
        .then(data => {
          this.toGetMyUserId(data.code, data.userInfo)
        })
    }else{
      //如果已经登录，获取微信用户信息
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          this.setData({
            username: res.userInfo.nickName,
            headerimagesrc: res.userInfo.avatarUrl,
          })
        }
      })
    }
  },

  getWxUserInfo: function () {
    console.log('获取授权')
    return new Promise(function (resolve, reject) {
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          resolve(userInfo)
        }
      })
    })
  },

  getWxCode: function (userInfo) {
    console.log('获取登陆code')
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          let code = res.code
          resolve({ code, userInfo })
        }
      })
    })
  },

  toGetMyUserId: function (code, userInfo) {
    //获取平台的userId
    console.log('获取平台的userId')
    request.requestLoginTogetMyUserId(code, userInfo, (res) => {
      util.saveMyUserId(res.data.user_id)
      console.log('userId：' + res.data.user_id)
      this.setData({
        username: userInfo.nickName,
        headerimagesrc: userInfo.avatarUrl,
      })
      app.updateMyBookPage()
      app.updateMyIndexPage()
    })
  },


})