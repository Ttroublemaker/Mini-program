// 切记:在小程序中import需要使用相对路径，不要使用绝对路径，使用组件时可以使用绝对路径
import config from "../config.js"
const tips = {
  1001: "抱歉，出错了",
  3000: '期刊不存在'
}
// 定义一个HTTP类
class HTTP {
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
        'content-type': 'application/json'
      },
      success: (res) => {
        const code = res.statusCode.toString() //注意转换成字符串
        console.log(res)
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
        this._show_error(1001)
      }
    })
  }
  // 定义内部使用的私有方法
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1001
    }
    const tip = tips[error_code]

    wx.showToast({
      title: tip ? tips[error_code] : 1001,
      icon: 'none',
      duration: 2000
    })
  }
}
export default HTTP