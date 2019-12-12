const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: Object,
      value: {}
    }
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
    toDetail() {
      let ind = this.properties.text.index
      wx.navigateTo({
        url: `/pages/my-detail/my-detail?index=${ind}`,
      })
      console.log('去往详情页', ind)
    }
  }
})