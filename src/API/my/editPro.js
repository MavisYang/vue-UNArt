import fetch from '../../utils/fetch'

export default {
  editPro(obj) {
    return fetch('/paint/edit', obj)
  },
  delPro(obj, id) {
    return fetch('/paint/delete/' + id, obj)
  }
}
