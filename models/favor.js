import HTTP from '../util/http-p.js'
class FavorModel extends HTTP {
  getFavorList(){
    return this.request({
      url: `book/favorList`
    })
  }
}
export default FavorModel