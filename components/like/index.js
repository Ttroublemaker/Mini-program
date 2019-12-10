// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 在 properties 定义段中，属性名采用驼峰写法；在 wxml 中，指定属性值时则对应使用连字符写法，应用于数据绑定时采用驼峰写法
  properties: {
    like: {
      // type:Boolean,//默认是false
      type: Boolean, //必填
      value: false,
      // 属性值变化时的回调函数
      observer: function() {}
    },
    preventClick: {
      type: Boolean,
      value: false,
      observer: function() {}
    },
    count: Number, //默认是0
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      if (this.properties.preventClick) return
      let like = this.properties.like
      let count = this.properties.count
      count = like ? --count : ++count
      this.setData({
        count: count,
        like: !like
      })

      let behavior = this.properties.like ? 'like' : 'cancel'
      // 激活自定义事件
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})