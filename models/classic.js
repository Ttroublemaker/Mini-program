import HTTP from '../util/http.js'
// ClassicModel继承HTTP
class ClassicModel extends HTTP {
  // 获取最新一期
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        // 存储最新一期期刊的index，便于后续判断是否最新一期期刊
        this._setLatestIndex(res.data.index)
      }
    })
  }

  // 获取当前一期上一期或下一期
  getClassic(index, nextOrPrevious, sCallback) {
    console.log('index', index)
    this.request({
      url: 'classic/' + index + '/' + nextOrPrevious,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  // 是否最早一期期刊
  isFirst(index) {
    return index == 1 ? true : false
  }
  // 是否最新一期期刊
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  // 缓存最新一期期刊的index
  _setLatestIndex(index) {
    wx.setStorageSync('latestIndex', index)
  }
  // 从缓存获取最新一期期刊的index
  _getLatestIndex() {
    let index = wx.getStorageSync('latestIndex')
    return index
  }
}
export default ClassicModel