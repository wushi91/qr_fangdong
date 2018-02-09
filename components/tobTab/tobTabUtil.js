
const getWindowHeight_rpx = ()=>{

  // px换算为rpx，因为屏幕长度为750rpx，w/750rpx = h/rpx

  let sysInfo = wx.getSystemInfoSync()
  let w = sysInfo.windowWidth
  let h = sysInfo.windowHeight
  let rpx = 750/w*h

  return rpx
}




module.exports = {
  getWindowHeight_rpx,
}
