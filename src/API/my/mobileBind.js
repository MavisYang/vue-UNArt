import fetch from '../../utils/fetch'

export default {
  Mbind(obj) {
    return fetch('social/bind', obj)
  }
}
