import fetch from '../utils/fetch'

export default {
  expertsList(obj) {
    return fetch('/experts', obj)
  }
}
