// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    liek: {
      // type:Boolean,//默认是false
      type: Boolean, //必填
      value: false,
      observer: function() {

      }
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
      let like = this.properties.like
      let count = this.properties.count
      count = like ? --count : ++count
      this.setData({
        count: count,
        like: !like
      })

    }
  }
})