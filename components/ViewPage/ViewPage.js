// components/ViewPage/ViewPage.js

const viewPageUtil = require('./ViewPageUtil.js')


Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabArray: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: [{ prop: 'allBill', label: '全部' }, { prop: 'unpayBill', label: '未结清' }] // 属性初始值（可选），如果未指定则会根据类型选择一个
    },

    currentIndex: { 
      type: Number, 
      value: 0
    },

    swiperHeight: {
      type: Number,//轮播组件的默认高度
      value: viewPageUtil.getWindowHeight_rpx() - 98-240-98
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
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
