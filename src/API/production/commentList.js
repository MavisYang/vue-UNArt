import fetch from '../../utils/fetch'

export default {
  commentList(obj, id) {
    return fetch('/comment/' + id, obj)
  }
}
