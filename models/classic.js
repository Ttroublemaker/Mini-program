import HTTP from '../util/http.js'
// ClassicModel继承HTTP
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}
export default ClassicModel