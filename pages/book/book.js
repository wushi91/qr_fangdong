// pages/book/book.js
const app = getApp()
const util = require('../../utils/util.js')
const request = require('../../utils/request.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_status: [{ prop: 'allBook', label: '全部' },
      { prop: 'unusedBook', label: '闲置' }, 
      { prop: 'outdateBook', label: '逾期'}],
    currentStatus: 'allBook',
    isBlankBook:false,
    

    
    allBookList: null,
    unusedBookList: null,
    outdateBookList: null,

    moveHid: 's----ss--s-s',
    startHid:'',
    startPosition:null,
  },


  payTabClick: function (e) {
    
    let currentStatus = e.currentTarget.dataset.currentStatus
    this.setData({
      currentStatus: currentStatus
    })

    let userId = util.getMyUserId()
    //点击tab对应的点击事件
    switch (currentStatus){
      //全部
      case this.data.tab_status[0].prop: 
        if (this.data.allBookList === null) {
          //点击tab的时候，没有数据才做请求
          this.getAllBook(userId)
        }
        break
      //闲置
      case this.data.tab_status[1].prop: 
        if (this.data.unusedBookList === null) {
          this.getUnusedBook(userId)
        }
        break
      //逾期
      case this.data.tab_status[2].prop: 
        if (this.data.outdateBookList === null) {
          this.getOutDateBook(userId)
        }
        break
    }
  },

  getAllBook: function (userId){
    
    request.requestBookAllList(userId,res=>{
      
      let allBookList = res.data.Nolist.concat(res.data.list)
      console.log(allBookList)
      for (let i = 0; i < allBookList.length; i++) {
        let item = allBookList[i]
        if (item.name) {
          //有租客
          item.isUnused = false
          item.end_time = util.getFormateDate(item.end_time)
          item.start_time = util.getFormateDate(item.start_time)
        } else {
          item.isUnused = true
        }
      }
      this.setData({
        allBookList: allBookList
      })
      
    })
  },

  getUnusedBook: function (userId) {
    request.requestBookUnusedList(userId, res => {
      let unusedBookList = res.data.Nolist
      for (let i = 0; i < unusedBookList.length; i++) {
        let item = unusedBookList[i]
        
        if (item.name) {
          //有租客
          item.isUnused = false
          item.end_time = util.getFormateDate(item.end_time)
          item.start_time = util.getFormateDate(item.start_time)
        } else {
          item.isUnused = true
        }

      }
      this.setData({
        unusedBookList: unusedBookList
      })
      console.log(unusedBookList)
    })
  },

  getOutDateBook: function (userId) {

    request.requestBookOutdateList(userId, res => {
      let outdateBookList = res.data.list
      for (let i = 0; i < outdateBookList.length; i++) {
        let item = outdateBookList[i]
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)
      }
      this.setData({
        outdateBookList: outdateBookList
        // outdateBookList: [{ overdueNum: 3, name:'z'}]
      })
      console.log(outdateBookList)
    })
  },


  itemTouchstart: function (e) {
    // let bookid = e.currentTarget.dataset.bookid
    // let address = e.currentTarget.dataset.address
    let touchhid = e.currentTarget.dataset.houseid
    let touchPosition = e.touches[0]
    this.setData({
      startHid: touchhid,
      startPosition: touchPosition,
    })
  },

  itemTouchend: function (e) {
    let touchPosition = e.changedTouches[0]
    let startX = this.data.startPosition.pageX
    let startY = this.data.startPosition.pageY
    let endX = touchPosition.pageX
    let endY = touchPosition.pageY

    if (startY - endY > 50 || startY - endY < -50){
      return
    }
    if (startX-endX>50){
      //左滑：大于50px以上
      // console.log('左滑')

      this.setData({
        moveHid: this.data.startHid,
      }) 
    }

    if (startX - endX < -25) {
      //左滑：小于-50px以上
      // console.log('右滑')
      this.setData({
        moveHid: 'this.data.startHid',
      }) 
    }
  },
  toDeleteRoom:function(e){

    let bookid = e.currentTarget.dataset.bookid
    let address = e.currentTarget.dataset.address
    let houseid = e.currentTarget.dataset.houseid

    this.showDeleteTheRoom(address,houseid, bookid)
    this.setData({
      moveHid: 's----ss--s-s'
    })
  },

  showDeleteTheRoom: function (address,houseid, bookid) {

    
    let delIndex = ''
    for (let index in this.data.allBookList) {
      if (this.data.allBookList[index].hid === houseid){
        delIndex = index
        break
      }
    }

    //这个位置还不能改啊
    if (bookid === null) {
      console.log(bookid)
      bookid = ''
    } else {
      houseid = ''
    }


    wx.showModal({
      title: '确定删除账本' ,
      content: '确定删除账本' + address+'？',
      cancelText: '确定',
      cancelColor: '#F24949',
      confirmText: '取消',
      confirmColor: '#000000',
      success: res => {
        if (res.confirm) {
          //这里是取消，因为调换了按钮的位置
        } else if (res.cancel) {
          //这里是确定

          // console.log("houseid = " + houseid)
          // console.log("bookid = " + bookid)
          // console.log("delIndex = " + delIndex)
          // let allBookList = this.data.allBookList
          //   allBookList.splice(delIndex, 1)
          //   this.setData({
          //     allBookList: allBookList
          //   })
          request.requestToDeleteRoom('userId', houseid, bookid, res => {
            wx.showToast({
              title: '删除成功',
            })
            let allBookList = this.data.allBookList
            allBookList.splice(delIndex, 1)
            this.setData({
              allBookList: allBookList
            })
          },res=>{
            console.log(res)
          })
          
        }
      }
    })
  },
  

  toAddRenterPage:function(e){
    let bookid = e.currentTarget.dataset.bookid
    let address = e.currentTarget.dataset.address
    let houseid = e.currentTarget.dataset.houseid
    
    wx.navigateTo({
      url: '/pages/renter/addRenter/addRenter?houseid=' + houseid + '&address=' + address
    })
  },
  toRenterDetailPage:function(e){
    let bookid = e.currentTarget.dataset.bookid
    let address = e.currentTarget.dataset.address
    let houseid = e.currentTarget.dataset.houseid

    wx.navigateTo({
      url: '/pages/renter/renterDetail/renterDetail?bookid=' + bookid 
    })
  },

  toBeanDetailPage:function(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    // outdateDetail.overdueNum = options.overdueNum
    // outdateDetail.name = options.name
    // outdateDetail.phone = options.phone
    // outdateDetail.pay_time = options.pay_time
    // outdateDetail.rent = options.rent
    wx.navigateTo({
      url: '/pages/beanDetail/beanDetail?type=outdate_detail'
      + '&address=' + item.address 
      + '&overdueNum=' + item.overdueNum 
      + '&name=' + item.name
      + '&phone=' + item.phone
      + '&pay_time=' + item.pay_time
      + '&rent=' + item.rent
    })
  
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.updateMyBookPage = this.updatePageData

    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }
    this.getAllBook(userId)
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
    this.setData({
      moveHid: 'this.data.startHid',
    }) 
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
    // this.updatePageData()
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }

    this.setData({
      moveHid:'-----'
    })
    let currentStatus = this.data.currentStatus
    switch (currentStatus) {
      //全部
      case this.data.tab_status[0].prop:
          this.getAllBook(userId)
        break
      //闲置
      case this.data.tab_status[1].prop:
          this.getUnusedBook(userId)
        break
      //逾期
      case this.data.tab_status[2].prop:
          this.getOutDateBook(userId)
        break
    }
  }, 

  updatePageData(){
    this.setData({
      currentStatus: this.data.tab_status[0].prop,
      unusedBookList: null,
      outdateBookList: null,
    })
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      return
    }
    this.getAllBook(userId)
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