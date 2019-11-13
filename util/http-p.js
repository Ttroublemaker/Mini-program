// 切记在小程序中import需要使用相对路径，不要使用绝对路径，使用组件时可以使用绝对路径
import config from "../config.js"
const tips = {
  1: "抱歉，出错了",
  1005: 'appKey无效',
  3000: '期刊不存在'
}
// 定义一个类
class HTTP {
  // 利用结构
  request({
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString() //注意转换成字符串
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  // 定义内部使用的私有方法
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]

    wx.showToast({
      title: tip ? tips[error_code] : 1,
      icon: 'none',
      duration: 2000
    })
  }
}
export default HTTP