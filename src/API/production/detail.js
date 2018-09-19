import fetch from '../../utils/fetch'

export default {
  detail(obj, id) {
    return fetch('/paint/detail/' + id, obj)
  },
  detailAuthor(obj, id) {
    return fetch('/paint/user/' + id, obj)
  }
}
