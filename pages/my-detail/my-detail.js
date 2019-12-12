import ClassicModel from '../../models/classic-p.js'
import LikeModel from '../../models/like-p.js'
// 实例化
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    // likeCount和likeStatus需要动态更新，不能缓存，所以提取出来
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 获取期刊信息
    const index = Number(options.index)
    // console.log('传过来的', index)
    this.getFavorBookDetail(index)
    wx.hideLoading()
  },

  onLike: function(event) {
    let behavior = event.detail.behavior //获取当前的点赞状态
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  //获取数据信息
  getFavorBookDetail(ind) {
    // console.log("跳转来的,根据ind获取相应的值", ind)
    if (ind && ind !== 1) {
      this._updateClassic(ind - 1, 'next')
    } else if (ind == 1) {
      this._updateClassic(2, 'previous')
    }
  },

  // 抽离的私有方法
  _updateClassic: function(index, nextOrPrevious) {
    // let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious).then(res => {
      this._getLikeStatus(res.data.id, res.data.type)
      this.setData({
        classic: res.data
      })
    })
  },

  // 获取动态更新的点赞状态和数量
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category).then(res => {
      this.setData({
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status ? true : false
      })

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