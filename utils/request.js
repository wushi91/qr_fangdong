const util = require('../utils/util.js')

// const host = 'http://192.168.2.119:8080'
// const host = 'http://192.168.2.221:8080'//测试用
const host = 'https://www.0755qr.com'

//登录
const login_get_user_id_url = host +'/rentBook/authorization/landlord.do'

//房东应收（首页）
const current_month_money_total_url = host + '/rentBook/payment/receivable.do'
const current_month_money_hasget_url = host + '/rentBook/payment/received.do'
const current_month_money_noget_url = host + '/rentBook/payment/waite.do'


//全部（账本）
const get_all_book_url = host + '/rentBook/book/AllUserBooks.do'
const get_unused_book_url = host + '/rentBook/house/findIdleHouse.do'
const get_outdate_book_url = host + '/rentBook/book/selectOverdue.do'
//
const to_add_room_url = host + '/rentBook/house/addHousing.do'
const to_delete_book_url= host + '/rentBook/update/DelLedgers.do'

//租客相关
const to_add_renter_url = host + '/rentBook/book/addBook.do'
const get_renter_detail_url = host + '/rentBook/book/detail.do'
// const to_edit_renter_url = host + '/rentBook/update/updateTenantInfo.do'
const to_delete_renter_url =host + '/rentBook/checkOut/status.do'


//money相关
const get_myaccount_detail_url = host + '/rentBook/transact/showAccount.do'
const get_cash_out_url = host + '/rentBook/payment/wxUserwithdraw.do'


//我的账单
const get_all_bill_url = host + '/rentBook/book/AllSettle.do'
const get_pay_bill_url = host + '/rentBook/book/selectSettle.do'
const get_nopay_bill_url = host + '/rentBook/book/selectSettle.do'
const get_bill_detail_url = host + '/rentBook/book/billsDetail.do'

//交易记录
const get_all_record_url = host + '/rentBook/transact/transactInfo.do'
const get_record_detail_url = host + '/rentBook/transact/transactDetail.do'
const get_renter_record_url = host + '/rentBook/book/records.do'
// const get_all_record_url = host + '/rentBook/book/queryRecordsDetail.do'


//登录
const requestLoginTogetMyUserId = function (wxCode, wxUserInfo, code200) {
  let data = {
    code: wxCode,
    userInfo: wxUserInfo
  }
  util.wxGet(login_get_user_id_url, data, code200)
}

//房东已收（首页）
const requestCurrentMonthTotalMoney = function (user_id, code200, error){
  let data = {
    user_id: user_id
  }
  util.wxGet(current_month_money_total_url, data, code200, error)
}

//房东待收（首页）
const requestCurrentMonthHasGetMoney = function (user_id, code200, error) {
  let data = {
    user_id: user_id
  }
  util.wxGet(current_month_money_hasget_url, data, code200, error)
}

//房东应收（首页）
const requestCurrentMonthNoGetMoney = function (user_id, code200, error) {
  let data = {
    user_id: user_id
  }
  util.wxGet(current_month_money_noget_url, data, code200, error)
}

//全部（账本）
const requestBookAllList = function (user_id, code200, error) {
  let data = {
    user_id: user_id
  }
  util.wxGet(get_all_book_url, data, code200, error)
}
//闲置（账本）
const requestBookUnusedList = function (user_id, code200, error) {
  let data = {
    user_id: user_id
  }
  util.wxGet(get_unused_book_url, data, code200, error)
}
//逾期（账本）
const requestBookOutdateList = function (user_id, code200, error) {
  let data = {
    user_id: user_id
  }
  util.wxGet(get_outdate_book_url, data, code200, error)
}


//新建房子
const requestToAddRoom = function (user_id, province, city, address,code200, error) {
  let data = {
    user_id: user_id,
    province: province,
    city: city,
    address: address,
  }
  util.wxGet(to_add_room_url, data, code200, error)
}
//删除房子
const requestToDeleteRoom = function (user_id, houseId, bookId, code200, error) {
  let data = {
    hid: houseId,
    id: bookId,
  }
  util.wxGet(to_delete_book_url, data, code200, error)
}




