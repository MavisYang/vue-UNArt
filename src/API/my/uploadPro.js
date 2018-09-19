import fetch from '../../utils/fetch'

export default {
  addPro(obj) {
    return fetch('/paint/add', obj)
  }
}
