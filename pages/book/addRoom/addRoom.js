// pages/book/addBook/addBook.js


const util = require('../../../utils/util.js')
const request = require('../../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    inputHouseName: ''
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindHouseNameInput: function (e) {
    this.setData({
      inputHouseName: e.detail.value
    })
  },

  toAddRoom: function () {
    

    util.saveBookAddress(this.data.region)
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }


    request.requestToAddRoom(userId, this.data.region[0], this.data.region[1], this.data.inputHouseName,res=>{
      console.log(res)
      app.updateMyBookPage()
      wx.navigateBack({
        delta: 1
      })
      // wx.navigateTo({
      //   url: '/pages/book/book',
      // })
      
    },res=>{
      console.log(res)
      this.roomHasSameTips()
    })
  },


  roomHasSameTips: function () {
    wx.showModal({
      title: '',
      content: '该账本已存在，请输入其他房源信息',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#2E8AE6',
    })
  },

  toGetLocationByWxGPS:function(){
    wx.getLocation({
      success: res => {
        let lb = res
        request.requestBaiduAddress(lb, res => {
          let address = res.data.result.addressComponent
          let province = address.province
          let city = address.city
          let district = address.district
          this.setData({
            region: [province, city, district],
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let bookAddress = util.getBookAddress()
    if (bookAddress) {
      //这个是之前不保存的地址
      this.setData({
        region: bookAddress,
      })
    }else{
      this.toGetLocationByWxGPS()
    }


    
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