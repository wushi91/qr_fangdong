// components/tobTab/tobTab.js

const tobTabUtil = require('./tobTabUtil.js')


Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabArray: [
      { prop: 'allBill', label: '全部' },
      { prop: 'unpayBill', label: '未结清' }],
    currentStatus: 'unpayBill',
    currentIndex: 1,
    swiperHeight: tobTabUtil.getWindowHeight_rpx()-98-240
  },

  /**
   * 组件的方法列表
   */
  methods: {


    payTabClick: function (e) {
      let currentStatus = e.currentTarget.dataset.currentStatus
      let currentIndex = e.currentTarget.dataset.currentIndex

      this.setData({
        currentIndex: currentIndex,
        currentStatus: currentStatus
      })
    },

    bindchange(e) {
      this.setData({
        currentIndex: e.detail.current,
      })
    },
  }
})
