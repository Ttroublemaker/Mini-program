import HTTP from '../util/http-p.js'

class keywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  // 获取搜索历史
  getHistory() {
    const keywords = wx.getStorageSync(this.key)
    if (!keywords) {
      return []
    }
    return keywords
  }

	// 获取热门搜索
  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  //搜索关键字放入缓存 
  addToHistory(keyword) {
    let keywords = this.getHistory()
    const has = keywords.includes(keyword)
    if (!has) {
      if (keywords.length >= this.maxLength) {
        keywords.pop()
      }
      keywords.unshift(keyword)
      wx.setStorageSync(this.key, keywords)
    }
  }
}
export default keywordModel