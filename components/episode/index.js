// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number, //默认是0
      observer: function(newVal, oldVal) {
        let val = newVal < 10 ? '0' + newVal : newVal
        // console.log(val)-->07无误
        // 如果是Number,08会被渲染成8
        // 千万不要在observer里更新自身属性!!!!!!
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 注意类型声明与properties里的区别
    year: 0,
    month: '',
    _index: '', //作为index的中间量
    months: ['一月', '二月', '三月', '四月', '五月', '六月', ' 七月', '八月', '九月', '十月', '十一月', '十二月', ]
  },

  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})