//添加租客，其实就是账本
const requestToAddRenter = function (user_id, hid, renterDetail, code200, error) {
  let data = {
    user_id: user_id,
    hid: hid,//房源编号
    name: renterDetail.renterName,
    phone: renterDetail.renterPhone,
    start_time: renterDetail.rentStartDate,//起租日期
    end_time: renterDetail.rentOverDate,//截止日期
    rent_month: renterDetail.rentLength,//租期(租凭月数)
    pay_type: renterDetail.rentPayWay,//交租方式
    pay_time: renterDetail.rentPayDate,//交租日期
    security_deposit: renterDetail.yaJinMoney,//房屋押金
    rent: renterDetail.rentMoney,//租金
  }
  util.wxGet(to_add_renter_url, data, code200, error)
}

//租客退房，也就是删除账本
const requestToDeleteRenter = function (user_id, bookId, code200, error) {
  let data = {
    // user_id: user_id,
    id: bookId,
  }
  util.wxGet(to_delete_renter_url, data, code200, error)
}

//获取租客详情也就是账本详情
const requestGetRenterDetail = function (user_id, bookId, code200, error) {
  let data = {
    id: bookId,
  }
  util.wxGet(get_renter_detail_url, data, code200, error)
}

//获取账户余额
const requestMyAccountDetail = function (user_id, code200, error) {
  let data = {
    user_id: user_id,
  }
  util.wxGet(get_myaccount_detail_url, data, code200, error)
}

//提现
const requestGetCashOut = function (user_id,moneyToCash,code200, error) {
  let data = {
    user_id: user_id,
    // cardid: cardId,
    balance: moneyToCash,
  }
  util.wxGet(get_cash_out_url, data, code200, error)
}


//获取全部账单
const requestAllBillList = function (user_id, code200, error) {
  let data = {
    user_id: user_id,
  }
  util.wxGet(get_all_bill_url, data, code200, error)
}

//获取已结清的账单
const requestHaspayBillList = function (user_id, code200, error) {
  let data = {
    user_id: user_id,
    settle: '已结清'
  }
  util.wxGet(get_pay_bill_url, data, code200, error)
}

//获取未结清的账单
const requestNopayBillList = function (user_id, code200, error) {
  let data = {
    user_id: user_id,
    settle: '未结清'
  }
  util.wxGet(get_nopay_bill_url, data, code200, error)
}

//账单详情
const requestBillDetail = function (user_id, billId,code200, error) {
  let data = {
    user_id: user_id,
    id: billId,
  }
  util.wxGet(get_bill_detail_url, data, code200, error)
}


//交易记录
const requestAllRecordList = function (user_id, code200, error) {
  let data = {
    user_id: user_id,
  }
  util.wxGet(get_all_record_url, data, code200, error)
}

const requestRecordDetail = function (user_id,payId,code200, error) {
  let data = {
    user_id: user_id,
    // abstracts: recordType,//提现 or 收租 or交租
    pay_id: payId
  }
  util.wxGet(get_record_detail_url, data, code200, error)
}

//获取指定租客的详情
const requestRenterRecordList = function (phone,name, code200, error) {
  let data = {
    phone: phone,
    name: name,
  }
  util.wxGet(get_renter_record_url, data, code200, error)
}


const requestBaiduAddress = function(lb,success){
  let ak = 'It0GdmpH8Rl8P8oUNwqSUi4ZKOIuGKlA'//需要个人申请
  let url = 'https://api.map.baidu.com/geocoder/v2/?ak=' + ak+'&location=' + lb.latitude + ',' + lb.longitude + '&output=json&coordtype=wgs84ll'

  wx.request({
    url: url,
    success: success,
    fail: res => {
      console.log(res)
    }
  })
}


module.exports = {
  requestLoginTogetMyUserId: requestLoginTogetMyUserId,
  requestCurrentMonthTotalMoney,
  requestCurrentMonthHasGetMoney,
  requestCurrentMonthNoGetMoney,
  requestBookAllList,
  requestBookUnusedList,
  requestBookOutdateList,
  requestToAddRoom,
  requestToAddRenter,
  requestGetRenterDetail,
  requestMyAccountDetail,
  requestGetCashOut,
  requestAllBillList,
  requestHaspayBillList,
  requestNopayBillList,
  requestAllRecordList,
  requestRecordDetail,
  requestToDeleteRenter,
  requestRenterRecordList,
  requestToDeleteRoom,
  requestBaiduAddress,
  requestBillDetail
}