import fetch from '../../utils/fetch'

export default {
  getUNArtTime(obj) {
    obj.type = 'GET'
    return fetch('/time', obj)
  },
  applyNow(obj) {
    return fetch('/user/enroll', obj)
  }
}
