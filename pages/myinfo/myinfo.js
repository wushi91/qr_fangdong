// pages/myinfo/myinfo.js
const app = getApp()
const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '微信授权登录',
    headerimagesrc: '/images/unlogin-header-image.png',
  },

  //
  toMyUserLogin: function () {
    if (!util.getMyUserId()) {
      //请求权限，获取微信用户信息
      this.getWxUserInfo()
      .then(userInfo => {
        return this.getWxCode(userInfo)
      })
      .then(data=>{ 
        this.toGetMyUserId(data.code, data.userInfo)
      })
    }
  },

  getWxUserInfo:function(){
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

  getWxCode: function (userInfo){
    console.log('获取登陆code')
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          let code = res.code
          resolve({ code, userInfo})
        }
      })
    })
  },

  toGetMyUserId:function(code,userInfo){
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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
    if (util.getMyUserId()) {
      // 已经登录
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
    } else {
      // 未登录
    }
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