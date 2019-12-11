import FavorModel from '../../models/favor.js'

const favorModel = new FavorModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取喜爱的书籍列表
    // const favorList = favorModel.getFavorList()
    this.getData()
    console.log(this.data.favorList)
  },
  getData() {
    const favorList = {
      error_code: 200,
      data: [{
          "image": "http://photocdn.sohu.com/20120103/Img331047726.jpg",
          "content": "这是最早的一页内容了，没得了1",
          "type": 100,
          "fav_nums": 123312,
          "index":1
        },
        {
          "image": "http://photocdn.sohu.com/20120103/Img331047726.jpg",
          "content": "这是最早的一页内容了，没得了2",
          "type": 200,
          "fav_nums": 123,
          "index": 2
        }, {
          "image": "http://photocdn.sohu.com/20120103/Img331047726.jpg",
          "content": "这是最早的一页内容了，没得了3",
          "type": 300,
          "fav_nums": 123312,
          "index": 3
        }
      ]
    }
    this.setData({
      favorList: favorList.data
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})