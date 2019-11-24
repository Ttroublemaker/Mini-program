import BookModel from '../../models/book.js'
import LikeModel from '../../models/like.js'

const bookModel = new BookModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 页面接收组件传来的参数
    const id = options.id
    const book = bookModel.getDetail(id)
    const comments = bookModel.getComments(id)
    const likeStatus = bookModel.getLikeStatus(id)
    // book.then(res => {
    //   this.setData({
    //     book: res.data
    //   })
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.data.comment
    //   })
    // })
    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.data.like_status,
    //     likeCount: res.data.fav_nums,
    //   })
    // })
    // 三个数据加载完成后就隐藏加载组件 
    Promise.all([book, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0].data,
        comments: res[1].data.comment,
        likeStatus: res[2].data.like_status,
        likeCount: res[2].data.fav_nums,
      })
      wx.hideLoading()
    })
  },

  onLike: function(event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost: function() {
    this.setData({
      posting: true
    })
  },

  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    // console.log(event)
    let comment = event.detail.value || event.detail.text
    comment = comment.trim()
    if (!comment) {
      wx.showToast({
        title: '短评不能为空',
        icon: 'none'
      })
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
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