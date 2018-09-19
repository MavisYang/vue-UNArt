import fetch from '../../utils/fetch'

export default {
  msgList(obj) {
    return fetch('/message', obj)
  },
  detailmsg(obj, id) {
    return fetch('/message/detail/' + id, obj)
  }
}
