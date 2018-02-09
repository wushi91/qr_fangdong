const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getMyUserId = function () {
  return wx.getStorageSync('user_id') || ''
}

const saveMyUserId = function (user_id) {
  wx.setStorageSync('user_id', user_id)
}

const getBookAddress = function () {
  return wx.getStorageSync('bookAddress') || ''
}

const saveBookAddress = function (bookAddress) {
  wx.setStorageSync('bookAddress', bookAddress)
}


//基础封装
const wxGet = function (url, data, code200, error) {
  wx.request({
    url: url,
    data: data,
    success: res => {
      wx.stopPullDownRefresh() //停止下拉刷新
      if (res.data.msg === '0') {
        code200(res)
      } else {
        if (error) {
          error(res)
        } else {
          // console.log(res)
          console.log('请求出错：msg:' + res.data.msg+'---' + url)
        }
      }
    },
    fail: res => {
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.showToast({
        title:'网络出现问题，请稍候重试',
        icon:'none',
        mask:true,
      })
      if (error) {
        error(res)
      } else {
        console.log(res)
        console.log('执行fail：' + url)
      }
    }
  })
}

const getFormateDate = function (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

const getFormateDateWithTime = function (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


//生成租期时长
const generaRentLengthArray = function(tip) {
  let rentLengthArray = []
  for (let i = 1; i <= 24; i++) {
    rentLengthArray.push(i+tip)
  }
  return rentLengthArray;
}

//生成租期时长
const generaPayDayArray = function (tip) {
  let payDayArray = []
  for (let i = 1; i <= 31; i++) {
    payDayArray.push(i + tip)
  }
  return payDayArray;
}

const getNextMonth =  function (date, length) {
  let yy = date.getFullYear()
  let mm = date.getMonth()
  let dd = date.getDate()

  let nm = 0//目标月份
  nm = mm + length
  let nd = 0//目标天数
  if (monthDay(yy, nm + 1) < dd) {
    nd = monthDay(yy, nm + 1)
  } else {
    nd = dd - 1
  }
  date.setDate(1)
  date.setMonth(nm)
  date.setDate(nd)
  return date
}

const monthDay =  function (year, month) {
  month = parseInt(month, 10);
  var d = new Date(year, month, 0);  //这个是都可以兼容的
  var date = new Date(year + "/" + month + "/0")   //IE浏览器可以获取天数，谷歌浏览器会返回NaN
  return d.getDate();
}

module.exports = {
  formatTime: formatTime,
  getMyUserId: getMyUserId,
  saveMyUserId: saveMyUserId,
  wxGet: wxGet,
  getFormateDate: getFormateDate,
  generaRentLengthArray,
  generaPayDayArray,
  getNextMonth,
  getFormateDateWithTime,
  getBookAddress,
  saveBookAddress
}


