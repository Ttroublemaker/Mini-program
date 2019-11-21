import HTTP from '../util/http-p.js'
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category,
      },
    })
  }
  getClassicLikeStatus(artID, category) {
    return this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
    })
  }
}
export default LikeModel