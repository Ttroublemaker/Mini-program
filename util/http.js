// 切记在小程序中import需要使用相对路径，不要使用绝对路径，使用组件时可以使用绝对路径
import config from "../config.js"
const tips = {
  1: "抱歉，出错了",
  1005: 'appKey无效',
  3000: '期刊不存在'
}
// 定义一个类
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString() //注意转换成字符串
        if (code.startsWith('2')) {
          // console.log('res',res)
          // 成功的回调函数success
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          console.log(error_code)
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }
  // 定义内部使用的私有方法
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export default HTTP