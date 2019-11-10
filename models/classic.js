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
        // 存储最新一期的classic数据
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  // 获取当前一期上一期或下一期
  getClassic(index, nextOrPrevious, sCallback) {
    // 获取每个classic的index并获取对应classic数据
    let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    // 如果未取到classic则请求，并存储
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
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
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}
export default ClassicModel