// pages/operaResult/operaResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    operaTypes: {
      add_room_success: '添加成功',
      bind_phone_success: '绑定成功',
      get_cash_success: '提现成功',
      get_cash_fail: '提现失败',
    },
    operaType: 'get_cash_fail',
    cash:''
  },


  backToIndexPage:function(){
    wx.navigateBack({
      delta: 5
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operaType: options.operaType,
      cash: options.cash
    })
    wx.setNavigationBarTitle({
      title: this.data.operaTypes[this.data.operaType]
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